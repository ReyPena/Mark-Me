import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from "electron";
import { readFile, writeFile } from 'fs';

import {
  MAIN_SAVE_FILE,
  MAIN_OPEN_FILE,
  SAVE_FILE,
  OPEN_FILE
} from '../store/constants';
import {
  changeTheme,
  textChanged,
  setFilePath
} from '../store/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.onOpenFile = this.onOpenFile.bind(this);
    this.onSave = this.onSave.bind(this);
  };

  componentDidMount() {
    ipcRenderer.on(SAVE_FILE, (event, args) => {
      writeFile(args, this.props.mdText, (err) => {
        if(err){
          console.error(err);
        } else {
          this.props.setFilePath(args);
        }
      });
    });

    ipcRenderer.on(OPEN_FILE, (event, args) => {
      readFile(args, 'utf-8', (err, data) => {
        if(err) {
          console.error(err);
        } else {
          this.props.setFilePath(args);
          this.props.textChanged(data);
        }
      });
    });
  };

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(SAVE_FILE);
    ipcRenderer.removeAllListeners(OPEN_FILE);
  };

  onChangeTheme() {
    this.props.changeTheme();
  };

  onOpenFile() {
    ipcRenderer.send(MAIN_OPEN_FILE, '');
  };

  onSave() {
    ipcRenderer.send(MAIN_SAVE_FILE, '');
  };

  render() {
    return (
      <header className="app-header">
        <h1>{this.props.name}</h1>

        <ul className="app-menu">
          <li>
            <a onClick={this.onChangeTheme}>
              <i className="material-icons">brush</i>
            </a>
          </li>
          <li>
            <a onClick={this.onOpenFile}>
              <i className="material-icons">folder_open</i>
            </a>
          </li>
          <li>
            <a onClick={this.onSave}>
              <i className="material-icons">save</i>
            </a>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (props) => {
  const { name } = props.file;
  const { mdText } = props.editor;

  return {
    name,
    mdText
  };
};

export default connect(mapStateToProps, {
  changeTheme,
  textChanged,
  setFilePath
})(Header);
