import psycopg2
import pandas as pd
import keys

def get_abc_arr(lets):
    alphabets_in_lowercase=[]
    for i in range(97,123):
        alphabets_in_lowercase.append(chr(i))
    abc = alphabets_in_lowercase
    ind_1 = abc.index(lets[0])
    ind_2 = abc.index(lets[1]) + 1
    abc = abc[ind_1:ind_2]
    abc = str(abc).replace('[', '').replace(']', '')
    print(abc)
    return abc

def build_query(lets, price, period, t_period):
    abc = get_abc_arr(lets)
    #query = f"select * from historical_stock_data where ticker_id in (select id from master_ticker_list where left(ticker, 1) in ('A', 'b'));"
    query = f"select ticker from master_ticker_list where left(ticker, 1) in ({abc});"
    return query

def query_db(query):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(query)
    data = cur.fetchall()
    print(data)
    conn.commit()
    conn.close()
    return data 

def main(letters, price, period, trend_period):
    query = build_query(letters, price, period, trend_period)
    query_db(query)
    

if __name__ == '__main__':
    letters = ['a','b']
    price = ['0', '1000']
    period = ['1-21-2021', '2-21-2021']
    trend_period = ['12-21-2020']
    main(letters, price, period,trend_period)