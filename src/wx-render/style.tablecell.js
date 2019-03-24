import { getLog } from '../util'
// import style from './style'

const log = getLog('table')

export default function (text, flag) {
  log(text, flag)
  return `<td>${text}</td>`
}
