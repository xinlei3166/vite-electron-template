const { ipcRenderer, contextBridge } = require('electron')

const sendChannels = ['toMain']
const onChannels = ['fromMain']

contextBridge.exposeInMainWorld('ipcRenderer', {
  send(channel, ...args) {
    // if (sendChannels.includes(channel)) {
    //   ipcRenderer.send(channel, ...args)
    // }
    ipcRenderer.send(channel, ...args)
  },
  on(channel, listener) {
    ipcRenderer.on(channel, (event, ...args) => listener(...args))
  },
  invoke(channel, ...args) {
    return ipcRenderer.invoke(channel, ...args)
  }
})
