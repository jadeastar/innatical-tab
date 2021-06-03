import type { NextApiRequest, NextApiResponse } from 'next'
import { restClient } from '@polygon.io/client-js'
const rest = restClient('MOZLbzmaOWpGsMnBe4XsCAfFXoEhXyHZ')

const stocks = new Map<
  string,
  {
    updatedAt: Date
    data: {
      price: number
      lastClosing: number
    }
  }
>()

const tickers = new Map<string, string>()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ticker } = req.query
  if (!ticker || typeof ticker === 'object')
    return res.status(400).json({
      error: 'InvalidParams'
    })

  if (!tickers.has(ticker)) {
    const tickerData = await rest.reference.tickerDetails(ticker)
    tickers.set(ticker, tickerData.name)
  }

  if (
    !stocks.has(ticker) ||
    (stocks.get(ticker)?.updatedAt.valueOf() ?? 0) > Date.now() + 60000
  ) {
    const data = await rest.stocks.lastTradeForSymbol(ticker)
    const closing = await rest.stocks.previousClose(ticker)

    stocks.set(ticker, {
      data: { price: data.last.price, lastClosing: closing.results[0].c },
      updatedAt: new Date()
    })
  }

  const finalStockData = stocks.get(ticker)
  const finalTickerData = tickers.get(ticker)
  res.json({
    data: finalStockData!.data,
    name: finalTickerData
  })
}
