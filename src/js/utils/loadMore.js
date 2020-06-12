import fetch from 'unfetch'
import { api } from './utils'

const loadMore = async (url, pageNumber, sorting) => {
  const r = await fetch(
    url +
      '&pageSize=5&page= ' +
      pageNumber +
      '&sortBy=' +
      sorting +
      '&apiKey=' +
      api.key
  )
  const d = await r.json()

  document.querySelector('.searchbar__list').innerHTML += d.articles
    .map(
      (article) => `<li class="searchbar__item">
              <a href="${article.url}" title="${article.title.substr(
        0,
        34
      )}..." class="searchbar__link">
              ${article.title}
              </a>
              <span class="searchbar__details">
              <strong>Source:</strong> ${article.source.name} ${
        article.author ? '– ' + article.author : ''
      }
              </span>
              </li>`
    )
    .join('')
}

export default loadMore
