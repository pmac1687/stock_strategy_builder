import pandas as pd
import psycopg2
import csv
import keys

def query_db(query):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    cur.execute(query)
    data = cur.fetchall()
    print('len', len(data))
    df=pd.DataFrame(data, columns=['id', 'ticker', 'company'])
    conn.commit()
    conn.close()
    return df 


if __name__ == '__main__':
    query = """select * from master_ticker_list;"""
    df = query_db(query)
    df.to_csv('ticker_list.csv', mode='a')