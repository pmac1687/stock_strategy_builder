import csv
import psycopg2
import random


def get_csv():
    with open('../csv/low_3-30.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        arr = []
        for row in csv_reader:
            if row[0].split('/')[1] == '-1':
                ao = row[0].split('/')[0]
                ticker = row[1].split(':')[1].split('/')[0]
                price = row[4].split(':')[1]
                date = '3/30/2020'
                myuuid = random.getrandbits(30)
                print(price)
                res = [myuuid,date,ao,ticker,price]
                arr.append(res)
        return arr

def put_in_db(dats):
    conn = psycopg2.connect(database="postgres", user="pat", password="1687", host="127.0.0.1", port="5432")

    print("Database opened successfully")

    cur = conn.cursor()
    for i in dats:
        print(i)

        cur.execute(f"INSERT INTO top_ao_list (id, ticker_id,ao,price,date) VALUES (%s, (select id from master_ticker_list where ticker=%s), %s, %s, %s);",(i[0],i[3], i[2], i[4], i[1]))
        conn.commit()


    print("Records created successfully")
    conn.close()

def main():
    dats = get_csv()
    put_in_db(dats)

if __name__ == '__main__':
    main()