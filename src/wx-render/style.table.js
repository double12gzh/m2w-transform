import { getLog } from '../util'
// import style from './style'

const log = getLog('table')

export default function (header, body) {
  log(header, body)
  return `<table class="table table-striped table-bordered table-condensed"><thead>${header}</thead><tbody>${body}</tbody></table>`
}
