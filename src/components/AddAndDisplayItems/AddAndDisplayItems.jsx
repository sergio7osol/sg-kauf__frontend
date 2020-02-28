import React from 'react';
import moment from 'moment';
import AddItem from 'components/AddItem/AddItem';
import List from 'components/List/List';
import { getJsonData, sortNumbers } from 'utilities';
import './AddAndDisplayItems.scss';
import { Date, Object } from 'core-js';

class AddAndDisplayItems extends React.Component {

	constructor(props) {
    super(props);
  
    this.data = [
      {
        "date": "16.08.2019",
        "time": "12:32",
        "currency": "EU",
        "country": "Germany",
        "address": {
          "city/town": "Hamburg",
          "index": "22307",
          "street": "Fuhlsbuettler Str.",
          "house number": 387      
        },
        "pay method": "EC card",
        "shop's name": "REWE",
        "buy": [
          { 
            "name": "SALATBAR GROSS",
            "weight/amount": 0.448,
            "measure": "piece",
            "price": 11.90
          },
          {
            "name": "ROSENBROETC.DKL.",
            "weight/amount": 1,
            "measure": "piece",
            "price": 0.22
          },
          {
            "name": "SUSHI HANNOKI",
            "weight/amount": 1,
            "measure": "piece",
            "price": 7.99
          },
          {
            "name": "HEIDELBEEREN",
            "weight/amount": 1,
            "measure": "piece",
            "price": 2.99
          },
          { 
            "name": "JA! JOGHURT 1.5",
            "weight/amount": 1,
            "measure": "piece",
            "price": 0.49
          },
          { 
            "name": "LUFLEE",
            "weight/amount": 1,
            "measure": "piece",
            "price": 1.09
          }
        ]
      }
    ];

		this.state = {
			allBuys: []
		};
	}

	getAllBuyData() {
		getJsonData('https://sg-kauf.herokuapp.com//all-files', (error, data) => {
			let buyData = null;
			const dateNormalizedData = {};

			if (error) {
				console.log('No getAllBuyData ', error);
			} else if (data) {
				buyData = data.body;
        buyData && buyData instanceof Array && buyData.forEach(day => {
          let dayDateArr = null;
          let year = null;
          let month = null;
          let dayNumber = null;

          try {
            dayDateArr = day[0].date.split(".");
            year = dayDateArr[2];
            month = dayDateArr[1];
            dayNumber = dayDateArr[0];

            if (dateNormalizedData[year]) {
              if (dateNormalizedData[year][month]) {
                dateNormalizedData[year][month][dayNumber] = day;
              } else {
                dateNormalizedData[year][month] = {
                  [dayNumber]: day
                };
              }
            } else {
              dateNormalizedData[year] = {
                [month]: {
                  [dayNumber]: day
                }
              };
            }
          }
          catch (e) {
            throw 'Could not find the date in the first buy of the day.';
          }

          this.setState({
            allBuys: dateNormalizedData
          });
        });
      }
    });
	}

	getMonthName(number) {
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November", 
			"December"
		];

		return monthNames[number-1];
	}

	componentDidMount() {
		this.getAllBuyData();
	}

	render() {
    const { allBuys } = this.state;
    
    const RU = 0.01428571428;

		let currentMonth = null;
		let resultSum = null;
		let daySumRoundedToCents = null;
		let years = Object.keys(allBuys);
		let resultElements = [];

		if (years.length) {
			years = years.sort(sortNumbers);

			years.forEach(year => {
				const currentYear = allBuys[year];
				let months = Object.keys(currentYear);

				resultElements.push(<h3>{year}</h3>);

				months = months.sort(sortNumbers);

				months.forEach(month => {
					const currentMonth = currentYear[month];
					const currentMonthsname = this.getMonthName(Number(month));

					let monthSum = 0;
					let days = Object.keys(currentMonth);

					resultElements.push(<h5>{currentMonthsname}</h5>);

					days = days.sort(sortNumbers);

					days.forEach((day, index) => {
						const times = currentMonth[day]; // to sort according the time
						let timeEls = [];
						let dayEl = null; 
						let daySum = 0;  

						resultElements.push(<div style={{ float: "left", color: "#aaa", fontSize: "1.3em", fontWeight: "bold" }}>{Number(day)}</div>);
 
						timeEls = times.map((time, index) => { 
							const shopName = time['shop\'s name'];
 
							const timeEndSum = time.buy.reduce((timeSum, item) => {
                let itemsPrice = item["price"];
                
                if (time.currency === "RU") { itemsPrice = itemsPrice * RU; }
                
								const endPrice = item["weight/amount"] * itemsPrice;
 
								return timeSum + endPrice;
							}, 0);

							daySum += timeEndSum; 

							return (
								<li key={Date.now() + index}>
									<sup style={{color: "#555", fontStyle: "italic", fontSize: ".7em"}}>{shopName}</sup> 
									<span style={{marginLeft: ".5em", marginRight: ".5em"}}>{time.time}</span>
									<b>{timeEndSum.toFixed(2)}</b>
								</li>
							);
						});

						monthSum += daySum;

						dayEl = (
							<div className="day">
								<b style={{float: "right", fontSize: "1.2em"}}>{daySum.toFixed(2)}</b>
								<ul style={{ clear: "both", listStyleType: "none", paddingLeft: ".5em" }}>
									{timeEls}
								</ul>
							</div>
						); 

						resultElements.push(dayEl);
					});

					resultElements.push(<b style={{float: "right", fontSize: "2em", color: "green", border: "1px solid", borderRadius: ".2em", padding: ".2em", marginTop: "-1em"}}>{monthSum.toFixed(2)}</b>);
				});

			});

			// resultSum = allBuys.reduce((sum, day) => {
			// 	const dayEndSum = day.reduce((daySum, time) => {
			// 		let timeEndSum = 0;

			// 		timeEndSum = time.buy.reduce((timeSum, item) => {
			// 			const endPrice = item["weight/amount"] * item["price"];

			// 			return timeSum + endPrice;
			// 		}, 0); 

			// 		return daySum += timeEndSum; //timeSum.toFixed(2);
			// 	}, 0);

			// 	return sum += dayEndSum;
 
			// }, 0); 

			// daySumRoundedToCents = resultSum.toFixed(2);
		}

		return (
			<div className="add-and-display-items">
        Add and display Items
				{/* <div className="add-and-display-items__result-sum">{daySumRoundedToCents}</div> */}
				<AddItem />
				{resultElements}
        <List />
				{/* <button onClick={this.getAllBuyData}>All Days</button> */}
				{
					// !allBuys.length
					// 	? <span>Spin</span>
					// 	: this.state.allBuys.map((day, index) => {
					// 		const date = moment(day[0].date, "DD-MM-YYYY");
					// 		const month = this.getMonthName(date.month());
					// 		let title = null;

					// 		if (month !== currentMonth) {
					// 			currentMonth = title = month;
					// 		}

					// 		return <List key={Date.now() + index} list={day} title={title} />
					// 	})
				}
			</div>
		)
	}
}

export default AddAndDisplayItems;