import React, { Component } from 'react';
import { Header, Segment, Checkbox, Grid } from 'semantic-ui-react';
import moment from 'moment';

class ManageComponent extends Component {

  render() {
    return (
      <div>
        <h3>Manage Invoices</h3>
        {!this.props.invoices && <Header>You don't have any invoices yet</Header>}
        {this.props.invoices &&
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column width={1}>
                <Checkbox/>
              </Grid.Column>
              <Grid.Column width={3}>
                <b>Invoice Number</b>
              </Grid.Column>
              <Grid.Column width={3}>
                <b>Customer Number</b>
              </Grid.Column>
              <Grid.Column width={3}>
                <b>Invoice Date</b>
              </Grid.Column>
              <Grid.Column width={3}>
                <b>Invoice Amount</b>
              </Grid.Column>
              <Grid.Column width={3}>
                <b>Due Date</b>
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
                <Grid.Column width={3}>
                  {moment(invoice.invoiceDate).format('L')}
                </Grid.Column>
                <Grid.Column width={3}>
                  {invoice.invoiceAmount}
                </Grid.Column>
                <Grid.Column width={3}>
                  {moment(invoice.dueDate).format('L')}
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </Segment.Group>
      }
      </div>
    );
  }
}

export default ManageComponent;
