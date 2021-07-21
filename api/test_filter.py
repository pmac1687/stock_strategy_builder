import pytest
from filter import build_query

def test_build_query():
    """
    given ->> letters: arr of strings, price: arr of strings, period: arr of strings, trend_period arr of strings

    """
    assert build_query(['A','A'],['0', '2'],['1-21-2021', '2-21-2021'],'12-21-2020', '') == "select b.open, b.close,b.high,b.low, b.volume, b.date, b.ticker_id from historical_stock_data b, master_ticker_list a where a.first_letter in ('A') and a.ticker_id=b.ticker_id and '1-21-2021'::date < date::date and date::date < '12-21-2020'::date ;"


                                                                                            