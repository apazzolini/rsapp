import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

const meta = {
  title: 'Favorites Browser'
};

const mapStateToProps = (state) => ({
  loading: state.apiLoading.get('loading')
});

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    loading: PropTypes.bool
  };

  render() {
    require('./App.pcss');

    return (
      <div>
        <DocumentMeta {...meta} />

        <div id="MainContainer">
          { this.props.loading &&
            <span className="loading">Loading</span>
          }

          <div id="ComponentContainer">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
