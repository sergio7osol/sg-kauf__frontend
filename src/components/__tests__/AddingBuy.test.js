import React from 'react';
import { mount, unmount } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import AddingBuy from 'components/AddingBuy/AddingBuy';

// TODO: check for input values, not state values;

describe('AddingBuy\'s input controls\' existance', () => {
    let wrapped = null;

    beforeEach(() => {
        wrapped = mount(<AddingBuy />);
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it('has a wrapper element, time inputs and a button', () => {
        const wrapper = wrapped.find('.adding-list');
        const ul = wrapper.find('ul');
        const li = wrapped.find('.adding-list__item');
        const removeBtn = li.find(Button);
        const removeIcon = removeBtn.find(RemoveShoppingCartRoundedIcon);
        const name = li.find('TextField.adding-list__name');
        const weightAmount = li.find('TextField.adding-list__weight-amount');
        const measure = li.find('TextField.adding-list__measure');
        const submitBtn = wrapped.find('button.adding-list__submit');

        expect(wrapper.length).toEqual(1);
        expect(ul.length).toEqual(1);
        expect(li.length).toEqual(1);
        expect(removeBtn.length).toEqual(1);
        expect(removeIcon.length).toEqual(1);
        expect(name.length).toEqual(1);
        expect(weightAmount.length).toEqual(1);
        expect(measure.length).toEqual(1);
        expect(submitBtn.length).toEqual(1);
    });
});

describe('AddingBuy\'s single buy item', () => {
    let wrapped = null;

    beforeEach(() => {
        wrapped = mount(<AddingBuy />);

        wrapped.find('ul li TextField.adding-list__name')
            .props()
            .onChange({
                target: {
                    value: 'Minerallwasser'
                } 
            });

        wrapped.find('ul li TextField.adding-list__weight-amount')
            .props()
            .onChange({
                target: {
                    value: '1.6'
                } 
            });

        wrapped.find('ul li TextField.adding-list__measure')
            .props()
            .onChange({
                target: {
                    value: 'kg'
                }
            });

        wrapped.update();
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it('refreshes the name input properly on changing the value', () => {
        expect(wrapped.find('TextField.adding-list__name').prop('value')).toEqual('Minerallwasser');
    });
    it('refreshes the weight-amount input properly on changing the value', () => {
        expect(wrapped.find('TextField.adding-list__weight-amount').prop('value')).toEqual('1.6');
    });
    it('refreshes the measure select properly on changing the value', () => {
        expect(wrapped.find('TextField.adding-list__measure').prop('value')).toEqual('kg');
    });
});

describe('AddingBuy\'s multiple buy items', () => {
    let wrapped = null;

    beforeEach(() => {
        wrapped = mount(<AddingBuy />);

        wrapped.find('ul li TextField.adding-list__name')
            .props()
            .onChange({
                target: {
                    value: 'Orangensaft'
                } 
            });
        wrapped.find('ul li TextField.adding-list__weight-amount')
            .props()
            .onChange({
                target: {
                    value: '5.4'
                }
            });

        wrapped.find('ul li TextField.adding-list__measure')
            .props()
            .onChange({
                target: {
                    value: 'kg'
                }
            });

        wrapped.find('button.adding-list__submit').simulate('click');

        wrapped.update();
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it('checks for the existance of the added second item; checks that the 1st item\'s control fields remained the same;', () => {
        const nameTextFields = wrapped.find('ul li.adding-list__item TextField.adding-list__name');
        const weightAmountTextFields = wrapped.find('ul li.adding-list__item TextField.adding-list__weight-amount');
        const measureSelects = wrapped.find('ul li.adding-list__item TextField.adding-list__measure');

        const nameTextField_0 = nameTextFields.at(0);
        const weightAmountTextField_0 = weightAmountTextFields.at(0);
        const measureSelect_0 = measureSelects.at(0);

        expect(nameTextFields.length).toEqual(2);
        expect(weightAmountTextFields.length).toEqual(2);
        expect(measureSelects.length).toEqual(2);

        expect(nameTextField_0.prop('value')).toEqual('Orangensaft');
        expect(weightAmountTextField_0.prop('value')).toEqual('5.4');
        expect(measureSelect_0.prop('value')).toEqual('kg');
    });

    it('changes value of a new created buy; removes the 0-indexed item - controls\' values of the second item remains the same', () => {
        const nameTextFields = wrapped.find('ul li.adding-list__item TextField.adding-list__name');
        const weightAmountTextFields = wrapped.find('ul li.adding-list__item TextField.adding-list__weight-amount');
        const measureSelects = wrapped.find('ul li.adding-list__item TextField.adding-list__measure');

        let nameTextField_1 = nameTextFields.at(1);
        let weightAmountTextField_1 = weightAmountTextFields.at(1);
        let measureSelect_1 = measureSelects.at(1);

        const removeBtn_0 = wrapped.find('li.adding-list__item .adding-list__btn-remove').at(0);

        nameTextField_1
            .props()
            .onChange({
                target: {
                    value: 'Quark'
                }
            });
        weightAmountTextField_1
            .props()
            .onChange({
                target: {
                    value: '8.1'
                }
            });
        measureSelect_1
            .props()
            .onChange({
                target: {
                    value: 'kg'
                }
            });

        wrapped.update();
        
        nameTextField_1 = wrapped.find('ul li.adding-list__item TextField.adding-list__name').at(1);
        weightAmountTextField_1 = wrapped.find('ul li.adding-list__item TextField.adding-list__weight-amount').at(1);
        measureSelect_1 = wrapped.find('ul li.adding-list__item TextField.adding-list__measure').at(1);
        
        expect(nameTextField_1.prop('value')).toEqual('Quark');
        expect(weightAmountTextField_1.prop('value')).toEqual('8.1');
        expect(measureSelect_1.prop('value')).toEqual('kg');
        
        removeBtn_0.simulate('click');
        
        wrapped.update();
        
        nameTextField_1 = wrapped.find('ul li.adding-list__item TextField.adding-list__name');
        weightAmountTextField_1 = wrapped.find('ul li.adding-list__item TextField.adding-list__weight-amount');
        measureSelect_1 = wrapped.find('ul li.adding-list__item TextField.adding-list__measure');

        expect(wrapped.find('li.adding-list__item').length).toEqual(1);
        expect(nameTextField_1.at(0).prop('value')).toEqual('Quark');
        expect(weightAmountTextField_1.at(0).prop('value')).toEqual('8.1');
        expect(measureSelect_1.at(0).prop('value')).toEqual('kg');
    });
});