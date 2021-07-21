import csv
import psycopg2
import keys


conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
cur = conn.cursor()

cur.execute(f"""select * from master_ticker_list;""")
data = cur.fetchall()
print(data)
conn.commit()
conn.close()

with open('master_ticker_list.csv', 'w') as csvfile:
    fieldnames = ['ticker_id', 'ticker','first_letter','company','median']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()

    for dat in data:
        writer.writerow({'ticker_id':dat[0], 'ticker':dat[1],'first_letter':dat[2],'company':dat[3],'median':dat[4]})

