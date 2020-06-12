import { api, elements } from './utils'
import fetch from 'unfetch'
import loadMore from './loadMore'
import handleSort from './handleSort'

const getNews = async (url) => {
  let pageNumber = 1
  let sorting = 'relevancy'

  const response = await fetch(
    url +
      '&pageSize=5&page= ' +
      pageNumber +
      '&sortBy=' +
      sorting +
      '&apiKey=' +
      api.key
  )
  const data = await response.json()

  if (elements.searchbarInput.value.length > 3 && data) {
    const articleHTML = data.articles
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

    elements.searchbarInput.style =
      'border-top-left-radius: 2.3rem; border-top-right-radius: 2.3rem; border-bottom-left-radius: 0; border-bottom-right-radius: 0; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12); transform: scale(1.1);'

    elements.searchbarBtnSortTop.addEventListener('click', () => {
      sorting = 'popularity'
      handleSort(url, pageNumber, sorting).then(
        (data) =>
          (elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${data.articles
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
        .join('')}</ul>
      `)
      )

      elements.searchbarBtnSortTop.classList.add('searchbar__btn--sort--active')
      elements.searchbarBtnSortNew.classList.remove(
        'searchbar__btn--sort--active'
      )
      elements.searchbarBtnSortRel.classList.remove(
        'searchbar__btn--sort--active'
      )
    })
    elements.searchbarBtnSortNew.addEventListener('click', () => {
      sorting = 'publishedAt'
      handleSort(url, pageNumber, sorting).then(
        (data) =>
          (elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${data.articles
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
        .join('')}</ul>
      `)
      )

      elements.searchbarBtnSortTop.classList.remove(
        'searchbar__btn--sort--active'
      )
      elements.searchbarBtnSortNew.classList.add('searchbar__btn--sort--active')
      elements.searchbarBtnSortRel.classList.remove(
        'searchbar__btn--sort--active'
      )
    })
    elements.searchbarBtnSortRel.addEventListener('click', () => {
      sorting = 'relevancy'
      handleSort(url, pageNumber, sorting).then(
        (data) =>
          (elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${data.articles
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
        .join('')}</ul>
      `)
      )

      elements.searchbarBtnSortTop.classList.remove(
        'searchbar__btn--sort--active'
      )
      elements.searchbarBtnSortNew.classList.remove(
        'searchbar__btn--sort--active'
      )
      elements.searchbarBtnSortRel.classList.add('searchbar__btn--sort--active')
    })

    setTimeout(() => {
      elements.searchbarContent.style = 'display: block;'
      elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${articleHTML}</ul>
      `
    }, 200)

    if (Math.ceil(data.totalResults / 5) >= pageNumber) {
      elements.searchbarBtnPagination.innerHTML = 'Load More...'
      elements.searchbarBtnPagination.addEventListener('click', () => {
        loadMore(url, pageNumber++, sorting)
      })
    } else {
      elements.searchbarBtnPagination.removeEventListener('click', () =>
        loadMore(url, pageNumber++, sorting)
      )
      elements.searchbarBtnPagination.innerHTML = 'End Of Results'
    }
  }
}

export default getNews
