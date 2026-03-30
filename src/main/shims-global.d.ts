export {}

declare global {
  var win: any
  interface Window {
    ipcRenderer: any
  }
}
