from numpy.core.numeric import NaN
import psycopg2
import pandas as pd
import stockstats
import keys
from tapy import Indicators
import numpy as np
import math

def add_extra_table_columns(data):
    ao_percent = []
    ma_div_perc = []
    f_highs = 0
    f_lows = 0
    trend_close = 0
    trend_ma = 0
    boll_ub_div_arr = []
    boll_ub_div_perc_arr = []
    print(data.iloc[1])
    for i in range(len(data)):
        close = data['Close'][i]
        ao = data['ao'][i]
        ma_div = data['ma_div'][i]
        boll = data['boll'][i]
        boll_ub = data['boll_ub'][i]
        boll_lb = data['boll_lb'][i]
        if data['fractal_highs'][i] == True:
            f_highs += 1
        if data['fractal_lows'][i] == True:
            f_lows += 1
        if data['trend_close'][i] == 'up':
            trend_close += 1
        if data['trend_close'][i] == 'down':
            trend_close -= 1
        if data['trend_ma'][i] == 'up':
            trend_ma += 1
        if data['trend_ma'][i] == 'down':
            trend_ma -= 1
        try:
            perc_ao = int(ao) / int(close)
            ao_percent.append(perc_ao * 100)
            perc_ma_div = int(ma_div) / int(close)
            ma_div_perc.append(perc_ma_div * 100)
            boll_ub_div = int(boll) - int(boll_ub)
            boll_ub_div_perc = boll_ub_div / int(boll)
            boll_ub_div_arr.append(boll_ub_div)
            boll_ub_div_perc_arr.append(boll_ub_div_perc * 100)

        except:
            print('error', data[i])

    print(boll_ub_div_perc_arr)

def get_table_series_data(df, dates):
    date1 = dates.split(',')[0].split('"')[1]
    date2 = dates.split(',')[1].split('"')[1]
    dats = []
    for i in range(len(df)):
        date = df.iloc[i].name.split(' ')[0]
        #print(dates[0], date)
        if date >= date1 and  date <= date2:
            dats.append(i)
    data = df[dats[0]:dats[-1]]
    data = add_extra_table_columns(data)

    return data
    

def get_stock_data(tick):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(f"select * from historical_stock_data where ticker_id in (select id from master_ticker_list where ticker='AAPL');")
    data = cur.fetchall()
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

    df = get_candle_stats(df)

    df = remove_NANs(df)

    df.fillna(0)

    df.replace(np.nan, '')

    return df

def convert_nan(row):
    if pd.isnull(row):
        row=''
    try:
        if math.isnan(row):
            row = 0.0
    except:
        pass
        #print('error', row)

    return row

def remove_NANs(df):
    columns = ['open', 'Close', 'High', 'Low', 'volume', 'close_-1_s', 'close_-1_d',
       'closepm', 'closenm', 'closepm_12_smma', 'closenm_12_smma', 'rs_12',
       'rsi_12', 'ao', 'boll', 'boll_ub', 'boll_lb', 'macd_value',
       'macd_signal', 'fractal_highs', 'fractal_lows', 'f_high', 'f_low',
       'macd_h', 'ma', 'ma_div', 'trend_ma', 'trend_close', 'green']
    for i in range(len(df)):
        for col in columns:
            try:
                if math.isnan(df[col][i]):
                    df[col][i] = 0.0
            except:
                pass

    return df


def get_candle_stats(df):
    green = []
    for i in range(len(df)):
        if i == 0:
            green.append(True)
        if i != 0 :
            if df.iloc[i]['Close'] > df.iloc[i-1]['Close']:
                green.append(True)
            else:
                green.append(False)
    df['green'] = green
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