import superagent from 'superagent';

const parkFetch = park => ({
  type: 'PARK_FETCH',
  payload: park,

});

const parkCreate = park => ({
  type: 'PARK_CREATE',
  payload: park,

});
const parkUpdate = park => ({
  type: 'PARK_UPDATE',
  payload: park,

});
const parkDelete = park => ({
  type: 'PARK_DELETE',
  payload: park,

});

// async functions:

const parkFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/parks`) // this will be the url to your own backend api
    .then((response) => {
      // you could do client side filtering here, but ideally you would filter out server side via query string ex lists?limit=10 or something
      dispatch(parkFetch(response.body));
      return response;
    });
  // no need catch because of our front-end middleware with the try/catch
};

const parkCreateRequest = park => (dispatch) => {
  // this signature is required for the redux thunk to work!
  return superagent.post(`${API_URL}/api/parks`)
    .send(park)
    .then((response) => {
      dispatch(parkCreate(response.body));
      return response;
    });
};
const parkDeleteRequest = park => (dispatch) => {
  // this signature is required for the redux thunk to work!
  return superagent.delete(`${API_URL}/api/parks/${park._id}`)
    .then((response) => {
      dispatch(parkDelete(park));// dont get a return via the superagent delete
      return response;
    });
};
const parkUpdateRequest = park => (dispatch) => {
  return superagent.put(`${API_URL}/api/parks/${park._id}`)
    .send(park)
    .then((response) => {
      dispatch(parkUpdate(park));
      return response;
    });
  
};

export { parkFetchRequest, parkCreateRequest, parkDeleteRequest, parkUpdateRequest };
