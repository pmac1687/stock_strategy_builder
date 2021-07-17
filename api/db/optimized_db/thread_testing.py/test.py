from fastquant import get_stock_data
import concurrent.futures
import asyncio
import logging
import sys
import time

async def foo(item):
    df = await get_stock_data(item, "2019-1-1", "2021-7-1")
    return df
    

def get_data(item):
    print(item)
    
    df = get_stock_data(item, "2019-1-1", "2021-7-1")

    print(df)



def main():

    loop = asyncio.get_event_loop()
    loop.run_until_complete(get_data())
    loop.close()

    #asyncio.run(get_data())


async def run_blocking_tasks(executor):
    arr = ['aapl','msft','tsla','fb']

    loop = asyncio.get_event_loop()
    blocking_tasks = [
        loop.run_in_executor(executor, get_data, i)
        for i in arr
    ]
    completed, pending = await asyncio.wait(blocking_tasks)



if __name__ == '__main__':
    executor = concurrent.futures.ThreadPoolExecutor(
        max_workers=3,
    )

    event_loop = asyncio.get_event_loop()
    try:
        event_loop.run_until_complete(
            run_blocking_tasks(executor)
        )
    finally:
        event_loop.close()





    #arr = ['aapl','msft','tsla','goog','fb','amzn']
    #
    #with concurrent.futures.ThreadPoolExecutor() as executor:
    #    executor.map(main, arr)