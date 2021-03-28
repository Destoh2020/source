import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

let browserWindow: BrowserWindow;
function createWindow() {
  browserWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    backgroundColor: 'white',
    frame: false,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  const template: MenuItemConstructorOptions[] = [
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const indexUrl = 'http://localhost:3000';
  browserWindow.loadURL(indexUrl);
  //   browserWindow.webContents.openDevTools();
}

app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

require('@electron/remote/main').initialize();
