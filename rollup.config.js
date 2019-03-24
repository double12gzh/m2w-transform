// rollup.config.js
export default {
  input: 'src/edit.js',
  output: {
    file: 'dist/edit.js',
    format: 'iife',
    globals: {
      Vue: 'Vue',
      marked: 'marked',
      debug: 'debug',
      hljs: 'hljs'
    }
  },
  external: ['Vue', 'marked', 'debug', 'hljs']
}
