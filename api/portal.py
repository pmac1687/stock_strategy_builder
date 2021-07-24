# importing the flask library files
from flask import Flask
#import json
import simplejson as json
from flask_cors import CORS
import csv
import main
import filter
import new_main
import candlestick_main

#create flask web app object
app = Flask(__name__)
CORS(app)

@app.route("/filter/<filters>")
def filter_ticks(filters):
    letters = [filters.split(',')[0], filters.split(',')[1]]
    price = [filters.split(',')[2], filters.split(',')[3]]
    period = [filters.split(',')[4], filters.split(',')[5]]
    trend_period = [filters.split(',')[6]]
    limit = filters.split(',')[7]
    print(trend_period)
    data = filter.main(letters, price, period, trend_period, limit)
    columns = data.columns
    tick_dic_arr = []
    print(data.iloc[0])
    data['date'] = data['date'].apply(lambda x: x.strftime("%Y-%m-%d"))
    ticks = data['ticker']
    print(set(ticks))
    for i in ticks:
        print(i)
    print(data)
    for row_index,row in data.iterrows():
        dic = {}
        for col in columns:
            dic[col] = row[col]
            if col == columns[-1]:
                tick_dic_arr.append(dic)
    master = {}
    arr = []
    for dic in tick_dic_arr:
        if len(arr) == 0 or dic['ticker'] == arr[0]['ticker']:
            arr.append(dic)
        else:
            master[arr[0]['ticker']] = arr
            arr = []


    return json.dumps(master)

@app.route("/tickerList")
def get_tickers():
    print('hello')
    data = new_main.get_ticker_list()
    arr = []
    print(data,'where is it')
    for i in data:
        dic = {
            "label": f'{i[1]}  {i[3]}',
            "value": i[0],
        }
        arr.append(dic)
    return json.dumps(arr)

@app.route("/candlestick/<ticker>")
def get_candlestick(ticker):
    data = candlestick_main.main(ticker)
    arr = []
    data['date'] = data['date'].apply(lambda x: x.strftime("%Y-%m-%d"))
    for row_index,row in data.iterrows():
        print(row['open'], row['Close'], row['date'])
        if row['green'] == True:
            open_green =  str(row['open'])
            close_green =  str(row['Close'])
            high_green = '1'#str(row['High'] - row['Close']) if row['Close'] > row['open'] else str(row['High'] - row['open'])
            low_green = '1'# str(row['Close'] - row['Low']) if row['Close'] > row['open'] else str(row['open'] - row['Low'])
            dic = {
                'date': row['date'],
                "bar_green": [open_green,close_green],
                "line_green": [high_green, low_green],
                'bar_red': ['',''],
                'line_red': ['',''],
                'close': str(row['Close'])
            }
            arr.append(dic)
        if row['green'] == False:
            open_green =  str(row['open'])
            close_green =  str(row['Close'])
            high_green = '1'#str(row['High'] - row['Close']) if row['Close'] > row['open'] else str(row['High'] - row['open'])
            low_green = '1' #str(row['Close'] - row['Low']) if row['Close'] > row['open'] else str(row['open'] - row['Low'])
            dic = {
                'date': row['date'],
                "bar_red": [open_green,close_green],
                "line_red": [high_green, low_green],
                'bar_green': ['',''],
                'line_green': ['',''],
                'close': str(row['Close'])
            }
            arr.append(dic)
        
    print(arr)

    return json.dumps(arr)


@app.route("/<ticker>")
def get_historical(ticker):
    print(ticker, 'ticker')
    data = new_main.main(ticker)
    data['date'] = data['date'].apply(lambda x: x.strftime("%Y-%m-%d"))
    print(data['date'])
    columns = data.columns
    print(columns)
    tick_dic = {}
    for row_index,row in data.iterrows():
        dic = {}
        for col in columns:
            dic[col] = row[col]
            if col == columns[-1]:
                tick_dic[str(row_index)] = dic

        
    #print(data.to_dict())
    return tick_dic

@app.route("/table/<dates>")
def get_table(dates):
    print('tick', dates)
    tick = dates.split(',')[2]
    data = new_main.main(tick)
    #data = main.get_table_series_data(data, dates)
    print(data)
    columns = data.columns
    tick_dic = {}
    for row_index,row in data.iterrows():
        dic = {}
        for col in columns:
            dic[col] = row[col]
            if col == columns[-1]:
                tick_dic[str(row_index)] = dic
    return tick_dic

@app.route("/dateRange")
def get_date_range():
    data = new_main.get_dates()
    data = [x[0] for x in data]
    data.sort()
    print(data)
    data = [x.strftime("%Y-%m-%d") for x in data]   
    #print(data)
    return json.dumps(data)

#run the app
if __name__ == "__main__":
    app.run(debug=True)