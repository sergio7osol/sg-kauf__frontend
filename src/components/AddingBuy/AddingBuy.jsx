import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

import './AddingBuy.scss';

export default class AddingBuy extends Component {
    constructor(props) {
        super(props);

        const defaultItem = {
            name: '',
            weightAmount: 0,
            measure: 'piece',
            price: 0
        };
        
        this.state = {
            items: [{
                name: '',
                weightAmount: 0,
                measure: 'piece',
                price: 0
            }]
        };

        this.getDefaultItem = () => {
            const defaultObjectCopy = JSON.parse(JSON.stringify(defaultItem));

            return defaultObjectCopy;
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    render() {
        return (
            <div className="adding-list">
                <ul>
                    { 
                        this.state.items.length && this.state.items.map((v, index) => {
                            return (
                                <li key={index} className="adding-list__item">
                                    <Button onClick={() => this.removeItem(index)} className="adding-list__btn-remove" size="medium" variant="contained" style={{float:'right'}}>
                                        <RemoveShoppingCartRoundedIcon color="secondary" />
                                    </Button>
                                    <TextField name="adding-list__name" className="adding-list__name" onChange={event => this.nameChange(event.target.value, index) } value={v.name} label="Name" variant="outlined" size="small" />
                                    &nbsp;&nbsp;
                                    <TextField
                                        name="adding-list__weight-amount"
                                        className="adding-list__weight-amount"
                                        onChange={event => this.weightAmountChange(event.target.value, index)}
                                        value={v.weightAmount}
                                        label="Weight / Amount"
                                        variant="outlined" 
                                        size="small"
                                        type="number"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {/* 
                                    <input name="adding-list__weight-amount" className="adding-list__weight-amount" onChange={this.weightAmountChange} value={v.weightAmount} placeholder="weight/amount" type="number" />
                                    <select name="adding-list__measure" className="adding-list__measure" onChange={this.measureChange} value={v.measure}>
                                        <option value="piece">piece</option>
                                        <option value="kg">kg</option>
                                    </select>
                                    <br />
                                    <input name="adding-list__price" className="adding-list__price" onChange={this.priceChange} value={v.price} placeholder="Price" type="number" /> 
                                    */}
                                </li>
                            )
                        })
                    }
                </ul>
                <Button onClick={this.addItem} className="adding-list__submit" size="medium" variant="contained" color="primary" style={{ backgroundColor: green[500] }}><AddIcon /> &nbsp;&nbsp;add a buy</Button>
            </div>
        )
    }

    nameChange(value, index) {
        const items = this.state.items; 

        items[index].name = value;

        this.setState({
            items
        })
    }

    weightAmountChange(value, index) {
        const items = this.state.items; 

        items[index].weightAmount = value;

        this.setState({
            items
        })
    }

    addItem() {
        this.setState({
            items: [
                ...this.state.items,
                this.getDefaultItem()
            ]
        });
    }

    removeItem(index) {
        const items = this.state.items; 

        items.splice(index, 1);

        this.setState({
            items
        })
    }
}

// AddItem.propTypes = {
//   items: PropTypes.string
// };