import { ipcMain, shell, dialog } from 'electron'

const win = global && (global as any).win

export function initEvent() {
  ipcMain.on('alert', (event, params) => {
    const options = typeof params === 'object' ? params : { type: 'info', message: params }
    dialog.showMessageBox(options)
  })
}

export function initHandler() {
  ipcMain.handle('showMessageBox', (event, params) => {
    const options = typeof params === 'object' ? params : { type: 'info', message: params }
    dialog.showMessageBox(options)
  })

  ipcMain.handle('showItemInFolder', (event, params) => {
    shell.showItemInFolder(params)
  })
}
