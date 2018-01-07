import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './FiltersComponent.css';

class FiltersComponent extends Component {

  handleFiltersChange = (filter, e, {value}) => {
    this.props.onFilterChange(filter, value)
  }

  applyFilters = () => this.props.onFiltersApply()

  handleRangeChange = (range) => {
    this.props.onRangeChange(range)
  }

  render() {
    const {filters} = this.props
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
              value={filters.customerNumber}
              onChange={this.handleFiltersChange.bind(this, 'customerNumber')}
              options={this.props.customerNumberOptions}
            />
            <Form.Input
              label='Invoice amount'
            >
              <div className='c-slider'>
                <div className='c-slider__labels'>
                  <span>${filters.range[0]}</span>
                  <span>${filters.range[1]}</span>
                </div>
                <Range
                  min={this.props.min}
                  max={this.props.max}
                  step={0.01}
                  allowCross={false}
                  value={filters.range}
                  onChange={this.handleRangeChange}
                />
              </div>
            </Form.Input>
            <Form.Input
              label='From Due Date'
            >
            <DatePicker
              selected={filters.fromDate}
              // onChange={this.props.onDateChange.bind(this, 'dueDate')}
            />
            </Form.Input>
            <Form.Input
              label='To Due Date'
            >
            <DatePicker
              selected={filters.toDate}
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
              value={filters.customerCountry}
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
              value={filters.products}
              onChange={this.handleFiltersChange.bind(this, 'products')}
              options={this.props.productsOptions}
            />
            <div className='c-FiltersComponent__button'>
              <Button floated='right' onClick={this.applyFilters}>Apply filters</Button>
            </div>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default FiltersComponent;
