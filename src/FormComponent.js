import React, { Component } from 'react';
import { Form, Button, Message, Icon, List } from 'semantic-ui-react';
import { countries } from './utils/countries';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class FormComponent extends Component {
  state={
    invoiceDate: moment(),
    dueDate: moment()
  }

  handleDateChange = (field, date) => {
    console.log(field, date)
    this.setState({ [field], date })
  }

  componentWillMount = () => {
  }

  handleUploadClick = () => {
    this.refs.imgUpload.click()
  }

  handleFileInput = (e, value) => {
    const fileName = e.target.value.slice(12,-1)
    this.setState({file: fileName})
  }

  render() {
    return (
      <Form className='c-Form'>
        <h3 className='c-Form__header'>Enter Invoice</h3>
        {this.state.showError ?
        <Message
          className='c-Form__msg'
          error
          size='tiny'
          header='Please fill in required fileds with the correct data'
        />
        : null}
        <Form.Input
          label='Invoice Number'
          name='invoiceNumber'
          placeholder='Invoice Number'
          // value={this.props.invoiceNumber}
          // onChange={this.handleInputChange}
          // error={this.props.showError && !this.props.invoiceNumber}
        />
        <Form.Input
          label='Invoice Date'
        >
          <DatePicker
            selected={this.state.invoiceDate}
            onChange={this.handleDateChange}
            maxDate={moment()}
          />
        </Form.Input>
        <Form.Input
          label='Invoice Amount'
          name='invoiceAmount'
          placeholder='Invoice Amount'
          type='number'
          min='0.01'
          step='0.01'
          // value={this.props.invoiceAmount}
          // onChange={this.handleInputChange}
          // error={this.props.showError && !this.props.invoiceAmount}
        />
        <Form.Input
          label='Invoice Due Date'
        >
          <DatePicker
            selected={this.state.dueDate}
            onChange={this.handleDateChange}
          />
        </Form.Input>
        <Form.Input
          label='Customer Number'
          name='customerNumber'
          placeholder='Customer Number'
          // value={this.props.customerNumber}
          // onChange={this.handleInputChange}
          // error={this.props.showError && !this.props.customerNumber}
        />
        <Form.Dropdown
          label='Customer Country'
          search
          selection
          name='customerCountry'
          placeholder='Customer Country'
          // value={this.props.customerCountry}
          // onChange={this.handleInputChange}
          options={countries}
          // error={this.props.showError && !this.props.customerCountry}
        />
        <Button size='mini' color='teal' icon labelPosition='left'>
          <Icon name='plus'/>
          Add Product
        </Button>
        <List divided>
          <List.Item>
            <Form.Group>
              <Form.Input
                label='Product Name'
                name='productName'
                placeholder='Product Name'
                // value={this.props.productName}
                // onChange={this.handleInputChange}
                // error={this.props.showError && !this.props.productName}
              />
              <Form.Input
                label='Product Cost'
                name='productCost'
                placeholder='Product Cost'
                type='number'
                min='0.01'
                step='0.01'
                // value={this.props.productCost}
                // onChange={this.handleInputChange}
                // error={this.props.showError && !this.props.productCost}
              />
            </Form.Group>
          </List.Item>
        </List>
        <input type='file' ref="imgUpload" style={{'display': 'none'}} onChange={this.handleFileInput}/> 
        <Button float='left' size='mini' color='yellow' icon labelPosition='left' onClick={this.handleUploadClick}>
          <Icon name='plus'/>
          Upload Invoice
        </Button>
        <span>{this.state.file}</span>
        <Button floated='right'>Save Invoice</Button>
      </Form>
    );
  }
}

export default FormComponent;
