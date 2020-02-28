import React from 'react';
import { shallow } from 'enzyme';
import AddAndDisplayItems from 'components/AddAndDisplayItems/AddAndDisplayItems';
import AddItem from 'components/AddItem/AddItem';
import List from 'components/List/List';

let wrapped = null;

beforeEach(() => {
  wrapped = shallow(<AddAndDisplayItems />);
});

it('shows an AddItem component', () => {
  expect(wrapped.find(AddItem).length).toEqual(1);
});

it('shows a List component', () => {
  expect(wrapped.find(List).length).toEqual(1);
});
