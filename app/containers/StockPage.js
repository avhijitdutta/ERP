// @flow
import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import routes from '../constants/routes';
import Stock from '../components/Stock';
import Table from '../components/common/Table'

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
        <Stock/>
        <Table/>
      </div>;
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
