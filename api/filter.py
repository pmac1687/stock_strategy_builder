import psycopg2
import pandas as pd
import keys
import json
import pickle
import decimal

def get_abc_arr(lets):
    alphabets_in_lowercase=[]
    for i in range(65,91):
        alphabets_in_lowercase.append(chr(i))
    abc = alphabets_in_lowercase
    print(abc)
    ind_1 = abc.index(lets[0])
    ind_2 = abc.index(lets[1]) + 1
    abc = abc[ind_1:ind_2]
    abc = str(abc).replace('[', '').replace(']', '')
    print(abc)
    return abc


def build_query(lets, price, period, trend_period, limit):
    abc = get_abc_arr(lets)
    #query = f"select * from historical_stock_data where ticker_id in (select id from master_ticker_list where left(ticker, 1) in ('A', 'b'));"
    #query =  f"""select * from historical_stock_data where ticker_id
    #             in (select * from master_ticker_list where left(ticker, 1)
    #              in ({abc})) and '{period[0]}'::date < date::date and 
    #              date::date < '{period[1] if trend_period != '' else trend_period}'::date
    #               ;"""

    query = f""" select ticker_id, open, close, high, low, volume, date from historical_stock_data where ticker_id in (select id from master_ticker_list 
                where first_letter in ({abc}))
                and '{period[0]}'::date < date::date and 
                date::date < '{period[1] if trend_period != '' 
                else trend_period}'::date;"""
    #query = f"select ticker from master_ticker_list where left(ticker, 1) in ({abc});"
    return query

def query_db(query):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(query)
    data = cur.fetchall()
    print('len', len(data))
    df=pd.DataFrame(data, columns=['ticker_id','open', 'close', 'high','low','volume', 'date'])
    conn.commit()
    conn.close()
    return df 

def filter_by_price(df, price):
    #only include if close price within price bounds
    print('before', df.iloc[0])
    ids = set(df['ticker_id'].to_list())
    for _id in ids:
        ser = df[df['ticker_id'] == _id]
        maxed = max(ser['close'])
        mined = min(ser['close'])
        #print(mined,maxed)
        #print(mined, maxed, 'min/max/error')
        if int(mined) < int(price[0]) or int(maxed) > int(price[1]):
            #print(mined, maxed, ser.index)
            #ser.index is list o indexes to be removed per max or min not
            # in price range
            #print('min/max', mined,maxed)
            df.drop(ser.index, inplace=True)

    #df = df.apply(lambda x: str(x) if type(x) == decimal.Decimal else x)
    return df

def split_df_by_ticker(df):
    df_dict = dict()
    # or as a dict comprehension: the unique Row value will be the key
    df_dict = {g: d for g, d in df.groupby('ticker')}
    print(type(df_dict['AAU']))
    print(pickle.dumps(df_dict))
    for _key in df_dict.keys():
        #df_dict[_key] = df_dict[_key].apply(lambda x: str(x) if type(x) == decimal.Decimal else x)
        df_dict[_key] = df_dict[_key].to_dict()
    return df_dict

def main(letters, price, period, trend_period, limit):
    query = build_query(letters, price, period, trend_period, limit)
    df = query_db(query)
    df = filter_by_price(df, price)
    df = split_df_by_ticker(df)
    return df
    

if __name__ == '__main__':
    letters = ['A','A']
    price = ['0', '2']
    period = ['1-21-2021', '2-21-2021']
    trend_period = ['12-21-2020']
    main(letters, price, period,trend_period,'')