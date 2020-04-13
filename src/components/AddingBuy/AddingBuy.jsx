import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
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
            items: this.props.items || [defaultItem]
        };

        this.getDefaultItem = () => {
            const defaultObjectCopy = JSON.parse(JSON.stringify(defaultItem));

            return defaultObjectCopy;
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        
        // this.props.getItems = this.props.getItems.bind(this);
    }

    render() {
        return (
            <div className="adding-list">
                <ul>
                    { 
                        this.state.items.length && this.state.items.map((v, index) => {
                            return (
                                <li key={index} className="adding-list__item">
                                    <Paper style={{padding: ".7rem"}}>
                                        <Grid container spacing={8}>
                                            <Grid item xs={12} sm={5} md={7}>
                                                <TextField name="adding-list__name" className="adding-list__name" onChange={event => this.nameChange(event.target.value, index)} value={v.name} label="Name" variant="filled" size="small" />
                                            </Grid>
                                            <Grid item xs={5} sm={3} md={2}>
                                                <TextField
                                                    name="adding-list__weight-amount"
                                                    className="adding-list__weight-amount"
                                                    onChange={event => this.weightAmountChange(event.target.value, index)}
                                                    value={v.weightAmount}
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
                                                    value={v.measure}
                                                    onChange={event => this.measureChange(event.target.value, index)}
                                                    // helperText="piece/kg"
                                                    variant="filled"
                                                >
                                                    <MenuItem key={"piece-" + index} value="piece">Piece</MenuItem>
                                                    <MenuItem key={"kg-" + index} value="kg">KG</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={1}>
                                                <TextField
                                                    name="adding-list__price"
                                                    className="adding-list__price"
                                                    onChange={event => this.priceChange(event.target.value, index)}
                                                    value={v.price}
                                                    label="Price"
                                                    variant="filled"
                                                    size="small"
                                                    type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={2} md={1}>
                                                <Button onClick={() => this.removeItem(index)} className="adding-list__btn-remove" size="medium" variant="contained" style={{ float: 'right' }}>
                                                    <RemoveShoppingCartRoundedIcon color="secondary" />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </li>
                            )
                        })
                    }
                </ul>
                <Button onClick={this.addItem} className="adding-list__submit" size="large" variant="contained" color="primary" style={{ backgroundColor: green[500] }}><AddIcon /> &nbsp;&nbsp;add a buy</Button>
            </div>
        )
    }

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

AddingBuy.propTypes = {
    items: PropTypes.array,
    getItems: PropTypes.func
};