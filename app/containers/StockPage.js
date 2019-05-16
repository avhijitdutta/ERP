// @flow
import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import routes from '../constants/routes';
import  Header from '../components/common/Header';
import Table from '../components/common/Table';
import FloatButton from '../components/common/FloatButton';


type Props = {
  changePage: Function
};

class StockPage extends Component<Props> {
  props: Props;

  pageNavigate = () =>{
    const {changePage} = this.props;
    changePage();
  }

  render() {
    return <div>
        <Header/>
        <Table/>
        <FloatButton/>
      </div>
  }
}

const mapStateToProps = ({ counter }) => ({
  count: counter.counter
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push(routes.STOCKLIST)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage)
