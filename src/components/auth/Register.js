import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentWillMount() {
    const { allowRegistration } = this.props.settings;

    if (!allowRegistration) {
      this.props.history.push('/');
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser('That User Already Exists', 'error'));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-dark">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                <label htmlFor="password">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>

              
              <div className="form-group">
              <label htmlFor="password">Date of Arrest</label>
              <input
                type="date"
                className="form-control"
                name="date"
                required
                value={this.state.date}
                onChange={this.onChange}
              />

              
            </div>

            <div class="form-group">
            <label for="exampleFormControlSelect1">Select Crime</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Theft</option>
              <option>Assault</option>
              <option>Homicide</option>
              <option>Forgery</option>
              <option>Others</option>
            </select>
          </div>

          <div class="form-group">
          <label for="exampleFormControlTextarea1">Details:</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>



                <input
                  type="submit"
                  value="Register"
                  className="btn btn-dark btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Login);
