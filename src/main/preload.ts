const { ipcRenderer, contextBridge } = require('electron')

const sendChannels = ['toMain']
const onChannels = ['fromMain']

contextBridge.exposeInMainWorld('ipcRenderer', {
  send(channel: string, ...args: any) {
    // if (sendChannels.includes(channel)) {
    //   ipcRenderer.send(channel, ...args)
    // }
    ipcRenderer.send(channel, ...args)
  },
  on(channel: string, listener: Function) {
    ipcRenderer.on(channel, (event, ...args) => listener(...args))
  },
  invoke(channel: string, ...args: any) {
    return ipcRenderer.invoke(channel, ...args)
  }
})
