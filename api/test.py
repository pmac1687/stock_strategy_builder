import psycopg2



conn = psycopg2.connect(database="postgres", user="pat", password="1687", host="34.229.138.224", port="5432")

cur = conn.cursor()

cur.execute(f"select * from master_ticker_list")

print(cur.fetchone())




conn.commit()
conn.close()