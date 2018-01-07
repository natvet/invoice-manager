import React, { Component } from 'react';
import FormComponent from './FormComponent.js';
import ManageComponent from './ManageComponent.js';
import MenuComponent from './MenuComponent.js';
import { Card, Message } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import moment from 'moment';
import './App.css';

const initialModel = {
  invoiceDate: moment(),
  dueDate: moment(),
  products: []
}

class App extends Component {
  state={invoices: []}

  componentWillMount = () => {
    const savedInvoices = JSON.parse(localStorage.getItem('invoices'))
    savedInvoices && this.setState({invoices: savedInvoices})
    this.setState({currentInvoice: {...initialModel}})
  }

  handleDateChange = (field, date) => {
    let currentInvoice = {...this.state.currentInvoice}
    currentInvoice[field] = date 
    this.setState({ currentInvoice })
  }

  handleInputChange = (e, {name, value}) => {
    let currentInvoice = {...this.state.currentInvoice}
    currentInvoice[name] = value 
    this.setState({ currentInvoice })
  }

  handleFileInput = (e, value) => {
    let currentInvoice = {...this.state.currentInvoice}
    const fileName = e.target.value.slice(12,-1)
    currentInvoice.file = fileName 
    this.setState({ currentInvoice })
  }

  handleAddProduct = () => {
    let currentInvoice = {...this.state.currentInvoice}
    currentInvoice.products = [...currentInvoice.products, {}]    
    this.setState({ currentInvoice })
  }

  handleDeleteProduct = (i) => {
    let currentInvoice = {...this.state.currentInvoice}
    let products = [...this.state.currentInvoice.products]
    products.splice(i, 1)
    currentInvoice.products = products
    this.setState({ currentInvoice})
  }

  handleProductChange = (field, item, e, {value}) => {
    let currentInvoice = {...this.state.currentInvoice}
    let products = [...this.state.currentInvoice.products]
    products[item][field] = value
    currentInvoice.products = products
    this.setState({ currentInvoice })
  }

  isInvoiceValid = () => (
    this.state.currentInvoice.invoiceNumber &&
    this.state.currentInvoice.invoiceAmount &&
    this.state.currentInvoice.customerNumber &&
    this.state.currentInvoice.file
  )

  handleSave = () => {
    if(this.isInvoiceValid()) {
      const invoices = [...this.state.invoices, this.state.currentInvoice]
      this.setState({
        invoices,
        showSuccessMsg: true,
        currentInvoice: {...initialModel},
        showErrorMsg: false,
        lastSaved: this.state.currentInvoice.invoiceNumber
      })
      setTimeout(() => {
        this.setState({showSuccessMsg: false})
      }, 3000)
      localStorage.setItem('invoices', JSON.stringify(invoices))
    } else {
      this.setState({showErrorMsg: true})
    }
    window.scroll(0,0)
  }

  handleStatusChange = (indexes, status) => {
    let invoices = [...this.state.invoices]
    indexes.map(index => invoices[index].status = status)
    this.setState({invoices})
    localStorage.setItem('invoices', JSON.stringify(invoices))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="c-App">
          <MenuComponent/>
          <Card fluid>
            <Card.Content>
              {this.state.showSuccessMsg ?
              <Message
                success
                size='tiny'
                header={`Invoice number ${this.state.lastSaved} has been successfully saved`}
              />
              : null}
              {this.state.showErrorMsg ?
              <Message
                error
                size='tiny'
                header='Please fill in required fileds with the correct data'
              />
              : null}
              <Switch>
                <Route path="/manage" render={(props) => 
                  <ManageComponent
                    invoices={this.state.invoices}
                    onStatusChange={this.handleStatusChange}
                  />}
                />
                <Route path="/" render={(props) =>
                  <FormComponent
                    onInputChange={this.handleInputChange}
                    onDateChange={this.handleDateChange}
                    onFileInput={this.handleFileInput}
                    onAddProduct={this.handleAddProduct}
                    onDeleteProduct={this.handleDeleteProduct}
                    onProductChange={this.handleProductChange}
                    onSave={this.handleSave}
                    currentInvoice={this.state.currentInvoice}
                    showError={this.state.showErrorMsg}
                  />}
                />
              </Switch>
            </Card.Content>
          </Card>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
