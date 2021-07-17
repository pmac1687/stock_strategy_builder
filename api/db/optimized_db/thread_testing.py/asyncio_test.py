from fastquant import get_stock_data
import asyncio
import time
import itertools
from concurrent.futures import ThreadPoolExecutor
from psycopg2.pool import ThreadedConnectionPool
import psql_pool
import concurrent.futures

import psycopg2
import keys


_executor = ThreadPoolExecutor()

DSN = f"postgresql://{keys.user}:{keys.password}@{keys.host}:5432/postgres"
tcp = ThreadedConnectionPool(1, 800, DSN)

from asgiref.sync import sync_to_async


def push_threaded_data(df):
    conn = tcp.getconn()
    cur = conn.cursor()
    psql_pool.Pcursor().execute(f"""insert into mock (name, number) values ('{df[1]}', {df[0].iloc[0]['open']});""")

def insert_data(df, name):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    que = f"""insert into mock (name, number) values ('{name}', {df.iloc[0]['open']});"""
    cur.execute(que)
    print(que)
    print(cur.fetchone())
    conn.commit()
    conn.close()


async def main():
    arr = ['aapl','msft','tsla','fb']
    dfs = []
    for item in arr:
        #df = await loop.run_in_executor(_executor, get_stock_data, item, "2019-1-1", "2021-7-1")
        df = await sync_to_async(get_stock_data)(item,"2019-1-1", "2021-7-1")
        push_threaded_data([df,item])

    #with concurrent.futures.ThreadPoolExecutor() as executor:
    #    executor.map(push_threaded_data, dfs)

if __name__ == "__main__":
    start_time = time.perf_counter()

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    print(f"Elapsed run time: {elapsed_time} seconds")