# importing the flask library files
from flask import Flask
import json
from flask_cors import CORS
import csv
import main

#create flask web app object
app = Flask(__name__)
CORS(app)



@app.route("/tickerList")
def get_tickers():
    data = main.get_ticker_list()
    arr = []
    for i in data:
        dic = {
            "label": f'{i[1]}  {i[2]}',
            "value": i[0],
        }
        arr.append(dic)
    return json.dumps(arr)

@app.route("/candlestick/<ticker>")
def get_candlestick(ticker):
    data = main.main(ticker)
    arr = []
    for row_index,row in data.iterrows():
        if row['green'] == True:
            open_green =  str(row['open'])
            close_green =  str(row['Close'])
            high_green = '1'#str(row['High'] - row['Close']) if row['Close'] > row['open'] else str(row['High'] - row['open'])
            low_green = '1'# str(row['Close'] - row['Low']) if row['Close'] > row['open'] else str(row['open'] - row['Low'])
            dic = {
                'date': row_index.split(' ')[0],
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
                'date': row_index.split(' ')[0],
                "bar_red": [open_green,close_green],
                "line_red": [high_green, low_green],
                'bar_green': ['',''],
                'line_green': ['',''],
                'close': str(row['Close'])
            }
            arr.append(dic)
    
    return json.dumps(arr)


@app.route("/<ticker>")
def get_historical(ticker):
    data = main.main(ticker)
    arr = []
    for row_index,row in data.iterrows():
        dic = {
            'date': row_index.split(' ')[0],
            'close': str(row['Close']),
            'high': str(row['High']),
            'low': str(row['Low']),
            'volume': str(row['volume']),
            #bollinger
            'boll': str(row['boll']),
            'boll_ub': str(row['boll_ub']),
            'boll_lb': str(row['boll_lb']),
            #awesome
            'ao': str(row['ao']),
            #rsi
            'rsi_6': str(row['rsi_12']),
            #ma
            'ma' : str(row['ma']),
            'ma_div': str(row['ma_div']),
            #trending
            'trend_close': str(row['trend_close']),
            'trend_ma': str(row['trend_ma']),
            #fractals
            'fractal_highs': row['fractal_highs'],
            'fractal_lows': row['fractal_lows'],
            'f_lows': str(row['f_low']),
            'f_highs': str(row['f_high']),
            #macd
            'macd_value': str(row['macd_value']),
            'macd_signal': str(row['macd_signal']),
            'macd_h': str(row['macd_h']),
        }
        arr.append(dic)
    return json.dumps(arr)

@app.route("/table/<dates>")
def get_table(dates):
    print(dates)
    data = main.main(dates[2])
    data = main.get_table_series_data(data, dates)
    return json.dumps(data)

#run the app
if __name__ == "__main__":
    app.run(debug=True)