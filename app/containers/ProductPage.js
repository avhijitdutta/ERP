// @flow
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import product from '../constants/product';

import routes from '../constants/routes';
import Header from '../components/common/Header';
import Table from '../components/common/Table';
import FloatButton from '../components/common/floatButton/FloatButton';

type Props = {
  navigateStockList: () => void,
  className: string,
  navigateProductList: () => void
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const isFormInvalid = ({ formErrors }) => {
  let output = false;

  // validate form errors being empty
  for(var key in formErrors){
    const temp = formErrors[key].length;
    if( temp > 0 ){
      output = true;
    }
  }
  // validate the form was filled out
  return output;
};

class ProductPage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.initState();
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    this.getProducts();
  }

  initState = () =>{
    this.state = {
      modal: false,
      isLoaded: false,
      productCode: null,
      productDescription: null,
      productCategory: null,
      productSize: null,
      productColor: null,
      productUOM: null,
      openingBalance: null,
      formInvalid: true,
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
          productCode: 'AJ101',
          productDescription: 'AJANTA CHAPPAL',
          productCategory: 'CHAPPAL',
          productSize: '4x7',
          productColor: 'Blue',
          productUOM: 'BOX',
          currentStock: 10
        }
      ]
    };
  }

  getProducts = () =>{
    axios.get('http://localhost:1337/products')
    .then(res => {
      const products = {productList: res.data};
      const updatedState = Object.assign(this.state, products);
      console.log(products);
      this.setState(updatedState);
      return products;
    }).catch( error =>{
      console.log(error);
    });
  }

  toggle = () => {
    console.log('toggle');
    this.initState();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  pageNavigate = (value) =>{
    const {navigateStockList, navigateProductList} = this.props;

    if(value ===1){
      navigateStockList();
    }else{
      navigateProductList();
    }
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const { formInvalid } =  this.state;
    if (!formInvalid) {
      const { productCategory, productCode , productDescription , productSize } = this.state;
      console.log(`
        --SUBMITTING--
        Product Code: ${productCode}
        Product Desc: ${productDescription}
        Category : ${productCategory}
        Product Size: ${productSize}
      `);


      axios.post("http://localhost:1337/products", this.state)
        .then(res => {
          this.getProducts();
          this.toggle();
          return res.data
        }).catch( error => {
          console.log(error);
        })

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const state =  this.state ;
    const { formErrors } = state;
    switch (name) {
      case "productCode":
      formErrors.productCode =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "productDescription":
      formErrors.productDescription =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
        case "productSize":
      formErrors.productSize =
          value.length < 1 ? "Product Color is required." : "";
        break;
        case "productColor":
      formErrors.productColor =
          value.length < 1 ? "Product Color is required." : "";
        break;
      default:
        break;
    }
    const invalidForm = isFormInvalid(state);
    this.setState({ formErrors , [name]: value , 'formInvalid' : invalidForm }, () =>{

    });
  };

  render() {
    const {
      className
    } = this.props;

    const { modal } = this.state;
    const { formErrors, productList, formInvalid } = this.state;
    return <div>
        <Header select="2" navigate={this.pageNavigate}/>
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
                    className={formErrors.productCategory.length > 0 ? "is-invalid" : null}
                    name="productCategory"
                    id="productCategory"
                    noValidate
                    onChange={this.handleChange}>
                      {product.categories.map(item => (
                          <option value={item.value}>{item.name}</option>
                      ))}
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
                    className={formErrors.productSize.length > 0 ? "is-invalid" : null}
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
                    className={formErrors.productColor.length > 0 ? "is-invalid" : null}
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
                    className={formErrors.productUOM.length > 0 ? "is-invalid" : null}
                    name="productUOM"
                    id="productUOM"
                    noValidate
                    onChange={this.handleChange}>
                      {product.categories.map(item => (
                          <option value={item.value}>{item.name}</option>
                      ))}
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
                    className={formErrors.openingBalance.length > 0 ? "is-invalid" : null}
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
              <Button color="primary" disabled={formInvalid}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <FloatButton click={this.toggle} />
      </div>
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  navigateStockList: () => push(routes.STOCKLIST),
  navigateProductList: () => push(routes.PRODUCTLIST)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(ProductPage)
