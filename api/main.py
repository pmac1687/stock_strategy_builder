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
    f_high = 0
    f_low = 0
    trend_c = 0
    trend_m = 0
    f_up = []
    f_down = []
    ma_trend = []
    close_trend = []
    arr = [f_up,f_down,ma_trend, close_trend]
    boll_ub_div_arr = []
    boll_ub_div_perc_arr = []
    boll_lb_div_arr = []
    boll_lb_div_perc_arr = []
    data['ma_div'].replace(to_replace='',
                 value =0.0,
                 inplace=True)
    #data['ao_percent'] = 0.0
    for i in range(len(data)):
        close = data['Close'][i]
        ao = data['ao'][i]
        ma_div = data['ma_div'][i]
        boll = data['boll'][i]
        boll_ub = data['boll_ub'][i]
        boll_lb = data['boll_lb'][i]
        for b in arr:
            b.append(0)
        if data['fractal_highs'][i] == True:
            f_high += 1
        if data['fractal_lows'][i] == True:
            f_low += 1
        if data['trend_close'][i] == 'up':
            trend_c += 1
        if data['trend_close'][i] == 'down':
            trend_c -= 1
        if data['trend_ma'][i] == 'up':
            trend_m += 1
        if data['trend_ma'][i] == 'down':
            trend_m -= 1
        try:
            perc_ao = int(ao) / int(close)
            ao_percent.append(perc_ao * 100)
            #data.loc[i, 'ao_percent'] = perc_ao * 100
            perc_ma_div = int(ma_div) / int(close)
            ma_div_perc.append(perc_ma_div * 100)
            boll_ub_div = int(boll) - int(boll_ub)
            boll_ub_div_perc = boll_ub_div / int(boll) if int(boll) != 0 else 0
            boll_ub_div_arr.append(boll_ub_div)
            boll_ub_div_perc_arr.append(boll_ub_div_perc * 100)

            boll_lb_div = int(boll) - int(boll_lb)
            boll_lb_div_perc = boll_lb_div / int(boll) if int(boll) != 0 else 0
            boll_lb_div_arr.append(boll_lb_div)
            boll_lb_div_perc_arr.append(boll_lb_div_perc * 100)

        except:
            print('error', data[i])

    data['ao_percent'] = ao_percent
    data['ma_div_perc'] = ma_div_perc
    data['boll_ub_div_arr'] = boll_ub_div_arr
    data['boll_ub_div_perc_arr'] = boll_ub_div_perc_arr
    data['boll_lb_div_arr'] = boll_lb_div_arr
    data['boll_lb_div_perc_arr'] = boll_lb_div_perc_arr
    data['f_up'] = f_up
    data['f_down'] = f_down
    data['ma_trend'] = ma_trend
    data['close_trend'] = close_trend
    data['f_up'].replace(to_replace=0,
                 value =f_high,
                 inplace=True)
    data['f_down'].replace(to_replace=0,
                 value =f_low,
                 inplace=True)
    data['ma_trend'].replace(to_replace=0,
                 value =trend_m,
                 inplace=True)
    data['close_trend'].replace(to_replace=0,
                 value =trend_c,
                 inplace=True)
    return data

def get_table_series_data(df, dates):
    print(df)
    date1 = dates.split(',')[0]
    date2 = dates.split(',')[1]
    dates = [date1,date2]
    dates.sort()
    print(dates)
    dats = []
    for i in range(len(df)):
        date = df.iloc[i].name.split(' ')[0]
        #print(date2)
        if date >= dates[0] and  date <= dates[1]:
            print('dat', date)
            dats.append(i)
    data = df[dats[0]:dats[-1]]
    data = add_extra_table_columns(data)
    data = make_dict_objects(data)


    return data

def make_dict_objects(data):  
    arr = []
    print(data.columns)
    dates = data.index
    close_trend_count = 0
    for i in range(len(data)):
        spread = max(data['High']) - min(data['Low'])
        spread_perc = (spread / max(data['High'])) * 100
        if data['trend_close'][i] == 'up':
            close_trend_count += 1
        else:
            close_trend_count -= 1
        print(dates[i])
        dic = {
            'open': data['open'][i],
            'close': data['Close'][i],
            'highs': data['High'][i],
            'lows': data['Low'][i],
            'volume': data['volume'][i],
            'rsi': data['rsi_12'][i],
            'ao': data['ao'][i],
            'boll': data['boll'][i],
            'boll_ub': data['boll_ub'][i],
            'boll_lb': data['boll_lb'][i],
            'macd_value': data['macd_value'][i],
            'macd_signal': data['macd_signal'][i],
            'macd_v_high': max(data['macd_signal']),
            'macd_v_low': min(data['macd_value']),
            'macd_s_high': max(data['macd_signal']),
            'macd_s_low': min(data['macd_signal']),
            'fractal_highs': data['fractal_highs'][i],
            'fractal_lows': data['fractal_lows'][i],
            'f_high': data['f_high'][i],
            'f_low': data['f_low'][i],
            'macd_h': data['macd_h'][i],
            'ma': data['ma'][i],
            'ma_div': data['ma_div'][i],
            'trend_ma': data['trend_ma'][i],
            'trend_close': data['trend_close'][i],
            'ao_percent': data['ao_percent'][i],
            'ma_div_perc': data['ma_div_perc'][i],
            'boll_ub_div_arr': data['boll_ub_div_arr'][i],
            'boll_ub_div_perc_arr': data['boll_ub_div_perc_arr'][i],
            'boll_lb_div_arr': data['boll_lb_div_arr'][i],
            'boll_lb_div_perc_arr': data['boll_lb_div_perc_arr'][i],
            #running count for ref series
            'close_trend_count': close_trend_count,
            'high_low_div': data['High'][i] - data['Low'][i],
            'high_low_div_perc': ((data['High'] - data['Low']) / data['Close'][i]) * 100,
            'f_up': data['f_up'][i],
            'f_down': data['f_down'][i],
            'ma_trend': data['ma_trend'][i],
            'close_trend': data['close_trend'][i],
            'ao_high' : max(data['ao']),
            'ao_low' : min(data['ao']),
            'ao_p_high' : max(data['ao_percent']),
            'ao_p_low' : min(data['ao_percent']),
            'high' : max(data['High']),
            'low' : min(data['Low']),
            'open_close_div': data['Close'][i] - data['open'][i],
            'open_close_div_perc': ((data['Close'][i] - data['open'][i]) / data['Close'][i]) * 100,
            'ma_high' : max(data['ma']),
            'ma_low' : min(data['ma']),
            'ma_div_h' : max(data['ma_div']),
            'ma_div_l' : min(data['ma_div']),
            'ma_div_p_h' : max(data['ma_div_perc']),
            'ma_div_p_l' : min(data['ma_div_perc']),
            'macd_h_high' : max(data['macd_h']),
            'macd_h_low' : min(data['macd_h']),
            'macd_h_perc': (data['macd_h'][i] / data['macd_value'][i]) * 100,
            'open_h' : max(data['open']),
            'open_l' : min(data['open']),
            'close_h' : max(data['Close']),
            'close_l' : min(data['Close']),
            'rsi_h' : max(data['rsi_12']),
            'rsi_l' : min(data['rsi_12']),
            'vol_h' : max(data['volume']),
            'vol_l' : min(data['volume']),
            'vol_div':  data['volume'][i] - max(data['volume']),
            'vol_div_perc': ((data['volume'][i] - max(data['volume'])) / max(data['volume'])) * 100,
            'date': dates[i].split(' ')[0],
            'dates': f'{dates[0].split(" ")[0]},{dates[-1].split(" ")[0]}',
            'boll_div_h' : max(data['boll_ub_div_arr']),
            'boll_div_p_h' : max(data['boll_ub_div_perc_arr']),
            'boll_div_l' : min(data['boll_lb_div_arr']),
            'boll_div_p_l' : max(data['boll_lb_div_perc_arr']),
            'h_l_spread': spread,
            'h_l_spread_perc': spread_perc

        }
        arr.append(dic)
    res = []
    print(len(arr), 'arrrrrllllll')
    for x in arr:
        dict = {k: stringy(v) for k, v in x.items()}
        res.append(dict)
    print(len(res), 'lengtthhhhhh')
    return res

def stringy(v):
    v = str(v)
    if v != False and v != True:
        if '.' in v:
            first = v.split('.')[0]
            second = v.split('.')[1]
            v = f'{first}.{second[0:2]}'
    return v

def get_stock_data(tick):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(f"select * from historical_stock_data where ticker_id in (select ticker_id from master_ticker_list where ticker='{tick}');")
    data = cur.fetchall()
    print(data,'get_stock_data')
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

    return stock


def main(tick):
    tick = tick.upper()
    print(tick)
    data = get_stock_data(tick)
    print(data)
    data = convert_to_pandas(data)
    return data

if __name__=='__main__':
    ticker = 'aapl'
    main('aapl')
    get_ticker_list()
    print('hello')