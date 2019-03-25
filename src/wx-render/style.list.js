import { getLog } from '../util'
import style from './style'

const log = getLog('list')

export default function (body, ordered, start) {
  log(body, ordered, start)
  let li = body.split('$$').filter((item) => {
    return !!item
  })
  if (ordered) {
    li = li.map((item, index) => {
      return `<span style="font-size: 16px">${index + 1}. ${item}</span><br>`
    })
  } else {
    li = li.map((item, index) => {
      return `<span style="font-size: 16px">• ${item}</span><br>`
    })
  }
  return li.join('')
}
