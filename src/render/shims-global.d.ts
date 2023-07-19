import type { BrowserWindow } from 'electron'

export {}

declare global {
  // eslint-disable-next-line no-var
  var win: BrowserWindow
  interface Window {
    ipcRenderer: any
  }
}
