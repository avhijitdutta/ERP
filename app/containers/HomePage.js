// @flow
import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import routes from '../constants/routes';
import Home from '../components/Home';


type Props = {
  changePage: () => void
};

class HomePage extends Component<Props> {
  props: Props;

  pageNavigate = () =>{
    const {changePage} = this.props;
    changePage();
  }

  render() {
    return <Home navigate={this.pageNavigate}/>;
  }
}

const mapStateToProps = ({ counter }) => ({
  count: counter.counter
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push(routes.PRODUCTLIST)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
