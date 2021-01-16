/*
    ## github.com/cleopatradev
*/

const {app, BrowserWindow, ipcMain, dialog, ipcRenderer} = require("electron");
const path = require('path');

var opener = require('opener');
var packager = require('electron-packager');

var serverIp = '';
var options = {
    'arch': 'ia32',
    'platform': 'win32',
    'dir': './',
    'app-copyright': 'AppName',
    'app-version': '1.0.0',
    'icon': 'app/cdn/favicon.ico',
    'name': 'AppName Client',
    'ignore': ['./releases', './.git'],
    'out': './releases',
    'overwrite': true,
    'prune': true,
    'version': '1.0.0',
    'version-string':{
      'CompanyName': 'network.cleopatradev',
      'FileDescription': 'Client for gamers',
      'OriginalFilename': 'AppName Client',
      'ProductName': 'AppName Client',
      'InternalName': 'AppName Client'
    }
};
packager(options, () => {});

const playGame = async (event) => {
    
    try {
        var game = opener("mtasa://" + serverIp);
        game.unref();
        game.stdin.unref();
        game.stdout.unref();
        game.stderr.unref();
    
        app.exit();
    } catch(e) {
        // couldn't start app
    }

    event.returnValue = true;
}
ipcMain.on('playGame', playGame);


const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 850,
        height: 450,
        frame: false,
        resizable: false,
        center: true,
        show: false,
        transparent: true,
        title: 'AppName Client',
        icon: __dirname + '/app/cdn/favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.show();
    });

    //mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});