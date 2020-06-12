import fetch from 'unfetch'
import { api } from './utils'

const handleSort = async (url, pageNumber, sorting) => {
  const response = await fetch(
    url +
      '&pageSize=5&page= ' +
      pageNumber +
      '&sortBy=' +
      sorting +
      '&apiKey=' +
      api.key
  )
  const data = response.json()

  return data
}

export default handleSort
