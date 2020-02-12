const { app, screen, BrowserWindow } = require('electron');
const path = require('path');

app.name = 'director-agent';
app.allowRendererProcessReuse = true;

function createWindow () {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  let win = new BrowserWindow({
    width: 384,
    height: 100,
    x: width - 416,
    y: 32,
    resizable: false,
    frame: false,
    closable: false,
    movable: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), 'preload.js'),
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);