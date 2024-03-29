import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render, fireEvent, cleanup} from '@testing-library/react'
//import "jest-dom/extend-expect"
import SampleCounter from './SampleCounter'

afterEach(cleanup)

const startingState = {count:0}
function reducer(state = startingState, action){
    switch(action.type){
        case'INCREMENT':
            return {...state, count: state.count +  1}
        case 'DECREMENT':
            return {...state, count: state.count - 1}
        default:
            return state
    }
}

function renderWithRedux(component, {initialState, store = createStore(reducer, initialState)} = {}
){
    return{
        ...render(<Provider store={store}>{component}</Provider>)
    }
}
it("renders with redux",()=>{
    const {getByTestId}= renderWithRedux(<SampleCounter/>)
    expect(getByTestId('count')).toHaveTextContent("0")
})

it('can increment', ()=>{
    const {getByTestId, getByText} = renderWithRedux(<SampleCounter/>)
    fireEvent.click(getByText("+"))
    expect(getByTestId("count")).toHaveTextContent("1")
})

it('can decrement', ()=>{
    const {getByTestId, getByText} = renderWithRedux(<SampleCounter/>)
    fireEvent.click(getByText("-"))
    expect(getByTestId("count")).toHaveTextContent("-1")
})

it('can have initial state', ()=>{
    const {getByTestId}= renderWithRedux(<SampleCounter/>, {
    initialState: {count: 5}
    })
    expect(getByTestId("count")).toHaveTextContent("5")
})

it('can have custom store', ()=>{
    const store = createStore(()=> ({ count: 30}))
    const {getByTestId}= renderWithRedux(<SampleCounter/>, {store})
    expect(getByTestId("count")).toHaveTextContent("30")
})

