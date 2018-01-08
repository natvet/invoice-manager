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
  state={invoices: [], checked: [], filtered: []}

  componentWillMount = () => {
    let savedInvoices = JSON.parse(localStorage.getItem('invoices'))
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
    const fileName = e.target.value.slice(12)
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
      const id = this.state.invoices.length ? (Math.max(...this.state.invoices.map(item => item.id)) + 1) : 1
      const invoices = [...this.state.invoices, {...this.state.currentInvoice, id: id}]
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

  handleInvoiceUpdate = () => {
    if(this.isInvoiceValid()) {
      const invoices = [...this.state.invoices]
      invoices.splice(this.state.indexToEdit, 1, this.state.currentInvoice)
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

  handleStatusChange = (status) => {
    let invoices = [...this.state.invoices]
    let indexes = [...this.state.checked]
    indexes.map(id => {
      const i = invoices.findIndex(item => item.id === id)
      return invoices[i].status = status
    })
    this.setState({invoices})
    localStorage.setItem('invoices', JSON.stringify(invoices))
  }

  handleInvoiceDelete = () => {
    let invoices = [...this.state.invoices]
    let filtered = [...this.state.filtered]
    let ids = [...this.state.checked]
    ids.map(id => {
      const i = invoices.findIndex(item => item.id === id)
      return invoices.splice(i, 1)
    })
    ids.map(id => {
      const i = filtered.findIndex(item => item.id === id)
      return filtered.splice(i, 1)
    })
    this.setState({invoices, filtered, checked: []})
    localStorage.setItem('invoices', JSON.stringify(invoices))
  }

  handleCheckboxCheck = (checked) => this.setState({checked})

  handleInvoiceEdit = (index) => {
    const invoices = [...this.state.invoices]
    let currentInvoice = invoices[index]
    currentInvoice.invoiceDate = moment(currentInvoice.invoiceDate)
    currentInvoice.dueDate = moment(currentInvoice.dueDate)
    this.setState({currentInvoice, indexToEdit: index})
  }

  handleFiltersApply = (filters) => {
    let invoices = [...this.state.invoices]
    invoices = filters.customerNumber.length ? this.filterByCustomer(filters.customerNumber, invoices) : invoices
    invoices = filters.customerCountry.length ? this.filterByCountry(filters.customerCountry, invoices) : invoices
    invoices = filters.products.length ? this.filterByProduct(filters.products, invoices) : invoices
    invoices = this.filterByAmount(filters.range, invoices)
    invoices = this.filterByDate(filters.fromDate, filters.toDate, invoices)
    this.setState({filteredInvoices: invoices})
  }

  filterByCustomer = (numbers, invoices) => {
    let filtered = []
    filtered = [].concat.apply([], numbers.map(number => invoices.filter((item => item.customerNumber === number))))
    return filtered
  }

  filterByCountry = (countries, invoices) => {
    let filtered = []
    filtered = [].concat.apply([], countries.map(country => invoices.filter((item => item.customerCountry === country))))
    return filtered
  }

  filterByProduct = (products, invoices) => {
    let filtered = products.map(product => invoices.filter((item => item.products.filter(el => el.name === product).length > 0)))
    const filteredFlatten = [].concat.apply([], filtered)
    return filteredFlatten
  }

  filterByAmount = (range, invoices) => {
    const min = range[0]
    const max = range[1]
    const filtered = invoices.filter(invoice => invoice.invoiceAmount >= min && invoice.invoiceAmount <= max)
    return filtered
  }

  filterByDate = (from, to, invoices) => {
    const filtered = invoices.filter(i =>  moment(i.dueDate).isSameOrAfter(from, 'day') && moment(i.dueDate).isSameOrBefore(to, 'day'))
    return filtered
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
                    filteredInvoices={this.state.filteredInvoices}
                    onCheckboxCheck={this.handleCheckboxCheck}
                    onStatusChange={this.handleStatusChange}
                    onDelete={this.handleInvoiceDelete}
                    checked={this.state.checked}
                    onEdit={this.handleInvoiceEdit}
                    onFiltersApply={this.handleFiltersApply}
                  />}
                />
                <Route path="/edit" render={(props) =>
                  <FormComponent
                    onInputChange={this.handleInputChange}
                    onDateChange={this.handleDateChange}
                    onFileInput={this.handleFileInput}
                    onAddProduct={this.handleAddProduct}
                    onDeleteProduct={this.handleDeleteProduct}
                    onProductChange={this.handleProductChange}
                    onUpdate={this.handleInvoiceUpdate}
                    currentInvoice={this.state.currentInvoice}
                    showError={this.state.showErrorMsg}
                    edit
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
