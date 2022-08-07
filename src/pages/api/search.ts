import { NextApiRequest, NextApiResponse } from 'next'

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({
      msg: 'Success',
    })
  }

  // Other HTTP methods are not allowed
  res.status(405).end()
}

export default handler
