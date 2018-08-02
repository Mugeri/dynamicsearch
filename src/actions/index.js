import friends from '../friends';


export const searchFailure = error => ({
  type: 'SEARCH_FAILURE',
  error,
});

export const searchSuccess = results => ({
  type: 'SEARCH_SUCCESS',
  payload: results,
});

export const searchRequest = searchQuery => ({
  type: 'SEARCH_REQUEST',
  payload: searchQuery,
});

export function search(searchQuery) {
  return (dispatch) => {
    dispatch(searchRequest());

    searchApi(searchQuery)
    .then((results) => {
      dispatch(searchSuccess(results));
    })
    .catch(error => dispatch(searchFailure(error)));
  };
}

// mock api search
export function searchApi(query) {
  const results = friends.filter((friend) => {
    let keep = false;

    Object.keys(friend).forEach((key) => {
      const val = friend[key].toString();

      if (val.toLowerCase().includes(query.toLowerCase())) {
        keep = true;
      }
    });

    return keep;
  });
  // setting a more realistic (random) timeout
  return new Promise((resolve) => {
    setTimeout(() => resolve(results), Math.ceil(Math.random() * 250));
  });
}
