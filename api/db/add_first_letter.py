import psycopg2
import keys
import csv

arr_id = []
arr_letter = []
with open('ticker_list.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        arr_id.append(row[1])
        arr_letter.append(row[2][0])


arr_id.pop(0)
arr_letter.pop(0)
print(arr_letter)
conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
cur = conn.cursor()
#cur.execute(f"select * from master_ticker_list limit 5;")
f_str = f''
print(range(len(arr_id)))
for i in range(len(arr_id)):
    ticker = int(arr_id[i])
    print(arr_letter[i])
    print(i)
    print(ticker)
    que = f"""update master_ticker_list set first_letter='{arr_letter[i]}' where id={arr_id[i]};"""
    print(que)
    cur.execute(que)

conn.commit()
conn.close()