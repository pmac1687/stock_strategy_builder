import psycopg2
import pandas as pd
import stockstats
import keys
from tapy import Indicators



def get_stock_data(tick):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(f"select * from historical_stock_data where ticker_id in (select id from master_ticker_list where ticker='AAPL');")
    data = cur.fetchall()
    print(data)
    conn.commit()
    conn.close()
    return data

def get_ticker_list():
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(f"select * from master_ticker_list;")
    data = cur.fetchall()
    conn.commit()
    conn.close()
    return data

def convert_to_pandas(data):
    open = []
    close = []
    high = []
    low = []
    volume = []
    date = []
    columns = ['open','close','high','low','volume','date']
    for dat in data:
        open.append(dat[1])
        close.append(dat[2])
        high.append(dat[3])
        low.append(dat[4])
        volume.append(dat[5])
        date.append(dat[6])
    data = {
        'open':open,
        'close':close,
        'high':high,
        'low':low,
        'volume':volume,
        'date':date
    }
    df = pd.DataFrame (data, columns = columns)
    
    df = add_stockstats_indicators(df)

    df = add_tapy_indicators(df)

    df = add_moving_avg(df)

    df = get_trend(df)

    print(df)
    return df

def get_trend(df):
    close = []
    ma = []
    for i in range(len(df)):
        close.append(df.iloc[i]['Close'])
        ma.append(df.iloc[i]['ma'])
    trend_ma = []
    trend_close = []
    for b in range(len(close)):
        if b > 0:
            if int(close[b]) > int(close[b-1]):
                trend_close.append('up')
            if int(close[b]) <= int(close[b-1]):
                trend_close.append('down')
        else:
            trend_close.append('')

        if ma[b] != '':
            if int(close[b]) > int(ma[b]):
                trend_ma.append('up')
            elif int(close[b]) <= int(ma[b]):
                trend_ma.append('down')
        else:
            trend_ma.append('')
    df['trend_ma'] = trend_ma
    df['trend_close'] = trend_close

    
    return df

def convert_int(val):
    return int(val)

def add_moving_avg(df):
    ma = []
    percent = []
    df['Close'].apply(convert_int)
    for i in range(len(df)):
        if len(ma) < 41:
            ma.append(df.iloc[0]['Close'])
            percent.append('')
        else:
            x = sum(df.iloc[i-40:i]['Close']) / 40
            per = ((int(df.iloc[i]['Close']) - x) / int(df.iloc[i]['Close'])) * 10
            percent.append(per)
            ma.append(x)
    df['ma'] = ma
    df['ma_div'] = percent

    return df

def add_tapy_indicators(df):
    df.rename(columns={
        "high": "High",
        'low':'Low',
        'close': 'Close'
    }, inplace=True)

    df = Indicators(df)

    df.awesome_oscillator(column_name='ao')

    df.bollinger_bands(period=20, deviation=2, column_name_top='boll_ub', column_name_mid='boll', column_name_bottom='boll_lb')

    df.macd(period_fast=12, period_slow=26, period_signal=9, column_name_value='macd_value', column_name_signal='macd_signal')

    df.fractals(column_name_high='fractal_highs', column_name_low='fractal_lows')

    df = df.df

    high = []
    low = []
    macd_h = []
    for i in range(len(df)):
        if df.iloc[i]['fractal_highs'] == True:
            high.append(df.iloc[i]['Close'])
        else:
            high.append('')
        if df.iloc[i]['fractal_lows'] == True:
            low.append(df.iloc[i]['Close'])
        else:
            low.append('')
        if df.iloc[i]['macd_signal'] != 'nan':
            x = df.iloc[i]['macd_value'] - df.iloc[i]['macd_signal']
            macd_h.append(x)
        else:
            macd_h.append('')

    df['f_high'] = high
    df['f_low'] = low
    df['macd_h'] = macd_h
    print(df['f_low'])

    return df



def add_stockstats_indicators(df):
    stock = stockstats.StockDataFrame.retype(df)
    #rsi
    stock['rsi_12']


    return df


def main(tick):
    data = get_stock_data(tick)
    data = convert_to_pandas(data)
    return data

if __name__=='__main__':
    ticker = 'aapl'
    main('aapl')
    get_ticker_list()
    print('hello')