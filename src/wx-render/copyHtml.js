export default function (id) {
  var clipboardDiv = document.getElementById(id)
  clipboardDiv.focus()
  window.getSelection().removeAllRanges()
  var range = document.createRange()
  range.setStartBefore(clipboardDiv.firstChild)
  range.setEndAfter(clipboardDiv.lastChild)
  window.getSelection().addRange(range)

  if (document.execCommand('copy')) {
    window.alert('已复制到剪贴板')
  } else {
    window.alert('未能复制到剪贴板，请全选后右键复制')
  }
}
