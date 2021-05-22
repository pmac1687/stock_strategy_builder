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

#run the app
if __name__ == "__main__":
    app.run(debug=True)