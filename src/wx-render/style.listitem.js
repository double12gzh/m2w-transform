import { getLog } from '../util'
import style from './style'

const log = getLog('listitem')

export default function (text, task, checked) {
  log(text, task, checked)
  // return `<li ${style('listitem')}> ${text} </li>`
  return `${text}$$`
}
