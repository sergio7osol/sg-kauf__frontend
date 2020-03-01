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
        const name = wrapped.find('ul li TextField.adding-list__name');
        // const weightAmount = li.find('TextField.adding-list__weight-amount');
        const submitBtn = wrapped.find('button.adding-list__submit');

        expect(wrapper.length).toEqual(1);
        expect(ul.length).toEqual(1);
        expect(li.length).toEqual(1);
        expect(removeBtn.length).toEqual(1);
        expect(removeIcon.length).toEqual(1);
        expect(name.length).toEqual(1);
        // expect(weightAmount.length).toEqual(1);
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

        wrapped.find('button.adding-list__submit').simulate('click');

        wrapped.update();
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it('checks for the existance of the added second item; checks that the 1st item\'s name remained the same;', () => {
        const items = wrapped.find('ul li.adding-list__item TextField.adding-list__name');

        const nameTextField_0 = items.at(0);

        expect(items.length).toEqual(2);
        expect(nameTextField_0.prop('value')).toEqual('Orangensaft');
    });

    it('changes value of a new created buy; removes the 0-indexed item - value of the second item remains the same', () => {
        let items = wrapped.find('ul li.adding-list__item TextField.adding-list__name')
        let nameTextField_1 = items.at(1);
        const removeBtn_0 = wrapped.find('li.adding-list__item .adding-list__btn-remove').at(0);

        nameTextField_1.props()
            .onChange({
                target: {
                    value: 'Quark'
                }
            });

        wrapped.update();
        // toHaveProp('title', 'Good-bye')

        items = wrapped.find('ul li.adding-list__item TextField.adding-list__name')
        nameTextField_1 = items.at(1);

        expect(nameTextField_1.prop('value')).toEqual('Quark');
        // expect(wrapped.find('li.adding-list__item .adding-list__name').at(1).prop('value')).toEqual('Quark1');

        removeBtn_0.simulate('click');

        expect(wrapped.find('li.adding-list__item').length).toEqual(1);
        expect(wrapped.find('li.adding-list__item .adding-list__name').at(0).prop('value')).toEqual('Quark');
    });
});