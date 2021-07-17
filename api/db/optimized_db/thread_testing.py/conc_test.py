from fastquant import get_stock_data
import time
from concurrent.futures import ProcessPoolExecutor, wait
from multiprocessing import cpu_count
import psycopg2
import keys

def insert_data(df, name):
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()

    cur.execute(f"""insert into mock (name, number) values ('{name}', {df.iloc[0]['open']});""")
    print(cur.fetchall())
    conn.commit()
    conn.close()

def get_data(item):
    print(item)
    
    df = get_stock_data(item, "2019-1-1", "2021-7-1")

    with ProcessPoolExecutor(cpu_count() - 1) as executor:
        executor.submit(get_data, df, name)

    insert_data(df,item)

    print(df)

def main():
    futures = []
    arr = ['aapl','msft','tsla','fb']
    with ProcessPoolExecutor(cpu_count() - 1) as executor:
        futures.append(executor.submit(get_data, ticker))

    wait(futures)


if __name__ == "__main__":
    start_time = time.perf_counter()

    main()


    end_time = time.perf_counter()
    print(f"Elapsed run time: {end_time - start_time} seconds.")