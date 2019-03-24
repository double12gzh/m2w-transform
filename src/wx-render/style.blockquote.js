import { getLog } from '../util'
import style from './style'

const log = getLog('blockquote')

export default function (text) {
  log(text)
  return `<blockquote ${style('blockquote')}> ${text} </blockquote>`
}
