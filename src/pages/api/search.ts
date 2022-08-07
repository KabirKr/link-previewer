import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'
import * as cheerio from 'cheerio'
import { WebsiteMetaData } from '@/types/types'

function extractMetaData(data: any) {
  const websiteMetaData: WebsiteMetaData = {
    title: '',
    description: '',
    favicons: [],
    metaTags: [],
  }

  // Load data to cheerio
  const $ = cheerio.load(data)

  // Extract title
  websiteMetaData.title = $('title').text()

  // Extract description
  websiteMetaData.description = $('meta[name="description"]').attr('content')

  // Extract favicons
  $('head')
    .find('link')
    .each((_, el) => {
      if ($(el).attr('rel')?.includes('icon')) {
        websiteMetaData.favicons.push({
          rel: $(el).attr('rel'),
          type: $(el).attr('type'),
          sizes: $(el).attr('sizes'),
          href: $(el).attr('href'),
        })
      }
    })

  // Extract meta data
  $('head')
    .find('meta')
    .each((_, el) => {
      if (
        $(el).attr('property')?.includes('og:') ||
        $(el).attr('name')?.includes('twitter:')
      ) {
        websiteMetaData.metaTags.push({
          name: $(el).attr('name'),
          property: $(el).attr('property'),
          content: $(el).attr('content'),
        })
      }
    })

  return websiteMetaData
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  // TODO Input validation, error handling and edge case handling
  const inputURL = req.body.url

  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )

  if (!pattern.test(inputURL)) {
    res.status(400)
    return
  }

  try {
    const response = await axios.get(inputURL)
    const websiteMetaData = extractMetaData(response.data)

    res.status(200).json({
      message: 'Success',
      data: websiteMetaData,
    })
  } catch (err) {
    console.error(err)
  }
}

export default handler
