import psycopg2
import keys
import csv

arr_csv = []
with open('ticker_list.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        arr_csv.append(row[1])

    print(arr_csv)
conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
cur = conn.cursor()
#cur.execute(f"select * from master_ticker_list limit 5;")
f_str = f''
for ticker in arr_csv:
    print(ticker)
    ticker = int(ticker)
    que = f"""update master_ticker_list set median=(select percentile_cont(0.5) within group (order by close) from historical_stock_data where ticker_id={ticker}) where id={ticker};"""
    cur.execute(que)

conn.commit()
conn.close()