import React, { Component } from 'react';
import AddingBuy from 'components/AddingBuy/AddingBuy';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

import request from 'request';

import './AddItem.scss';

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.currencyChange = this.currencyChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.cityChange = this.cityChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currency: "EU",
            date: "",
            time: "00:00",
            city: "",
            index: "",
            street: "",
            houseNumber: "",
            payMethod: "EC card",
            shopName: "REWE"
        };
    }

    currencyChange = event => {
        this.setState({ currency: event.target.value });
    }

    dateChange = event => {
        this.setState({ date: event.target.value });
    }

    timeChange(event) {
        const newValue = event.target.value;
        const time__arr = newValue.split(':');
        const isError = time__arr.find((value, index) => {
            value = Number(value);

            if (value < 0) return true;

            if (index === 0) {
                if (value > 23) {
                    console.log('Error: it can not be more then 23 hours in a day.');

                    return true;
                }
            } else {
                if (value > 59) {
                    console.log('Error: it can not be more then 59 minutes in an hour.');

                    return true;
                }
            }
        });

        this.setState({ time: isError ? this.state.time : newValue });
    }

    cityChange = event => {
        this.setState({ city: event.target.value });
    }

    indexChange = event => {
        this.setState({ index: event.target.value });
    }

    streetChange = event => {
        this.setState({ street: event.target.value });
    }

    houseNumberChange = event => {
        this.setState({ houseNumber: event.target.value });
    }

    payMethodChange = event => {
        this.setState({ payMethod: event.target.value });
    }

    shopNameChange = event => {
        this.setState({ shopName: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        console.log('Something submitted, now emptying the input fields...');

        this.setState({
            date: '',
            time: '',
            city: '',
            index: '',
            street: '',
            houseNumber: '',
            shopName: ''
        });
    }

    postData() {
        const url = "http://localhost:3001/with-cors";

        request({ url, json: true }, (error, response) => {
            const data = response.body;

            if (error) { console.log('error >> ', error) };

            console.log('data >> ', data);
        });
    }

    render() {

        return (
            <form style={{ marginTop: '10px' }} onSubmit={this.handleSubmit} className="add-item">
                <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Add a buy</h4>

                <select name="add-item__currency" className="add-item__currency" onChange={this.currencyChange} value={this.state.currency}>
                    <option value="RU">RU</option>
                    <option value="EU">EU</option>
                </select>
                <select name="add-item__pay-method" className="add-item__pay-method" onChange={this.payMethodChange} value={this.state.payMethod}>
                    <option value="Cash">Cash</option>
                    <option value="EC card">EC card</option>
                </select>
                <br />
                <input name="add-item__date" className="add-item__date" onChange={this.dateChange} value={this.state.date} required type="date" />
                <input name="add-item__time" className="add-item__time" onChange={this.timeChange} value={this.state.time} required type="text" />
                <input name="add-item__shop-name" className="add-item__shop-name" onChange={this.shopNameChange} value={this.state.shopName} placeholder="Shop's name" type="text" />
                <div className="add-item__address">
                    <h5 style={{ margin: "8px 0 3px 0", fontSize: "14px" }}>Address</h5>
                    <input name="add-item__city" className="add-item__city" onChange={this.cityChange} value={this.state.city} placeholder="City/Town" required type="text" />
                    <input name="add-item__index" className="add-item__index" onChange={this.indexChange} value={this.state.index} placeholder="Index" type="text" />
                    <input name="add-item__street" className="add-item__street" onChange={this.streetChange} value={this.state.street} placeholder="Street" type="text" />
                    <input name="add-item__house-number" className="add-item__house-number" onChange={this.houseNumberChange} value={this.state.houseNumber} placeholder="House number" type="text" />
                </div>
                <div className="add-item__buy">
                    <AddingBuy />
                </div>
                
                <Button variant="contained" color="primary" type="submit"><ShoppingCartIcon /> &nbsp;&nbsp;Submit a buy</Button>
                {/* <button id="add-buy" onClick={() => {
          this.postData();
        }}>Read day</button>&nbsp;&nbsp;&nbsp; */}
                {/* <button id="add-buy-without" onClick={() => this.addBuyWithoutFn}>Add item without</button> */}
            </form>
        )
    }
}

// AddItem.propTypes = {
//   items: PropTypes.string
// };