import React from 'react';
import { mount, unmount } from 'enzyme';
import AddItem from 'components/AddItem/AddItem';



describe('input controls\' existance', () => {
  let wrapped = null;

	beforeEach(() => {
		wrapped = mount(<AddItem />);
	});

	afterEach(() => {
		wrapped.unmount();
	});

	it('has a date, time inputs and a button', () => {
    const currency = wrapped.find('select.add-item__currency');
    const date = wrapped.find('input.add-item__date');
    const time = wrapped.find('input.add-item__time');
    const city = wrapped.find('input.add-item__city');
    const index = wrapped.find('input.add-item__index');
    const street = wrapped.find('input.add-item__street');
    const houseNumber = wrapped.find('input.add-item__house-number');
    const payMethod = wrapped.find('select.add-item__pay-method');
    const shopName = wrapped.find('input.add-item__shop-name');
    const submitBtn = wrapped.find("button[type='submit']");

		expect(currency.length).toEqual(1);
		expect(date.length).toEqual(1);
		expect(time.length).toEqual(1);
		expect(city.length).toEqual(1);
		expect(index.length).toEqual(1);
		expect(street.length).toEqual(1);
		expect(houseNumber.length).toEqual(1);
		expect(payMethod.length).toEqual(1);
		expect(shopName.length).toEqual(1);
		expect(submitBtn.length).toEqual(1);
	});
});

describe('input controls', () => {
  let wrapped = null;

	beforeEach(() => {
		wrapped = mount(<AddItem />);
    
    wrapped.find('select.add-item__currency').simulate('change', {
			target: {
				value: 'RU'
			}
    });
    wrapped.find('select.add-item__pay-method').simulate('change', {
			target: {
				value: 'Cash'
			}
    });
		wrapped.find('input.add-item__date').simulate('change', {
			target: {
				value: '2020-02-12'
			}
		});
		wrapped.find('input.add-item__time').simulate('change', {
			target: {
				value: '14:18'
			}
    });
    wrapped.find('input.add-item__city').simulate('change', {
			target: {
				value: 'St.Petersburg'
			}
    });
    wrapped.find('input.add-item__index').simulate('change', {
			target: {
				value: '125687'
			}
    });
    wrapped.find('input.add-item__street').simulate('change', {
			target: {
				value: 'Berliner Str.'
			}
    });
    wrapped.find('input.add-item__house-number').simulate('change', {
			target: {
				value: '72'
			}
    });
    wrapped.find('input.add-item__shop-name').simulate('change', {
			target: {
				value: 'REWE'
			}
    });

    wrapped.update();
	});

	afterEach(() => {
		wrapped.unmount();
	});

  it('refreshes the currency select properly on changing the value', () => {
    const currency = wrapped.find('select.add-item__currency');

		expect(currency.prop('value')).toEqual('RU');
  });
  it('refreshes the pay method input properly on changing the value', () => {
    const payMethod = wrapped.find('select.add-item__pay-method');
    
    expect(payMethod.prop('value')).toEqual('Cash');
	});
  it('refreshes the date input properly on changing the value', () => {
    const date = wrapped.find('input.add-item__date');

		expect(date.prop('value')).toEqual('2020-02-12');
	});

	it('refreshes the time input properly on changing the value', () => {
    const time = wrapped.find('input.add-item__time');
    
    expect(time.prop('value')).toEqual('14:18');
  });
  
  it('refreshes the city/town input properly on changing the value', () => {
    const city = wrapped.find('input.add-item__city');
    
    expect(city.prop('value')).toEqual('St.Petersburg');
  });
  
  it('refreshes the index input properly on changing the value', () => {
    const index = wrapped.find('input.add-item__index');
    
    expect(index.prop('value')).toEqual('125687');
  });
  
  it('refreshes the street input properly on changing the value', () => {
    const street = wrapped.find('input.add-item__street');
    
    expect(street.prop('value')).toEqual('Berliner Str.');
  });
  
  it('refreshes the house number input properly on changing the value', () => {
    const houseNumber = wrapped.find('input.add-item__house-number');
    
    expect(houseNumber.prop('value')).toEqual('72');
  });
  it('refreshes the shop name input properly on changing the value', () => {
    const houseNumber = wrapped.find('input.add-item__shop-name');
    
    expect(houseNumber.prop('value')).toEqual('REWE');
  });

  it('empties the input fields, when form is submitted', () => {
    wrapped.find('form.add-item').simulate('submit');

    wrapped.update();

    expect(wrapped.find('select.add-item__currency').prop('value')).toEqual('RU');
    expect(wrapped.find('select.add-item__pay-method').prop('value')).toEqual('Cash');
    expect(wrapped.find('input.add-item__date').prop('value')).toEqual('');
    expect(wrapped.find('input.add-item__time').prop('value')).toEqual('');
    expect(wrapped.find('input.add-item__city').prop('value')).toEqual('');
    expect(wrapped.find('input.add-item__index').prop('value')).toEqual('');
    expect(wrapped.find('input.add-item__street').prop('value')).toEqual('');
    expect(wrapped.find('input.add-item__house-number').prop('value')).toEqual('');
    expect(wrapped.find('input.add-item__shop-name').prop('value')).toEqual('');
  });
});


// it('', () => {

// });