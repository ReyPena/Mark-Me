import { app, BrowserWindow, Menu, ipcMain } from  'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';
import url from 'url';

import mainMenuTemplate from './menu.js';
import { MAIN_OPEN_FILE, MAIN_SAVE_FILE } from './app/store/constants';
import { open, save } from "./actions/main.actions";

let mainWindow;

/**
  * On app ready create the app
  */
app.on('ready', () => {
  // Create new window
  mainWindow = new BrowserWindow({});

  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // Garbage collection
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Install Dev tools
  if(process.env.NODE_ENV !== 'production') {
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
      installExtension(extension)
        .then((name) => console.info(`Added Extension: ${name}`))
        .catch((err) => console.info('An error occurred: ', err));
    });
  }
});

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// Actions
ipcMain.on(MAIN_OPEN_FILE, (event) => {
  open(event.sender);
});

ipcMain.on(MAIN_SAVE_FILE, (event) => {
  save(event.sender);
});