// @flow
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import routes from '../constants/routes';
import Header from '../components/common/Header';
import Table from '../components/common/Table';
import FloatButton from '../components/common/floatButton/FloatButton';

type Props = {
  changePage: () => void,
  className: string
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    if( val.length > 0 ){
      valid = false
    }
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    if(!val){
      valid = false;
    }
  });

  return valid;
};

class StockPage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);


    this.state = {
      modal: false,
      productCode: null,
      productDescription: null,
      productCategory: null,
      productSize: null,
      productColor: null,
      productUOM: null,
      openingBalance: null,
      invalidForm: true,
      formErrors: {
        productCode: '',
        productDescription: '',
        productCategory: '',
        productSize: '',
        productColor: '',
        productUOM: '',
        openingBalance: ''
      },
      productList:[
        {
          productCode: 'asdfg',
          productDescription: 'AJANTA CHAPPAL',
          productCategory: 'CHAPPAL',
          productSize: '4x7',
          productColor: 'Blue',
          productUOM: 'BOX',
          currentStock: 10
        }
      ]
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

  handleSubmit = (e) =>{
    e.preventDefault();
    if (formValid(this.state)) {
      const { productCategory, productCode , productDescription , productSize } = this.state;
      console.log(`
        --SUBMITTING--
        Product Code: ${productCode}
        Product Desc: ${productDescription}
        Category : ${productCategory}
        Product Size: ${productSize}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const state = { ...this.state };
    const { formErrors } = state;
    const error = { ...formErrors };
    switch (name) {
      case "productCode":
        error.productCode =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "productDescription":
        error.productDescription =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }
    const invalidForm = formValid(state);
    this.setState({ formErrors : error, [name]: value , 'invalidForm' : invalidForm }, () => console.log(this.state));
  };

  render() {
    const {
      className
    } = this.props;

    const { modal } = this.state;
    const { formErrors, invalidForm , productList} = this.state;
    return <div>
        <Header select="1" navigate={this.pageNavigate} />
        <Table productList={productList}/>
        <Modal isOpen={modal} toggle={this.toggle} className={className} size="lg">
          <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
          <Form  onSubmit={this.handleSubmit} noValidate>
            <ModalBody>
                <FormGroup row>
                  <Label for="productCode" sm={2}>Code</Label>
                  <Col sm={10}>
                    <Input type="text"
                    className={formErrors.productCode.length > 0 ? "is-invalid" : null}
                    name="productCode"
                    id="productCode"
                    placeholder="Enter Product Code"
                    noValidate
                    onChange={this.handleChange}/>
                    {formErrors.productCode.length > 0 && (
                      <div className="invalid-feedback">{formErrors.productCode}</div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="productDescription" sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input
                    type="textarea"
                    className={formErrors.productDescription.length > 0 ? "is-invalid" : null}
                    name="productDescription"
                    id="productDescription"
                    noValidate
                    onChange={this.handleChange}/>
                    {formErrors.productDescription.length > 0 && (
                      <span className="invalid-feedback">{formErrors.productDescription}</span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="productCategory" sm={2}>Category</Label>
                  <Col sm={10}>
                    <Input type="select"
                    className={formErrors.productCategory.length > 0 ? "error" : null}
                    name="productCategory"
                    id="productCategory"
                    noValidate
                    onChange={this.handleChange}>
                      <option>Chapple</option>
                      <option>Shoe</option>
                      <option>PUE</option>
                    </Input>
                    {formErrors.productCategory.length > 0 && (
                      <span className="errorMessage">{formErrors.productCategory}</span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="productSize" sm={2}>Size</Label>
                  <Col sm={10}>
                    <Input type="text"
                    className={formErrors.productSize.length > 0 ? "error" : null}
                    name="productSize"
                    id="productSize"
                    placeholder="Enter Size"
                    noValidate
                    onChange={this.handleChange}/>
                    {formErrors.productSize.length > 0 && (
                      <span className="errorMessage">{formErrors.productSize}</span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="productColor" sm={2}>Color</Label>
                  <Col sm={10}>
                    <Input type="text"
                    className={formErrors.productColor.length > 0 ? "error" : null}
                    name="productColor"
                    id="productColor"
                    placeholder="Enter Color"
                    noValidate
                    onChange={this.handleChange}/>
                    {formErrors.productColor.length > 0 && (
                      <span className="errorMessage">{formErrors.productColor}</span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="productUOM" sm={2}>UOM</Label>
                  <Col sm={10}>
                    <Input type="select"
                    className={formErrors.productUOM.length > 0 ? "error" : null}
                    name="productUOM"
                    id="productUOM"
                    noValidate
                    onChange={this.handleChange}>
                      <option>Pair</option>
                      <option>Box</option>
                    </Input>
                    {formErrors.productUOM.length > 0 && (
                      <span className="errorMessage">{formErrors.productUOM}</span>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="openingBalance" sm={2}>Opening Balance</Label>
                  <Col sm={10}>
                    <Input type="text"
                    className={formErrors.openingBalance.length > 0 ? "error" : null}
                    name="openingBalance"
                    id="openingBalance"
                    placeholder="Opening Balance"
                    noValidate
                    onChange={this.handleChange}/>
                    {formErrors.openingBalance.length > 0 && (
                      <span className="errorMessage">{formErrors.openingBalance}</span>
                    )}
                  </Col>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={invalidForm} >Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <FloatButton click={this.toggle} />
      </div>
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
)(StockPage)
