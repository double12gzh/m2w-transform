import marked from 'marked'
import style from './style'

import image from './style.image'
import table from './style.table'
import tablecell from './style.tablecell'
import link from './style.link'
import heading from './style.heading'
import blockquote from './style.blockquote'
import strong from './style.strong'
import listitem from './style.listitem'
import list from './style.list'

import state from './state'

function getRenderer () {
  state.links = []
  state.toc = []

  const renderer = new marked.Renderer()
  renderer.image = image
  renderer.table = table
  renderer.tablecell = tablecell
  renderer.link = link
  renderer.heading = heading
  renderer.blockquote = blockquote
  renderer.strong = strong
  renderer.listitem = listitem
  renderer.list = list

  return renderer
}

function getFootLinks (enable = true) {
  if (enable === false) {
    return ''
  }
  if (state.links.length === 0) {
    return ''
  }
  let re = `<h3 ${style('heading')}>外部链接</h3>`
  state.links.forEach((item, index) => {
    re += `<p class="text-muted">[${index + 1}] <strong>${item.text}</strong> <em>${item.href}</em></p>`
  })
  return re
}

function getToc (enable = false) {
  if (enable === false) {
    return ''
  }
  if (state.toc.length === 0) {
    return ''
  }
  let re = `<h4 ${style('heading')}>文章目录</h4>`
  state.toc.forEach((item, index) => {
    re += `<p style="text-indent: ${item.level}em;margin:0px">- ${item.text}</p>`
  })
  return re + '<hr >'
}

export default {
  getRenderer,
  getFootLinks,
  getToc
}
