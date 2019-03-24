import { getLog } from '../util'
import style from './style'

const log = getLog('strong')

export default function (text) {
  log(text)
  return `<strong ${style('strong')}> ${text} </strong>`
}
