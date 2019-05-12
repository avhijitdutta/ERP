// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {
  navigate: Function
};

export default class Home extends Component<Props>{
  props: Props;

  handleSubmit = () => {
    const { navigate } = this.props;
    navigate();
  }

  render() {
    return (
      <div className="container">
          <form className={styles.home} onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address
              </label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted"> We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
          </form>
      </div>
    );
  }
}
