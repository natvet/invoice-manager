import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './FiltersComponent.css';

class FiltersComponent extends Component {
  state={
    customerNumber: [],
    fromDate: moment(),
    toDate: moment(),
    customerCountry: [],
    products: []
  }

  componentWillMount = () => {
    this.setState({range: [this.props.minAmount, this.props.maxAmount]})
  }

  handleFiltersChange = (filter, e, {value}) => {
    this.setState({[filter]: value})
  }

  applyFilters = () => console.log(this.state)

  handleRangeChange = (range) => {
    this.setState({range})
  }

  render() {
    return (
      <Segment>
        <Form className='c-FiltersComponent'>
          <Form.Group>
            <Form.Dropdown
              label='Customer Number'
              search
              selection
              multiple
              name='customerNumber'
              placeholder='Customer Number'
              value={this.state.customerNumber}
              onChange={this.handleFiltersChange.bind(this, 'customerNumber')}
              options={this.props.customerNumberOptions}
            />
            <Form.Input
              label='Invoice amount'
            >
              <div className='c-slider'>
                <div className='c-slider__labels'>
                  <span>${this.state.range[0]}</span>
                  <span>${this.state.range[1]}</span>
                </div>
                <Range
                  min={this.props.minAmount}
                  max={this.props.maxAmount}
                  step={0.01}
                  allowCross={false}
                  value={this.state.range}
                  onChange={this.handleRangeChange}
                />
              </div>
            </Form.Input>
            <Form.Input
              label='From Due Date'
            >
            <DatePicker
              selected={this.state.fromDate}
              // onChange={this.props.onDateChange.bind(this, 'dueDate')}
            />
            </Form.Input>
            <Form.Input
              label='To Due Date'
            >
            <DatePicker
              selected={this.state.toDate}
              // onChange={this.props.onDateChange.bind(this, 'dueDate')}
            />
            </Form.Input>
            <Form.Dropdown
              label='Customer Country'
              search
              selection
              multiple
              name='customerCountry'
              placeholder='Customer Country'
              value={this.state.customerCountry}
              onChange={this.handleFiltersChange.bind(this, 'customerCountry')}
              options={this.props.customerCountryOptions}
            />
            <Form.Dropdown
              label='Products'
              search
              selection
              multiple
              name='products'
              placeholder='Products'
              value={this.state.products}
              onChange={this.handleFiltersChange.bind(this, 'products')}
              options={this.props.productsOptions}
            />
            <div className='c-FiltersComponent__button'>
              <Button floated='right' onClick={this.applyFilters}>Filter</Button>
            </div>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default FiltersComponent;
