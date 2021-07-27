from numpy.core.numeric import NaN
import psycopg2
import pandas as pd
import stockstats
import keys
from tapy import Indicators
import numpy as np
import math
import time
import simplejson as json

def get_stock_data(tick, d1, d2):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    now = time.time()
    cur.execute(f"""select * from historical_stock_data 
    where ticker_id in (select ticker_id from master_ticker_list 
    where ticker='{tick}') and date::date > '{d1}'::date and date::date < '{d2}'::date ;""")
    data = cur.fetchall()
    print(data,'get_stock_data', time.time()-now)
    conn.commit()
    conn.close()
    return data

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


def add_moving_avg(df):
    ma = []
    percent = []
    #df['Close'].apply(convert_int)
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

def get_ticker_list():
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(f"select * from master_ticker_list;")
    data = cur.fetchall()
    print('daaaaatsss',data)
    conn.commit()
    conn.close()
    return data

def get_dataframe(data):
    cols = ['ticker_id' , 'date' , 'open' , 'Close' , 'High' , 'Low' , 'volume' , 'rsi_12' , 'rsi_6' ,
            'rsi_18' , 'rsi_24' ,'macd_value' , 'macd_signal' , 'macd_h' , 'boll' , 'boll_ub' , 'boll_lb' ,
             'sma_10' , 'sma_50' , 'sma_200' , 'ema_50' , 'ema_10' , 'ema_200' , 'ao', 'atr' , 'smma_5' 
            , 'smma_50' , 'smma_200' , 'momentum' , 'accel_oss' , 'alligator_jaw' , 'alligator_teeth' 
             , 'alligator_lips' , 'gator_value1' , 'gator_value2', 'fractal_highs', 'fractal_lows' ]

    dic = {}
    for i in range(len(cols)):
        arr = []
        for b in range(len(data)):
            arr.append(data[b][i])
            if b == len(data) - 1:
                dic[cols[i]] = arr

    df = pd.DataFrame(dic, columns=cols)

    df = add_moving_avg(df)

    df = get_trend(df)

    df = get_candle_stats(df)

    df.fillna(0)

    df.replace(np.nan, '')

    return df


def main(tick, d1, d2):
    tick = tick.upper()
    data = get_stock_data(tick, d1, d2)
    df = get_dataframe(data)
    return df

def get_dates():
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(f"select date from historical_stock_data where historical_stock_data.ticker_id in (select ticker_id from master_ticker_list where ticker='CNTY');")
    data = cur.fetchall()
    print('daaaaatsss',data)
    conn.commit()
    conn.close()
    return data



if __name__ == '__main__':
    main('AAL','2020-06-04', '2020-10-08')