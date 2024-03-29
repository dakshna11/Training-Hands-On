import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react-native';
import configureStore from '../SampleReduxTodo/store';
import TodoList from '../SampleReduxTodo/components/todoList'

describe('TodoList component test', () => {
  test('it should execute with a store with 4 elements', () => {
    const initialState = {
      todos: [
        { id: 1, text: 'Sing something', date: new Date() },
        { id: 2, text: 'Dance something', date: new Date() },
        { id: 3, text: 'Do something', date: new Date() },
        { id: 4, text: 'Tell something', date: new Date() },
      ],
    };
    const store = configureStore(initialState);

    const component = (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const { getAllByText } = render(component);
    const todoElems = getAllByText(/something/i);

    expect(todoElems.length).toEqual(4);
  });

  test('should execute with 2 elements and end up with 1 after delete', () => {
    const initialState = {
      todos: [
        { id: 1, text: 'Sing something', date: new Date() },
        { id: 2, text: 'Dance something', date: new Date() },
      ],
    };
    const store = configureStore(initialState);

    const component = (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const { getAllByText } = render(component);
    const todoElems = getAllByText(/something/i);

    expect(todoElems.length).toBe(2);

    const buttons = getAllByText('Delete');
    expect(buttons.length).toBe(2);

    fireEvent.press(buttons[0]);
    expect(getAllByText('Delete').length).toBe(1);
  });
});