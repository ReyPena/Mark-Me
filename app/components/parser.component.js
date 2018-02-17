import React, {Component} from 'react';
import {connect} from 'react-redux';
import marked from 'marked';

class Parser extends Component {
  constructor(props) {
    super(props);

    this.renderHtml = this.renderHtml.bind(this);
  }

  renderHtml() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });

    return marked(this.props.mdText);
  }

  render() {
    return (
      <div className="app-preview" dangerouslySetInnerHTML={{__html: this.renderHtml()}} />
    );
  }
}

const mapStateToProps = ({editor}) => {
  const {mdText} = editor;

  return {
    mdText,
  };
};

export default connect(mapStateToProps, null)(Parser);
