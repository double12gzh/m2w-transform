import { getLog } from '../util'
import style from './style'
import state from './state'

const log = getLog('heading')

export default function (text, level) {
  log(text, level)
  state.toc.push({
    text, level
  })
  return level < 3 ? `<h2 ${style('heading')}>${text}</h2>` : `<h3 ${style('heading')}>${text}</h3>`
}
