import { app, ipcMain } from 'electron';

import { open, save } from "./actions/main.actions";
import {
  FETCH_DATA,
  DOC_DATA
} from "./app/store/constants";

/**
  * Create menu template
  */
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: process.platform === 'darwin' ? 'Command+S': 'Ctrl+S',
        // enabled: false,
        click(menuItem, currentWindow) {
          save( currentWindow.webContents );
        }
      },
      {
        label: 'Open',
        accelerator: process.platform === 'darwin' ? 'Command+O': 'Ctrl+O',
        click(menuItem, currentWindow) {
          open( currentWindow.webContents );
        }
      },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Command+Q': 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

/**
  * Add dev tools when in production
  */
if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer',
    submenu: [
      {
        label: 'Toggle Devtools',
        accelerator: process.platform === 'darwin' ? 'Command+I': 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}


module.exports = mainMenuTemplate;
