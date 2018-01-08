import React, { Component } from 'react';
import { Form, Button, Icon, List, Label } from 'semantic-ui-react';
import { countries } from './utils/countries';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class FormComponent extends Component {
  state={}

  handleUploadClick = () => {
    this.refs.imgUpload.click()
  }

  handleSave = () => {
    if(this.props.edit) {
      this.props.onUpdate()
    } else {
      this.props.onSave()
    }
  }

  render() {
    return (
      <Form>
        <h3>{this.props.edit ? 'Edit ' : 'Enter '}Invoice</h3>
        <Form.Input
          label='Invoice Number'
          name='invoiceNumber'
          placeholder='Invoice Number'
          value={this.props.currentInvoice.invoiceNumber || ''}
          onChange={this.props.onInputChange}
          error={this.props.showError && !this.props.currentInvoice.invoiceNumber}
        />
        <Form.Input
          label='Invoice Date'
        >
          <DatePicker
            selected={this.props.currentInvoice.invoiceDate}
            onChange={this.props.onDateChange.bind(this, 'invoiceDate')}
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
          value={this.props.currentInvoice.invoiceAmount || ''}
          onChange={this.props.onInputChange}
          error={this.props.showError && !this.props.currentInvoice.invoiceAmount}
          labelPosition='left'
        >
          <Label basic>$</Label>
          <input/>
        </Form.Input>
        <Form.Input
          label='Invoice Due Date'
        >
          <DatePicker
            selected={this.props.currentInvoice.dueDate}
            onChange={this.props.onDateChange.bind(this, 'dueDate')}
          />
        </Form.Input>
        <Form.Input
          label='Customer Number'
          name='customerNumber'
          placeholder='Customer Number'
          value={this.props.currentInvoice.customerNumber || ''}
          onChange={this.props.onInputChange}
          error={this.props.showError && !this.props.currentInvoice.customerNumber}
        />
        <Form.Dropdown
          label='Customer Country'
          search
          selection
          name='customerCountry'
          placeholder='Customer Country'
          value={this.props.currentInvoice.customerCountry || ''}
          onChange={this.props.onInputChange}
          options={countries}
          error={this.props.showError && !this.props.currentInvoice.customerCountry}
        />
        <Button
          size='mini'
          color='teal'
          icon
          labelPosition='left'
          onClick={this.props.onAddProduct}
        >
          <Icon name='plus'/>
          Add Product
        </Button>
        <List divided>
          {this.props.currentInvoice.products.map((item, i) => (
            <List.Item key={i}>
              <Form.Group>
                <Form.Input
                  label='Product Name'
                  name='name'
                  placeholder='Product Name'
                  value={this.props.currentInvoice.products[i].name || ''}
                  onChange={this.props.onProductChange.bind(this, 'name', i)}
                  error={this.props.showError && !this.props.currentInvoice.products[i].name}
                />
                <Form.Input
                  label='Product Cost'
                  name='cost'
                  placeholder='Product Cost'
                  type='number'
                  min='0.01'
                  step='0.01'
                  value={this.props.currentInvoice.products[i].cost || ''}
                  onChange={this.props.onProductChange.bind(this, 'cost', i)}
                  error={this.props.showError && !this.props.currentInvoice.products[i].cost}
                  labelPosition='left'
                >
                  <Label basic>$</Label>
                  <input/>
                </Form.Input>
                <div>
                  <Icon name='close' size='large' onClick={this.props.onDeleteProduct.bind(this, i)}/>
                </div>
              </Form.Group>
            </List.Item>
          ))}
        </List>
        <input type='file' ref="imgUpload" style={{'display': 'none'}} onChange={this.props.onFileInput}/> 
        <Button
          float='left'
          size='mini'
          color={this.props.showError && !this.props.currentInvoice.file ? 'red' : 'yellow'}
          icon
          labelPosition='left'
          onClick={this.handleUploadClick}
        >
          <Icon name='plus'/>
          Upload Document
        </Button>
        <span>{this.props.currentInvoice.file}</span>
        <Button floated='right' onClick={this.handleSave}>{this.props.edit ? 'Update' : 'Save'} Invoice</Button>
      </Form>
    );
  }
}

export default FormComponent;
