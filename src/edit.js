import Vue from 'Vue'
import marked from 'marked'
import hljs from 'hljs'

import wxRender from './wx-render/index'
import copyHtml from './wx-render/copyHtml'
import defaultMd from './defaultMd'
import codeStyles from './wx-render/code-styles'

var app = new Vue({
  el: '#editor',
  data: {
    rawSource: window.localStorage.getItem('rawSource') || defaultMd,
    outPutHtml: '',
    codeStyles,
    selectedCodeStyle: 'monokai-sublime',
    contentId: 'outPutHtml',
    enableToc: true,
    enableExternal: true
  },
  methods: {
    setLocal: function () {
      window.localStorage && window.localStorage.setItem('rawSource', this.rawSource)
    },
    getLocal: function () {
      
    },
    changeCodeStyle: function (params) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    },
    nextTickChange: function () {
      this.setLocal()
      this.$nextTick(function () {
        this.changeCodeStyle()
      })
    },
    copyHtml: function () {
      copyHtml(this.contentId)
    },
    generateHtml: function () {
      let main = marked(this.rawSource, {
        renderer: wxRender.getRenderer()
      })
      this.outPutHtml = wxRender.getToc(this.enableToc) + main + wxRender.getFootLinks(this.enableExternal)
    }
  },
  mounted: function (params) {
    this.nextTickChange()
    this.generateHtml()
  },
  watch: {
    outPutHtml: function () {
      this.nextTickChange()
    }
  },
  computed: {
    codeStyleHref: function () {
      return `https://cdn.jsdelivr.net/npm/highlight.js@9.15.6/styles/${this.selectedCodeStyle}.css`
    }
  },
  created: function (params) {}
})
