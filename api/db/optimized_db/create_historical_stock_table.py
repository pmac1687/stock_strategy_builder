import psycopg2
import keys



query = """create table historical_stock_data (ticker_id int, date date not null,
open int, close int, high int, low int, volume int, rsi_12 int,rsi_6 int,
rsi_18 int, rsi_24 int, macd int, macd_sig int,macd_hist int, boll int,boll_ub int,
boll_lb int, sma_10 int, sma_50 int, sma_200 int,ema_50 int, ema_10 int ,ema_200 int, 
ao int, atr int, smma_5 int, smma_50 int, smma_200 int, momentum int, accel_oss int,
alligator_jaw int, alligator_teeth int, alligator_lips int, gator_value1 int, gator_value2 int,
f_high text, f_low text) partition by range(date);  """



conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
cur = conn.cursor()
    
cur.execute(query)

conn.commit()
conn.close()