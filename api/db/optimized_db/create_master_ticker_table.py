import psycopg2
import keys
import csv


arr_letter = []
arr_ticker = []
arr_company = []
with open('ticker_list.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        arr_letter.append(row[2][0])
        arr_ticker.append(row[2])
        arr_company.append(row[3]) if "'" not in row[3] else arr_company.append(row[3].replace("'",""))



conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
cur = conn.cursor()
#cur.execute(f"select * from master_ticker_list limit 5;")
f_str = f''
for i in range(len(arr_letter)):
    print(arr_letter[i])
    print(i)
    que = f"""insert into master_ticker_list( ticker, first_letter,company) values ('{arr_ticker[i]}','{arr_letter[i]}', '{arr_company[i]}');"""
    print(que)
    f_str += que
    
cur.execute(f_str)

conn.commit()
conn.close()