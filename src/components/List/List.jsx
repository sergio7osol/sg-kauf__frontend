import React from 'react';
import { PureComponent } from 'react';
import PropTypes, { object } from 'prop-types';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


// import data from '../../../../../NodeJS/SGKauf/data/buy-list.json'; 

import moment from 'moment';
import locale_de from 'assets/locale-de';
import './List.scss';
import { Date } from 'core-js';

export default class List extends React.Component {

	render() {
    const { list, title } = this.props;
    const date = list[0] ? list[0].date : 0;
    
		let daySumCollection = list.map((time, index) => {
      let date = null;
      let month = null;
			let timeSumRoundedToCents = 0;
      
      const timeSum = time.buy.reduce((accumulator, current, index) => {
        const endPrice = current["weight/amount"] * current["price"];

				return accumulator + endPrice;
			}, 0);

      const clockTime = time.time.split('.').reverse().join('.');

			timeSumRoundedToCents = timeSum.toFixed(2);

			return (
				<li key={Date.now() + index} style={{marginTop: 0}} className="list__item"><small>{clockTime}</small>: <b>{timeSumRoundedToCents}</b> <small>Euro</small></li>
			);
		});

		return (
			<div className="list-wrapper">
        {
          title ? <b style={{display: "inline-block", marginTop: 1.3 + "em"}}><em>{title}</em></b> : null
        }
				<p style={{marginBottom: .2 + 'em'}}>{date}:</p>
				<ul style={{marginLeft: 1 + 'em'}} className="list">
					{daySumCollection}
				</ul>
			</div>
		)
	}

	static defaultProps = {
		list: [],
	}
}

// TODO: - add enums for some properties
List.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		"date": PropTypes.string,
		"time": PropTypes.string,
		"currency": PropTypes.string,
		"country": PropTypes.string,
    "address": 	PropTypes.shape({
      "city/town": PropTypes.string,
      "index": PropTypes.string,
      "street": PropTypes.string,
      "house number": PropTypes.number      
    }),
		"pay method": PropTypes.string,
    "shop's name": PropTypes.string,
    "buy": PropTypes.arrayOf(PropTypes.shape({
      "name": PropTypes.string,
      "weight/amount": PropTypes.number,
      "measure": PropTypes.string,
      "price": PropTypes.number
    }))
	}))
};