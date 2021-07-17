from fastquant import get_stock_data



try:  
    df = get_stock_data('BLNG',"2019-1-1", "2021-7-1")
except Exception as e:
    print('7')


print(2)