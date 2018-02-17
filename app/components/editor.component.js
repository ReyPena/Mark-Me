import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  textChanged,
} from '../store/actions';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(md) {
    this.props.textChanged(md);
  }

  render() {
    return (
      <textarea
        className="app-editor"
        onChange={(e) => this.onTextChange(e.target.value)}
        value={this.props.mdText}
        >
      </textarea>
    );
  }
}

const mapStateToProps = ({editor}) => {
  const {mdText} = editor;

  return {
    mdText,
  };
};

export default connect(mapStateToProps, {
  textChanged,
})(Editor);
