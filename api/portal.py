# importing the flask library files
from flask import Flask
import json
from flask_cors import CORS
import csv
import main

#create flask web app object
app = Flask(__name__)
CORS(app)



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
            'ma_div': str(row['ma_div'])
        }
        arr.append(dic)
    return json.dumps(arr)

#run the app
if __name__ == "__main__":
    app.run(debug=True)