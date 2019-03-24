import { getLog } from '../util'
import style from './style'

const log = getLog('image')

export default function (href, title, text) {
  log(href, title, text)
  return `<img src="${href}" title="${title}" alt="${text}" ${style('image')}/>`
}
