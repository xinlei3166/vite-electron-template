export {}

declare global {
  // eslint-disable-next-line no-var
  var win: any
  interface Window {
    ipcRenderer: any
  }
}
