import { elements } from './utils/utils'
import debounce from './utils/debounce'
import getNews from './utils/getNews'

elements.searchbarInput.addEventListener('input', (e) => {
  debounce(
    () => getNews('http://newsapi.org/v2/everything?q=' + e.target.value),
    400
  )

  if (e.target.value.length > 3) {
    elements.searchbarIcon.style = 'display: none;'
    elements.searchbarBtn.style = 'display: flex; right: -3rem'
    elements.searchbarBtn.addEventListener('click', () => {
      e.target.style = 'border-radius: 100rem'
      elements.searchbarContent.style = 'display: none;'
      elements.searchbarIcon.style = 'display: flex;'
      elements.searchbarBtn.style = 'display: none;'
      e.target.value = ''
    })
  } else if (e.target.value.length <= 3) {
    elements.searchbarIcon.style = 'display: flex;'
    elements.searchbarBtn.style = 'display: none;'
    elements.searchbarContent.style = 'display: none;'
    e.target.style = 'border-radius: 100rem'
    elements.searchbarBtn.removeEventListener(
      'click',
      () => (e.targer.value = '')
    )
  }
})
