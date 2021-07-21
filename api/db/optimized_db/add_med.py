import psycopg2
import keys
import csv
from fastquant import get_stock_data
from asgiref.sync import sync_to_async
import asyncio
from psycopg2.pool import ThreadedConnectionPool
import psql_pool
from threading import Semaphore


class ReallyThreadedConnectionPool(ThreadedConnectionPool):
    def __init__(self, minconn, maxconn, *args, **kwargs):
        self._semaphore = Semaphore(maxconn)
        super().__init__(minconn, maxconn, *args, **kwargs)

    def getconn(self, *args, **kwargs):
        self._semaphore.acquire()
        return super().getconn(*args, **kwargs)

    def putconn(self, *args, **kwargs):
        super().putconn(*args, **kwargs)
        self._semaphore.release()

DSN = f"postgresql://{keys.user}:{keys.password}@{keys.host}:5432/postgres"
tcp = ReallyThreadedConnectionPool(1, 800, DSN)

def insert_df_db(ticker,mean):
    conn = tcp.getconn()
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")

    que = f"""update master_ticker_list set median_close={mean} where ticker='{ticker}';"""
    print(que)
    psql_pool.Pcursor().execute(que)

    tcp.putconn(conn, close=False)

async def main(arr_csv):
    #cur.execute(f"select * from master_ticker_list limit 5;")
    f_str = f''
    for ticker in arr_csv:
        print(ticker)
        
        try:
            df = await sync_to_async(get_stock_data)(ticker,"2019-1-1", "2021-7-1")
            if len(df) > 0:
                print(df)
                df = df.fillna(0)
                df = df.replace('', 0)
                print(df['close'])
                mean = round(df['close'].mean())
                print(type(mean))
                insert_df_db(ticker,mean)

        except AttributeError as e:
            print(e)





if __name__ == '__main__':
    arr_csv = []
    with open('master_ticker_list.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            arr_csv.append(row[1])

        print(arr_csv)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(arr_csv))
