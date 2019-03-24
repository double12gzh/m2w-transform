import style from './style.config'

function styleItem (token) {
  let styles = []
  Object.keys(style[token]).forEach((key) => {
    styles.push(`${key}: ${style[token][key]}`)
  })
  let re = styles.join(';')
  return re ? ` style="${re}" ` : ''
}

export default function (token) {
  return style[token] ? styleItem(token) : ''
}
