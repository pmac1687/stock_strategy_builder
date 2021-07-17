import asyncio
import requests
from fastquant import get_stock_data
import psycopg2
import keys

import concurrent.futures

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
    loop = asyncio.get_event_loop()
    arr = ['aapl','msft','tsla','fb']
    futtures = []
    responses = []
    for item in arr:
        future = loop.run_in_executor(None, get_stock_data, item, "2019-1-1", "2021-7-1" )
        response = await future
        responses.append(response)








if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())