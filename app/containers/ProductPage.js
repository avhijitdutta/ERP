// @flow
import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import routes from '../constants/routes';
import Header from '../components/common/Header';
import Table from '../components/common/Table';
import FloatButton from '../components/common/floatButton/FloatButton';

type Props = {
  changePage: () => void,
  className: string
};

class ProductPage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    console.log('toggle');
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  pageNavigate = () =>{
    const {changePage} = this.props;
    changePage();
  }

  render() {
    const { modal } = this.state;
    const {
      className
    } = this.props;
    return <div>
        <Header/>
        <Table/>
        <Modal isOpen={modal} toggle={this.toggle} className={className} size="lg">
          <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
          <ModalBody>
            <Form  onSubmit={(e) => e.preventDefault()}>
              <FormGroup row>
                <Label for="productCode" sm={2}>Code</Label>
                <Col sm={10}>
                  <Input type="text" name="productCode" id="productCode" placeholder="Enter Product Code" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="productDescription" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input type="textarea" name="text" id="productDescription" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="productCategory" sm={2}>Category</Label>
                <Col sm={10}>
                  <Input type="select" name="productCategory" id="productCategory">
                    <option>Chapple</option>
                    <option>Shoe</option>
                    <option>PUE</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="productSize" sm={2}>Size</Label>
                <Col sm={10}>
                  <Input type="text" name="productSize" id="productSize" placeholder="Enter Size" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="productColor" sm={2}>Color</Label>
                <Col sm={10}>
                <Input type="text" name="productColor" id="productColor" placeholder="Enter Color" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="productUOM" sm={2}>UOM</Label>
                <Col sm={10}>
                  <Input type="select" name="productUOM" id="productUOM">
                    <option>Pair</option>
                    <option>Box</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="productCode" sm={2}>Opening Balance</Label>
                <Col sm={10}>
                  <Input type="text" name="productCode" id="productCode" placeholder="Opening Balance" />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <FloatButton click={this.toggle} />
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
)(ProductPage)
