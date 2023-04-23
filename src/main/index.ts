import { app, BrowserWindow, screen, globalShortcut } from 'electron'
import path from 'path'
import { initEvent, initHandler } from './event'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      win: Electron.BrowserWindow
    }
  }
}

const isDev = process.env.NODE_ENV === 'development'
let win: any
function createWindow() {
  global.win = win = new BrowserWindow({
    // width: 1200,
    // height: screen.getPrimaryDisplay().workAreaSize.height,
    width: 1000,
    height: 800,
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
      // contextIsolation: false,
      // backgroundThrottling: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools()
  } else {
    win.loadFile('dist/render/index.html')
  }

  // 初始化进程之间事件监听
  initEvent()
  initHandler()

  // 禁用刷新和打开控制台
  globalShortcut.register('CommandOrControl+Alt+I', () => {
    if (isDev) {
      win.webContents.openDevTools()
    } else {
      return false
    }
  })
  globalShortcut.register('CommandOrControl+R', () => {
    return false
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
