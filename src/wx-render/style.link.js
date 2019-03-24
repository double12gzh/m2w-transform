import { getLog } from '../util'
import style from './style'
import state from './state'

const log = getLog('link')

export default function (href, title, text) {
  log(href, title, text)
  if (href !== text) {
    let index = state.links.push({
      href, text
    })
    return `<span ${style('a')}>${text}<sup>[${index}]</sup></span>`
  }
  return `<span ${style('a')}>${text}</span>`
}
