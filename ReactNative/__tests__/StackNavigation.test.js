import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from '@testing-library/react-native'   

import AppNavigator from '../NavigationTesting/AppNavigator'


jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('testing stack navigation', ()=>{
    test('page contains the header and items',  async ()=>{
        const component = (<AppNavigator/>)
        const {findByText, findAllByText} = render(component)
        const header =  await findByText('List of numbers from 1 to 20')
        const items = await findAllByText(/Item number/)

        expect(header).toBeTruthy()
        expect(items.length).toBe(10)
    })
    test('clicking on one item takes you to the details screen', async () => {
        const component = (<AppNavigator />);
    
        const { findByText } = render(component);
        const toClick = await findByText('Item number 5');
    
        fireEvent(toClick, 'press');
        const newHeader = await findByText('Showing details for 5');
        const newBody = await findByText('the number you have chosen is 5');
    
        expect(newHeader).toBeTruthy();
        expect(newBody).toBeTruthy();
      });
})

