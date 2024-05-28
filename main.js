const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const startServer = require("./server");
require('dotenv').config(); // Load environment variables from .env file
const Port = process.env.PORT || 3000; // Use the PORT from .env or default to 3000
let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 1200,
        autoHideMenuBar:true,
        icon: path.join(__dirname, 'assets/favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
        }
    })
    mainWindow.maximize();
    mainWindow.loadURL(`http://localhost:${Port}`)
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    const ses = mainWindow.webContents.session;

    ses.clearCache(() => {
    });
}
app.on('ready', ()=>{
    createWindow();
    startServer(Port)
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
        startServer(Port)
    }
});
