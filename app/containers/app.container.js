import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header.component';
import Editor from '../components/editor.component';
import Parser from '../components/parser.component';

class App extends Component {
  render() {
    return (
      <div className={this.props.theme}>
        <Header />
        <div className="app-container">
          <Editor />
          <Parser />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({editor}) => {
  const { theme } = editor;

  return {
    theme
  };
};


export default connect(mapStateToProps, null)(App);
