import psycopg2
import csv
import random

conn = psycopg2.connect(database="postgres", user="pat", password="1687", host="127.0.0.1", port="5432")

print("Database opened successfully")


cur = conn.cursor()

with open('../csv/tickets.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if len(row) > 0:
            #print(row)
            ticker = row[0].split(' ')[4]
            name = row[0].split(' ')[6]
            myuuid = random.getrandbits(30)

            cur.execute(f"INSERT INTO master_ticker_list (ID,ticker,company) VALUES (%s, %s, %s);",(myuuid, ticker, name))


            conn.commit()
print("Records created successfully")
conn.close()