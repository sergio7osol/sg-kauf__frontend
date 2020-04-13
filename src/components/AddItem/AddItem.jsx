import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { green } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

import request from 'request';

import './AddItem.scss';

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.getBuyItems = this.getBuyItems.bind(this);
        this.currencyChange = this.currencyChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.cityChange = this.cityChange.bind(this);
        this.nameChange = this.nameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        const defaultBuy = {
            name: '',
            weightAmount: 0,
            measure: 'piece',
            price: 0
        };

        this.state = {
            currency: "EU",
            date: "",
            time: "00:00",
            address: {
                country: "",
                city: "",
                index: "",
                street: "",
                houseNumber: "",
            },
            payMethod: "EC card",
            shopName: "REWE",
            addOrEditBuy: [defaultBuy]
        };
    }

    render() {
        return (
            <form className="add-item" style={{ marginTop: '10px' }} onSubmit={this.handleSubmit}>
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
                    <input name="add-item__city" className="add-item__city" onChange={this.cityChange} value={this.state.address.city} placeholder="City/Town" required type="text" />
                    <input name="add-item__index" className="add-item__index" onChange={this.indexChange} value={this.state.address.index} placeholder="Index" type="text" />
                    <input name="add-item__street" className="add-item__street" onChange={this.streetChange} value={this.state.address.street} placeholder="Street" type="text" />
                    <input name="add-item__house-number" className="add-item__house-number" onChange={this.houseNumberChange} value={this.state.address.houseNumber} placeholder="House number" type="text" />
                </div>
                <div className="add-item__buy">
                    {/* <AddingBuy items={this.state.buyItems} getItems={this.getBuyItems} /> */}
                    <Paper style={{ padding: ".7rem" }}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={5} md={7}>
                                <TextField className="add-item__buy-name" onChange={this.nameChange} value={this.state.addOrEditBuy.name} label="Name" variant="filled" size="small" />
                            </Grid>
                            {/* <Grid item xs={5} sm={3} md={2}>
                                <TextField
                                    name="adding-list__weight-amount"
                                    className="adding-list__weight-amount"
                                    onChange={event => this.weightAmountChange(event.target.value, index)}
                                    value={this.state.addOrEditBuy.weightAmount}
                                    label="Weight / Amount"
                                    variant="filled"
                                    size="small"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={5} sm={2} md={1}>
                                <TextField
                                    name="adding-list__measure"
                                    className="adding-list__measure"
                                    select
                                    label="Measure"
                                    value={this.state.addOrEditBuy.measure}
                                    onChange={event => this.measureChange(event.target.value, index)}
                                    // helperText="piece/kg"
                                    variant="filled"
                                >
                                    <MenuItem value="piece">Piece</MenuItem>
                                    <MenuItem value="kg">KG</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={5} md={1}>
                                <TextField
                                    name="adding-list__price"
                                    className="adding-list__price"
                                    onChange={event => this.priceChange(event.target.value, index)}
                                    value={this.state.addOrEditBuy.price}
                                    label="Price"
                                    variant="filled"
                                    size="small"
                                    type="number"
                                />
                            </Grid> */}
                        </Grid>
                    </Paper>
                </div>

                <Button variant="contained" color="primary" type="submit"><ShoppingCartIcon /> &nbsp;&nbsp;Submit a buy</Button>
                {/* <button id="add-buy" onClick={() => {
                    this.postData();
                    }}>Read day</button>&nbsp;&nbsp;&nbsp; */
                }
                {/* <button id="add-buy-without" onClick={() => this.addBuyWithoutFn}>Add item without</button> */}
            </form>
        )
    }

    getBuyItems(items) {
        this.setState({ buyItems: items });
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
        this.state.address.city = event.target.value;
        this.setState(this.state);
    }

    indexChange = event => {
        const currentAddress = this.state.address;

        currentAddress.index = event.target.value;
        this.setState({
            address: currentAddress
        });
    }

    streetChange = event => {
        this.setState({
            address: {
                street: event.target.value
            }
        });
    }

    houseNumberChange = event => {
        this.setState({
            address: {
                houseNumber: event.target.value
            }
        });
    }

    payMethodChange = event => {
        this.setState({ payMethod: event.target.value });
    }

    shopNameChange = event => {
        this.setState({ shopName: event.target.value });
    }

    // add/edit buy
    nameChange(value, index) {
        const items = this.state.items;

        items[index].name = value;

        if (this.props.getItems) {
            this.props.getItems(items);
        } else {
            this.setState({
                items
            })
        }
    }
    weightAmountChange(value, index) {
        const items = this.state.items;

        items[index].weightAmount = value;

        if (this.props.getItems) {
            this.props.getItems(items);
        } else {
            this.setState({
                items
            })
        }
    }
    measureChange(value, index) {
        const items = this.state.items;

        items[index].measure = value;

        if (this.props.getItems) {
            this.props.getItems(items);
        } else {
            this.setState({
                items
            })
        }
    }
    priceChange(value, index) {
        const items = this.state.items;

        items[index].price = value;

        if (this.props.getItems) {
            this.props.getItems(items);
        } else {
            this.setState({
                items
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        console.log('Something submitted, now emptying the input fields...');
        console.log('addItem STATE: ', this.state);

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
}

// AddItem.propTypes = {
//   items: PropTypes.string
// };