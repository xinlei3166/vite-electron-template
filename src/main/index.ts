import { app, BrowserWindow, screen, protocol } from 'electron'
import { join } from 'path'
import { initEvent, initHandler } from './event'
// import { initialize } from '@electron/remote/main'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      win: Electron.BrowserWindow
    }
  }
}

let win
function createWindow() {
  global.win = win = new BrowserWindow({
    // width: 1200,
    // height: screen.getPrimaryDisplay().workAreaSize.height,
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: join(__dirname, '../../dist/main/preload.js'),
      webSecurity: false
    }
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000/')
    win.webContents.openDevTools()
  } else {
    win.loadFile('dist/render/index.html')
  }

  // 初始化进程之间事件监听
  initEvent()
  initHandler()
}

app.whenReady().then(() => {
  createWindow()
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''))
    callback(pathname)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
