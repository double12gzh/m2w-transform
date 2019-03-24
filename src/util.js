import debug from 'debug'
const appName = 'wx-format'

localStorage.DEBUG = `${appName}:*`

export function getLog (logType) {
  return debug(`${appName}:${logType}`)
}
