export default store => next => (action) => { // can also do parentheses
  typeof action === 'function'
    ? action(store.dispatch, store.getState)// we likely will not use this second state argument can take it out
    : next(action);
};
// our todo-actions are all functions!
// ie action = todoCreateRequest(todo) ie its a function
// then gets invoked with
// todoCreateRequest(todo)(store.dispatch)
// this funciton will actually pass through twice -- first with the function and the superagent call, and then back through again, taking in the dispatch object, and then returning the dispatch  action object, ie dispatch(todoCreate(response.body))-- ie vanilla action object!
