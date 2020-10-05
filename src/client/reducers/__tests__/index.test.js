import mainReducer from '../index'

describe('Main Reducer', () => {
  test('it should return the state if given a non-existant type', () => {
    const action = {
      type: 'GARBAGE',
      payload: {
        justNothing: null,
      }
    }
    const state = { someStuff: 'stuff' };
    const newState = mainReducer(state, action);
    expect(newState).toEqual(state);
  });

  test('it should return an updated state combined with the given payload', () => {
    const action = {
      type: 'NEXT_QUESTION',
      payload: {
        numStr: '123',
        someNum: 1234,
      }
    }
    const state = { someStuff: 'stuff' };
    const newState = mainReducer(state, action);

    expect(newState).toHaveProperty('someStuff', 'stuff');
    expect(newState).toHaveProperty('numStr', '123');
    expect(newState).toHaveProperty('someNum', 1234);
    expect(newState).toHaveProperty('currentAnswer', "");
  });

  test('it should return an updated state combined with the given payload', () => {
    const action = {
      type: 'RESTART_QUIZ',
      payload: {
        numStr: '567',
        someNum: 18391,
      }
    }
    const state = { moreStuff: 'more-stuff' };
    const newState = mainReducer(state, action);

    expect(newState).toHaveProperty('moreStuff', 'more-stuff');
    expect(newState).toHaveProperty('numStr', '567');
    expect(newState).toHaveProperty('someNum', 18391);
  });


})
