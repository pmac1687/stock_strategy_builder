import pandas as pd
import psycopg2
import keys
import stockstats
from tapy import Indicators
import csv
import concurrent.futures


def add_tapy_indicators(df):
    df.rename(columns={
        "high": "High",
        'low':'Low',
        'close': 'Close',
        'volume': 'Volume'
    }, inplace=True)

    df['Close'] = df['Close'].astype('float')

    df['High'] = df['High'].astype('float')

    df['Low'] = df['Low'].astype('float')

    df['Volume'] = df['Volume'].astype('float')

    df['date'] = df.index

    df.index = range(len(df))

    df = Indicators(df)

    df.awesome_oscillator(column_name='ao')

    df.fractals(column_name_high='fractal_highs', column_name_low='fractal_lows')

    df.atr(period=14, column_name='atr')

    df.smma(period=5, column_name='smma_5', apply_to='Close')

    df.smma(period=50, column_name='smma_50', apply_to='Close')

    df.smma(period=200, column_name='smma_200', apply_to='Close')

    df.mfi(period=5, column_name='momentum')

    df.accelerator_oscillator(column_name='accel_oss')

    df.alligator(period_jaws=13, period_teeth=8, period_lips=5, shift_jaws=8, shift_teeth=5, shift_lips=3, column_name_jaws='alligator_jaw', column_name_teeth='alligator_teeth', column_name_lips='alligator_lips')

    df.gator(period_jaws=13, period_teeth=8, period_lips=5, shift_jaws=8, shift_teeth=5, shift_lips=3, column_name_val1='gator_value1', column_name_val2='gator_value2')

    df = df.df


    #print(df['fractal_highs'])

    high = []
    low = []
    for i in range(len(df)):
        if df.iloc[i]['fractal_highs'] == True:
            high.append(df.iloc[i]['Close'])
        else:
            high.append('')
        if df.iloc[i]['fractal_lows'] == True:
            low.append(df.iloc[i]['Close'])
        else:
            low.append('')


    df['f_high'] = high
    df['f_low'] = low

    return df



def add_stockstats_indicators(df):
    stock = stockstats.StockDataFrame.retype(df)
    #rsi
    df['rsi_12'] = stock['rsi_12']
    #del df['rsi_12']
    del df['rs_12']
    del df['closepm']
    del df['closenm']
    del df['close_-1_d']
    del df['close_-1_s']
    del df['closepm_12_smma']
    del df['closenm_12_smma']


    df['rsi_6'] = stock['rsi_6']
    df['rsi_18'] = stock['rsi_18']
    df['rsi_24'] = stock['rsi_24']

    df['macd'] = stock['macd']
    df['macd_sig'] = stock['macds']
    df['macd_hist'] = stock['macdh']

    df['boll'] = stock['boll']
    df['boll_ub'] = stock['boll_ub']
    df['boll_lb'] = stock['boll_lb']

    
    df['sma_10'] = stock['close_10_sma']
    df['sma_50'] = stock['close_50_sma']
    df['sma_200'] = stock['close_200_sma']
    df['ema_10'] = stock['close_10_ema']
    df['ema_50'] = stock['close_50_ema']
    df['ema_200'] = stock['close_200_ema']

    return df

def query_db(data, tick_arr):
    dic = {}
    ids = []
    opens = []
    closes = []
    highs = []
    lows = []
    volumes = []
    dates = []
    for arr in  data:
        ids.append(arr[0])
        opens.append(arr[1])
        closes.append(arr[2])
        highs.append(arr[3])
        lows.append(arr[4])
        volumes.append(arr[5])
        dates.append(arr[6])
    dic['ticker_id'] = ids
    dic['open'] = opens
    dic['close'] = closes
    dic['high'] = highs
    dic['low'] = lows
    dic['volume'] = volumes
    dic['date'] = dates
    cols = ['ticker_id', 'open','close','high','low','volume','date']
    df=pd.DataFrame(dic, columns=cols)
    conn.commit()
    conn.close()
    return df

def update_db(df):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    arr = f''
    for row_index,row in df.iterrows():
        que = f"""update historical_stock_data set rsi_12='{row['rsi_12']}', rsi_6='{row['rsi_6']}',
                        rsi_18='{row['rsi_18']}', rsi_24='{row['rsi_24']}', macd='{row['macd']}', macd_sig='{row['macd_sig']}',
                        macd_hist='{row['macd_hist']}', boll='{row['boll']}', boll_ub='{row['boll_ub']}', boll_lb='{row['boll_lb']}',
                        sma_10='{row['sma_10']}',sma_50='{row['sma_50']}', sma_200='{row['sma_200']}',ema_50='{row['ema_50']}',ema_10='{row['ema_10']}',
                        ema_200='{row['ema_200']}',ao='{row['ao']}', 
                        atr='{row['atr']}',smma_5='{row['smma_5']}',smma_50='{row['smma_50']}',smma_200='{row['smma_200']}',momentum='{row['momentum']}',accel_oss='{row['accel_oss']}',alligator_jaw='{row['alligator_jaw']}',
                        alligator_teeth='{row['alligator_teeth']}', alligator_lips='{row['alligator_lips']}',
                        gator_value1='{row['gator_value1']}', gator_value2='{row['gator_value2']}' where ticker_id='{row['ticker_id']}' and date::date='{row['date']}';"""
        arr += que
    cur.execute(arr)
    #print('updated:', cur.rowcount)
    print(len(cur.query))
    conn.commit()
    #conn.commit()
    conn.close()

def main(arr):
    print(arr[1])
    query = f"""select * from historical_stock_data where ticker_id = '{arr[0]}';"""
    df = query_db(query)
    df = add_stockstats_indicators(df)
    df = add_tapy_indicators(df)
    update_db(df)

if __name__ == '__main__':
    arr =[]
    with open('ticker_list.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if row[2] != 'ticker':
                arr.append([row[1],row[2]])
 
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(main, arr)

    #ticker = 'AA'
    #main(ticker)