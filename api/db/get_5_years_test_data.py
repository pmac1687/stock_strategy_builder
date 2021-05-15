import psycopg2
import csv
import random
from fastquant import get_stock_data

conn = psycopg2.connect(database="postgres", user="pat", password="1687", host="127.0.0.1", port="5432")

cur = conn.cursor()

print("Database opened successfully")

with open('../csv/tickets.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if len(row) > 0:
            #print(row)
            ticker = row[0].split(' ')[4]
            print(ticker)
            data = get_stock_data(ticker, "2019-1-1", "2021-5-10")
            for index, row in data.iterrows():
                print(index)
                print(row['open'])
                myuuid = random.getrandbits(45)
                cur.execute(f"INSERT INTO historical_stock_data (ticker_id,open,close,high,low,volume,date) VALUES ((select id from master_ticker_list where ticker=%s), %s, %s,%s,%s,%s,%s);",(ticker, row.open, row.close, row.high, row.low, row.volume, index))
                conn.commit()


conn.close()


"""ticker = get_stock_data('aapl', "2020-1-1", "2021-5-10")

print(ticker)

cur = conn.cursor()"""