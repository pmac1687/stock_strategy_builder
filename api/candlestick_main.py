

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

def get_stock_data(tick):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    now = time.time()
    cur.execute(f"select date, open, Close from historical_stock_data where historical_stock_data.ticker_id in (select ticker_id from master_ticker_list where ticker='{tick}') order by date asc;")
    data = cur.fetchall()
    print(data,'get_stock_data')
    conn.commit()
    conn.close()
    return data

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

def main(tick):
    tick = tick.upper()
    data = get_stock_data(tick)
    cols = ['date','open','Close']
    dic = {}
    for i in range(len(cols)):
        arr = []
        for b in range(len(data)):
            arr.append(data[b][i])
            if b == len(data) - 1:
                dic[cols[i]] = arr

    df = pd.DataFrame(dic, columns=cols)
    df['date'] = df['date'].apply(lambda x: x.strftime("%Y-%m-%d"))
    df.sort_values(by='date')
    data = get_candle_stats(df)
    return data

if __name__ == '__main__':
    main('aapl')