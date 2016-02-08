import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import * as Auth from '../../redux/modules/auth';

const mapStateToProps = (state) => ({
  auth: state.auth.toJS()
});

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  loginAndRedirect = (e) => {
    e.preventDefault();

    const auth = this.refs.auth.value.trim();
    if (!auth) {
      return;
    }

    this.dispatch(Auth.actions.login(auth)).then((res) => {
      if (this.props.auth.isLoggedIn) {
        this.dispatch(routeActions.push(`/products/0`));
      }
    }, (err) => {
      console.log('error', err);
    });

    this.refs.auth.value = '';
  };

  componentWillMount() {
    if (this.props.auth.isLoggedIn) {
      this.dispatch(routeActions.push(`/products/0`));
    }
  }

  render() {
    require('./Login.scss');

    return (
      <div className="login-container">
        <h1>Login</h1>

        <form onSubmit={this.loginAndRedirect}>
          <input type="text" placeholder="Password" ref="auth" />

          { this.props.auth.loginError &&
            <span className="error">Error logging in</span>
          }
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
