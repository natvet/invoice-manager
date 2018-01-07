import React, { Component } from 'react';
import { Header, Segment, Checkbox, Grid, Icon, List } from 'semantic-ui-react';
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

  render() {
    return (
      <div className='c-ManageComponent'>
        <h3>Manage Invoices</h3>
        {this.props.invoices.length === 0 && <Header>You don't have any invoices yet</Header>}
        {this.props.invoices.length !== 0 &&
        <Segment.Group>
          <Segment className='c-ManageComponent__head'>
          {console.log(this.props.invoices)}
            <Grid>
              <Grid.Column width={1}>
                <Checkbox/>
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
              <Grid.Column width={3}>
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
                  <Checkbox/>
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
                <Grid.Column width={3}>
                  ${invoice.invoiceAmount}
                </Grid.Column>
                <Grid.Column width={2}>
                  {moment(invoice.dueDate).format('L')}
                </Grid.Column>
                <Grid.Column width={2} className='c-ManageComponent__show-more' onClick={this.handleToggleDetails.bind(this, index)}>
                  {this.state[index] === 'open' ? 'Hide' : 'Show'} Details
                  <Icon name={this.state[index] === 'open' ? 'chevron up' : 'chevron down'}/>
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
      }
      </div>
    );
  }
}

export default ManageComponent;
