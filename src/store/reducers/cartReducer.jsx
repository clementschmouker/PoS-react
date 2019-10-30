function cartReducer(state = initialState, action) {
  let nextState = {
    ...state,
  };

  switch(action.type) {
    case 'ADD_TO_CART':
      return nextState;

    case 'REMOVE_FROM_CART':
      return nextState;

    default:
      return state;
  }
}
