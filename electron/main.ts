const electron = require('electron');
const { app, BrowserWindow, ipcMain, dialog } = electron;
const path = require('path');
const url = require('url');
const {isWin, isMac} = require('./app/utils/shared');
const store = require('./app/utils/store');
const G = global;
// console.log(store);
const services = {
    store
}
G['services'] = services;
G['APP_PATH'] = app.getAppPath();

function createWindow() {

    let win = new BrowserWindow({
        width: isWin ? 890 : 870,
        height: isWin ? 630 : 600,
        resizable: true,
        center: true,
    });

    win.loadURL('http://0.0.0.0:7001/');
    // win.loadFile(path.join(__dirname, '../index.html'));
/*    win.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));*/
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
