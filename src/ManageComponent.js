import React, { Component } from 'react';
import { Header, Segment, Checkbox, Grid, Icon, List, Button } from 'semantic-ui-react';
import moment from 'moment';
import './ManageComponent.css';

class ManageComponent extends Component {
  state={}

  handleToggleDetails = (index) => {
    if(this.state[index] === 'open') {
      this.setState({[index]: 'hide'})
    } else {
      this.setState({[index]: 'open'})
    }
  }

  handleCheckboxCheck = (index) => {
    let checkedArr = [...this.props.checked]
    const isPresent = checkedArr.filter(el => el === index).length
    if(!isPresent) {
      checkedArr = [...checkedArr, index]
    } else {
      const elementToDelete = this.props.checked.indexOf(index)
      checkedArr.splice(elementToDelete, 1)
    }
    this.props.onCheckboxCheck(checkedArr)
  }

  handleSelectAllCheck = (e, {checked}) => {
    let checkedArr = [...this.props.checked]
    if(checked) {
      checkedArr = this.props.invoices.map((invoice, i) => i)
    } else {
      checkedArr = []
    }
    this.props.onCheckboxCheck(checkedArr)
  }

  isChecked = (i) => {
    return this.props.checked.filter(el => el === i).length ? true : false
  }

  render() {
    return (
      <div className='c-ManageComponent'>
        <h3>Manage Invoices</h3>
        {this.props.invoices.length === 0 && <Header>You don't have any invoices yet</Header>}
        {this.props.invoices.length !== 0 &&
        <div>
          <div className='c-ManageComponent__buttons'>
            <span className='c-ManageComponent__checked-number'>{this.renderCheckedNumber()}</span>
            <Button
              size='tiny'
              color='orange'
              icon
              labelPosition='left'
              onClick={this.props.onStatusChange.bind(this, 'rejected')}
            >
              <Icon name='close'/>
              Reject
            </Button>
            <Button
              size='tiny'
              color='green'
              icon
              labelPosition='left'
              onClick={this.props.onStatusChange.bind(this, 'approved')}
            >
              <Icon name='checkmark'/>
              Approve
            </Button>
            <Button
              size='tiny'
              color='red'
              onClick={this.props.onDelete}
            >
              <Icon name='trash'/>
              Delete
            </Button>
          </div>
          <Segment.Group>
            <Segment className='c-ManageComponent__head'>
              <Grid>
                <Grid.Column width={1}>
                  <Checkbox onClick={this.handleSelectAllCheck}/>
                </Grid.Column>
                <Grid.Column width={3}>
                  Invoice Number
                </Grid.Column>
                <Grid.Column width={3}>
                  Customer Number
                </Grid.Column>
                <Grid.Column width={2}>
                  Invoice Date
                </Grid.Column>
                <Grid.Column width={2}>
                  Invoice Amount
                </Grid.Column>
                <Grid.Column width={2}>
                  Due Date
                </Grid.Column>
              </Grid>
            </Segment>
            {this.props.invoices && this.props.invoices.map((invoice, index) => (
              <Segment key={index}>
                <Grid>
                  <Grid.Column width={1}>
                    <Checkbox
                      onClick={this.handleCheckboxCheck.bind(this, index)}
                      checked={this.isChecked(index)}
                    />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {invoice.invoiceNumber}
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {invoice.customerNumber}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {moment(invoice.invoiceDate).format('L')}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    ${invoice.invoiceAmount}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {moment(invoice.dueDate).format('L')}
                  </Grid.Column>
                  <Grid.Column width={2} className='c-ManageComponent__show-more' onClick={this.handleToggleDetails.bind(this, index)}>
                    {this.state[index] === 'open' ? 'Hide' : 'Show'} Details
                    <Icon name={this.state[index] === 'open' ? 'chevron up' : 'chevron down'}/>
                  </Grid.Column>
                  <Grid.Column width={1}>
                    {this.renderIcon(invoice.status)}
                  </Grid.Column>
                </Grid>
                {this.state[index] === 'open' &&
                <Segment>
                  <div><b>Products: </b></div>
                  <List horizontal divided>
                    {invoice.products.map((item, i) => <List.Item key={i}>{item.name}: ${item.cost}</List.Item>)}
                  </List>
                  <div><b>Customer Country:</b> {invoice.customerCountry}</div>
                  <div><b>Attached file:</b> {invoice.file}</div>
                </Segment>
                }
              </Segment>
            ))}
          </Segment.Group>
        </div>
      }
      </div>
    );
  }
  renderCheckedNumber = () => {
    if(this.props.checked && this.props.checked.length === 1) {
      return this.props.checked.length + ' Invoice selected'
    } else if(this.props.checked && this.props.checked.length > 1) {
      return this.props.checked.length + ' Invoices selected'
    }
  }
  renderIcon = (status) => {
    if(status === 'approved') {
      return <Icon size='large' color='green' name='check circle'/>
    } else if (status === 'rejected') {
      return <Icon size='large' color='orange' name='remove circle'/>
    } else {
      return <Icon size='large' color='grey' name='help circle outline'/>
    }
  }
}

export default ManageComponent;
