(function (Vue, marked, hljs, debug) {
  'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
  marked = marked && marked.hasOwnProperty('default') ? marked['default'] : marked;
  hljs = hljs && hljs.hasOwnProperty('default') ? hljs['default'] : hljs;
  debug = debug && debug.hasOwnProperty('default') ? debug['default'] : debug;

  var style = {
    image: {
      width: '100%'
    },
    a: {
      color: '#576b95'
    },
    heading: {
      'text-align': 'center'
    },
    blockquote: {
      background: '#eee',
      'border-left': '3px solid #5cb85c'
    },
    strong: {
      color: 'red'
    },
    listitem: {
      'font-size': '16px'
    }
  };

  function styleItem (token) {
    let styles = [];
    Object.keys(style[token]).forEach((key) => {
      styles.push(`${key}: ${style[token][key]}`);
    });
    let re = styles.join(';');
    return re ? ` style="${re}" ` : ''
  }

  function style$1 (token) {
    return style[token] ? styleItem(token) : ''
  }

  const appName = 'wx-format';

  localStorage.DEBUG = `${appName}:*`;

  function getLog (logType) {
    return debug(`${appName}:${logType}`)
  }

  const log = getLog('image');

  function image (href, title, text) {
    log(href, title, text);
    return `<img src="${href}" title="${title}" alt="${text}" ${style$1('image')}/>`
  }

  // import style from './style'

  const log$1 = getLog('table');

  function table (header, body) {
    log$1(header, body);
    return `<table class="table table-striped table-bordered table-condensed"><thead>${header}</thead><tbody>${body}</tbody></table>`
  }

  // import style from './style'

  const log$2 = getLog('table');

  function tablecell (text, flag) {
    log$2(text, flag);
    return `<td>${text}</td>`
  }

  var state = {
    links: [],
    toc: []
  };

  const log$3 = getLog('link');

  function link (href, title, text) {
    log$3(href, title, text);
    if (href !== text) {
      let index = state.links.push({
        href, text
      });
      return `<span ${style$1('a')}>${text}<sup>[${index}]</sup></span>`
    }
    return `<span ${style$1('a')}>${text}</span>`
  }

  const log$4 = getLog('heading');

  function heading (text, level) {
    log$4(text, level);
    state.toc.push({
      text, level
    });
    return level < 3 ? `<h2 ${style$1('heading')}>${text}</h2>` : `<h3 ${style$1('heading')}>${text}</h3>`
  }

  const log$5 = getLog('blockquote');

  function blockquote (text) {
    log$5(text);
    return `<blockquote ${style$1('blockquote')}> ${text} </blockquote>`
  }

  const log$6 = getLog('strong');

  function strong (text) {
    log$6(text);
    return `<strong ${style$1('strong')}> ${text} </strong>`
  }

  const log$7 = getLog('listitem');

  function listitem (text, task, checked) {
    log$7(text, task, checked);
    // return `<li ${style('listitem')}> ${text} </li>`
    return `${text}$$`
  }

  const log$8 = getLog('list');

  function list (body, ordered, start) {
    log$8(body, ordered, start);
    let li = body.split('$$').filter((item) => {
      return !!item
    });
    if (ordered) {
      li = li.map((item, index) => {
        return `<span style="font-size: 16px">${index + 1}. ${item}</span><br>`
      });
    } else {
      li = li.map((item, index) => {
        return `<span style="font-size: 16px">• ${item}</span><br>`
      });
    }
    return li.join('')
  }

  function getRenderer () {
    state.links = [];
    state.toc = [];

    const renderer = new marked.Renderer();
    renderer.image = image;
    renderer.table = table;
    renderer.tablecell = tablecell;
    renderer.link = link;
    renderer.heading = heading;
    renderer.blockquote = blockquote;
    renderer.strong = strong;
    renderer.listitem = listitem;
    renderer.list = list;

    return renderer
  }

  function getFootLinks (enable = true) {
    if (enable === false) {
      return ''
    }
    if (state.links.length === 0) {
      return ''
    }
    let re = `<h3 ${style$1('heading')}>外部链接</h3>`;
    state.links.forEach((item, index) => {
      re += `<p class="text-muted">[${index + 1}] <strong>${item.text}</strong> <em>${item.href}</em></p>`;
    });
    return re
  }

  function getToc (enable = false) {
    if (enable === false) {
      return ''
    }
    if (state.toc.length === 0) {
      return ''
    }
    let re = `<h4 ${style$1('heading')}>文章目录</h4>`;
    state.toc.forEach((item, index) => {
      re += `<p style="text-indent: ${item.level}em;margin:0px">- ${item.text}</p>`;
    });
    return re + '<hr >'
  }

  var wxRender = {
    getRenderer,
    getFootLinks,
    getToc
  };

  function copyHtml (id) {
    var clipboardDiv = document.getElementById(id);
    clipboardDiv.focus();
    window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.setStartBefore(clipboardDiv.firstChild);
    range.setEndAfter(clipboardDiv.lastChild);
    window.getSelection().addRange(range);

    if (document.execCommand('copy')) {
      window.alert('已复制到剪贴板');
    } else {
      window.alert('未能复制到剪贴板，请全选后右键复制');
    }
  }

  var defaultMd = `
![](https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/login/loginpage/images/bg_banner4273fb.png)
\`\`\`js
var a = 1
function sayHello () {
  return 'hello'
}
\`\`\`
`;

  var codeStyles = [
    'default',
    'a11y-dark',
    'a11y-light',
    'agate',
    'an-old-hope',
    'androidstudio',
    'arduino-light',
    'arta',
    'ascetic',
    'atelier-cave-dark',
    'atelier-cave-light',
    'atelier-dune-dark',
    'atelier-dune-light',
    'atelier-estuary-dark',
    'atelier-estuary-light',
    'atelier-forest-dark',
    'atelier-forest-light',
    'atelier-heath-dark',
    'atelier-heath-light',
    'atelier-lakeside-dark',
    'atelier-lakeside-light',
    'atelier-plateau-dark',
    'atelier-plateau-light',
    'atelier-savanna-dark',
    'atelier-savanna-light',
    'atelier-seaside-dark',
    'atelier-seaside-light',
    'atelier-sulphurpool-dark',
    'atelier-sulphurpool-light',
    'atom-one-dark-reasonable',
    'atom-one-dark',
    'atom-one-light',
    'brown-paper',
    'codepen-embed',
    'color-brewer',
    'darcula',
    'dark',
    'darkula',
    'docco',
    'dracula',
    'far',
    'foundation',
    'github-gist',
    'github',
    'gml',
    'googlecode',
    'grayscale',
    'gruvbox-dark',
    'gruvbox-light',
    'hopscotch',
    'hybrid',
    'idea',
    'ir-black',
    'isbl-editor-dark',
    'isbl-editor-light',
    'kimbie.dark',
    'kimbie.light',
    'lightfair',
    'magula',
    'mono-blue',
    'monokai-sublime',
    'monokai',
    'nord',
    'obsidian',
    'ocean',
    'paraiso-dark',
    'paraiso-light',
    'pojoaque',
    'purebasic',
    'qtcreator_dark',
    'qtcreator_light',
    'railscasts',
    'rainbow',
    'routeros',
    'school-book',
    'shades-of-purple',
    'solarized-dark',
    'solarized-light',
    'sunburst',
    'tomorrow-night-blue',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'tomorrow-night',
    'tomorrow',
    'vs',
    'vs2015',
    'xcode',
    'xt256',
    'zenburn'
  ];

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
        window.localStorage && window.localStorage.setItem('rawSource', this.rawSource);
      },
      getLocal: function () {
        
      },
      changeCodeStyle: function (params) {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
      nextTickChange: function () {
        this.setLocal();
        this.$nextTick(function () {
          this.changeCodeStyle();
        });
      },
      copyHtml: function () {
        copyHtml(this.contentId);
      },
      generateHtml: function () {
        let main = marked(this.rawSource, {
          renderer: wxRender.getRenderer()
        });
        this.outPutHtml = wxRender.getToc(this.enableToc) + main + wxRender.getFootLinks(this.enableExternal);
      }
    },
    mounted: function (params) {
      this.nextTickChange();
      this.generateHtml();
    },
    watch: {
      outPutHtml: function () {
        this.nextTickChange();
      }
    },
    computed: {
      codeStyleHref: function () {
        return `https://cdn.jsdelivr.net/npm/highlight.js@9.15.6/styles/${this.selectedCodeStyle}.css`
      }
    },
    created: function (params) {}
  });

}(Vue, marked, hljs, debug));
