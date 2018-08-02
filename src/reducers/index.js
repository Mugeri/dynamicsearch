function rootReducer(state, action) {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return Object.assign({}, state, { isLoading: true, searchQuery: action.payload });

    case 'SEARCH_SUCCESS':
      return Object.assign({}, state, { results: action.payload, isLoading: false });

    case 'SEARCH_FAILURE':
      return Object.assign({}, state, { error: action.error, isLoading: false });

    default:
      return state;
  }
}

export default rootReducer;
