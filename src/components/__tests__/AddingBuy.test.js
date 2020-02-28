import React from 'react';
import { mount, unmount } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import AddingBuy from 'components/AddingBuy/AddingBuy';



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

        wrapped.find('ul li TextField.adding-list__name').simulate('change', {
            target: {
                value: 'Minerallwasser'
            }
        });
        // wrapped.find('TextField.adding-list__weight-amount').simulate('change', {
        //     target: {
        //         value: '1.6'
        //     }
        // });

        wrapped.update();
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it('refreshes the name input properly on changing the value', () => {
        expect(wrapped.find('TextField.adding-list__name').prop('value')).toEqual('Minerallwasser');
    });
    // it('refreshes the weight-amount input properly on changing the value', () => {
    //     const weightAmount = wrapped.find('TextField.adding-list__weight-amount');

    //     expect(weightAmount.prop('value')).toEqual('1.7');
    // });
});

describe('AddingBuy\'s multiple buy items', () => {
    let wrapped = null;

    beforeEach(() => {
        wrapped = mount(<AddingBuy />);

        wrapped.find('TextField.adding-list__name').simulate('change', {
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

    it('checks for the existance of the added second item', () => {
        const items = wrapped.find('li.adding-list__item');

        expect(items.length).toEqual(2);
    });

    it('checks that the 1st item\'s name remained the same on creating of a new buy; changes value of a new created buy', () => {
        const items = wrapped.find('li.adding-list__item .adding-list__name');
        const nameInput_0 = items.at(0);
        const nameInput_1 = items.at(1);
        const removeBtn_0 = wrapped.find('li.adding-list__item .adding-list__btn-remove').at(0);

        nameInput_1.simulate('change', {
            target: {
                value: 'Quark'
            }
        });

        wrapped.update();
        // toHaveProp('title', 'Good-bye')

        expect(nameInput_0.prop('value')).toEqual('Orangensaft');
        expect(wrapped.find('li.adding-list__item .adding-list__name').at(1).prop('value')).toEqual('Quark');

        removeBtn_0.simulate('click');

        expect(wrapped.find('li.adding-list__item').length).toEqual(1);
        expect(wrapped.find('li.adding-list__item .adding-list__name').prop('value')).toEqual('Quark');
    });
});