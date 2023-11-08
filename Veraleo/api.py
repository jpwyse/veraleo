import traceback
import re
import requests
import urllib
import cnbc
from dotenv import load_dotenv
from decouple import config
from datetime import datetime
from ninja import Router
from ninja.errors import HttpError
from ninja.responses import Response
from . utils import clean_data, YFinance

# Create your api's here.

api_key = config('CNBC_API_KEY')

router = Router()

# GET CREATOR NAME
@router.get("/check")
def check(request):
	return {"creator" : "James Wyse"}


# GET WIKIPEDIA DATA
@router.get("/wiki/{query}")
def wiki(request, query: str):
	url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch={query}"
	try:
		response = requests.get(url)
		if response.status_code == 200:
			json = response.json()
			resp = json["query"]
			query_hits = resp["searchinfo"]["totalhits"]

			if query_hits > 0:
				snippet = resp["search"][0]["snippet"]
				try:
					clean_snippet = clean_data(snippet)
					data = {"numberOfHits": query_hits, "firstHit": clean_snippet}
					return data
				except Exception as error:
					print(error)
					data = {"numberOfHits": query_hits, "firstHit": snippet}
					return data
			else:
				data = {"numberOfHits": query_hits, "firstHit": None}
				return data
		else:
			raise HttpError(405, "Error with wikipedia api.")
	except Exception as error:
		print(error)
		print(traceback.format_exc())
		return {"error": error}

		
# GET TICKERS FROM QUERY
@router.get("/tickers/{query}")
def tickers(request, query: str):
	url = "https://cnbc.p.rapidapi.com/v2/auto-complete"
	params = {"q": query}
	headers = {
		"X-RapidAPI-Key": api_key,
		"X-RapidAPI-Host": "cnbc.p.rapidapi.com"
	}

	tickers = []

	response = requests.get(url, headers=headers, params=params)
	if response.status_code == 200:
		json = response.json()
		tags = json["data"]["symbolEntries"]["tags"]
		if len(tags) > 0:
			data = tags[0]["results"]
			for item in data:
				ticker = item.get("symbol")
				if ticker.isalpha():
					tickers.append(ticker)
			return tickers
		else:
			return []
	else:
		raise HttpError(405, "Error with cnbc api.")



# GET MARKET DATA RESEARCH
@router.get("/data/{ticker}")
def data(request, ticker: str):
	try:
		data = YFinance(ticker).info
		return data
	except Exception as error:
		raise HttpError(405, "Error with yfinance api.")


# GET INDUSTRY DATA RESEARCH
@router.get("/news/{ticker}")
def news(request, ticker: str):
	news = []
	try:
		response = cnbc.list_symbol_news(symbol=ticker, api_key=api_key)
		results = response["data"]["symbolEntries"]["results"]
		for item in results:
			headline = item.get("description")
			news.append(headline)
		return news
	except Exception as error:
		print(error)
		raise HttpError(405, "Error with cnbc api.")




