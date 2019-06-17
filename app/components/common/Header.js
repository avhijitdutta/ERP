// @flow
import React, { Component } from 'react';

type Props = {
  navigate: () => void,
  select: string
};

export default class Header extends Component<Props> {
  props: Props;

  navigate = (item, value) =>{
    const {navigate} = this.props;
    navigate(value);
  }

  render() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" >Inventory</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">&nbsp;</span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className={"nav-item " + (this.props.select === '1' ? 'active' : '')} onClick={(e) => {this.navigate(e, 1)}}>
              <a className="nav-link">Stock List </a>
            </li>
            <li className={"nav-item " + (this.props.select === '2' ? 'active' : '')}  onClick={(e) => {this.navigate(e, 2)}}>
              <a className="nav-link">Product List </a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search Product" aria-label="Search Product"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
    );
  }
}
