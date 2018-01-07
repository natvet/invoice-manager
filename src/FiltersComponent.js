import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { countries } from './utils/countries';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './FiltersComponent.css';

class FiltersComponent extends Component {
  state={
    customerNumber: '',
    fromDate: moment(),
    toDate: moment(),
    customerCountry: '',
    products: [],
    range: [1, 1000]
  }

  applyFilters = () => console.log('filter')

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
              name='customerNumber'
              placeholder='Customer Number'
              value={this.state.customerNumber}
              onChange={this.props.onFilterChange}
              options={countries}
            />
            <Form.Input
              label='Invoice amount'
            >
              <div className='c-slider'>
                <div className='c-slider__labels'>
                  <span>${this.state.range[0]}</span>
                  <span>${this.state.range[1]}</span>
                </div>
                <Range allowCross={false} value={this.state.range} onChange={this.handleRangeChange}/>
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
              name='customerCountry'
              placeholder='Customer Country'
              value={this.state.customerCountry}
              onChange={this.props.onFilterChange}
              options={countries}
            />
            <Form.Dropdown
              label='Products'
              search
              selection
              multiple
              name='products'
              placeholder='Products'
              value={this.state.products}
              onChange={this.props.onFilterChange}
              options={countries}
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
