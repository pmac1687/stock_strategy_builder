import psycopg2
import keys

#'1-21-2021', '2-21-2021']

###2019-1-1 , 2021-6-30

months = ['2019-1-1','2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1','2019-6-1', '2019-7-1', '2019-8-1', '2019-9-1','2019-10-1','2019-11-1','2019-12-1','2020-1-1','2020-2-1', '2020-3-1','2020-4-1','2020-5-1','2020-6-1','2020-7-1','2020-8-1','2020-9-1','2020-10-1','2020-11-1','2020-12-1','2021-1-1','2021-2-1','2021-3-1','2021-4-1','2021-5-1','2021-6-1','2021-7-1']

conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
cur = conn.cursor()
    

for i in range(len(months)):
    dat = months[i]
    if dat != months[-1]:
        title = f'date_{dat.split("-")[0]}{dat.split("-")[1]}'
        query = f"""create table {title} partition of historical_stock_data
                    for values from ('{dat}') to ('{months[i+1]}');"""
        cur.execute(query)

conn.commit()
conn.close()