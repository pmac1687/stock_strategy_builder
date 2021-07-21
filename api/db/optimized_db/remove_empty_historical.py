import csv
import psycopg2
import keys
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

#conn = tcp.getconn()
#cur = conn.cursor()

#with open('master_ticker_list.csv') as csv_file:
#    csv_reader = csv.reader(csv_file, delimiter=',')
#    line_count = 0
#    for row in csv_reader:
conn = tcp.getconn()
cur = conn.cursor()
#print(row)
#id = int(row[0])
print(id)
que = f"""select * from historical_stock_data where ticker_id in (select ticker_id from master_ticker_list where median_close is null);"""
psql_pool.Pcursor().execute(que)
print(cur.fetchall())

tcp.putconn(conn, close=False)

