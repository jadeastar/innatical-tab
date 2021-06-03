import type { NextApiRequest, NextApiResponse } from 'next'
let apikey = 'z8vfB0oKAtjMI97Azt9wq67qlOUQzefI'

let data: any
;(async () => {
  data = await (
    await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apikey}`
    )
  ).json()

  setInterval(async () => {
    data = await (
      await fetch(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apikey}`
      )
    ).json()
  }, 10000)
})()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send(data)
}
