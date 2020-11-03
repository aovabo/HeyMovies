import axios from 'axios'
import config from '../../config.json'

import querystring from 'querystring'

const Search =
  async (req, res) => {
    if (req.method !== 'GET') return

    const title = req.query.title
    if (!title)
      return res.json(
        {
          error: true,
          code: 400,
          message: 'Please specify a title to search for.'
        }
      )

    const year  = parseInt(req.query.year) || null
    const query = querystring.encode(
      {
        apikey: config.OMDB_API_KEY,
        s: title,
        type: 'movie',
        y: year
      }
    )

    const url = `http://www.omdbapi.com/?${query}`

    const response = await axios(
      {
        method: 'GET',
        url
      }
    )
    
    const data = response.data
    if (data.Response === 'True')
      return res.json(
        {
          error: false,
          code: 200,
          data: data.Search,
          totalResults: parseInt(data.totalResults)
        }
      )
    else return res.json(
      {
        error: true,
        code: 404,
        data: null,
        totalResults: 0,
        message: 'No results found.'
      }
    )
  }

export default Search