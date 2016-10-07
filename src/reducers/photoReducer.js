import * as types from '../actions/actionTypes';
import {sortingActions, sortMe} from '../actions/photoActions'

//------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [types.REQUEST_LOOKS]: function(state, action){
    return Object.assign({}, state, { fetching: true });
  },
  [types.SORT_LOOKS]: function(state, action){
    let c = state.feedUpdateCounter + 1;
    console.log(c);
    let newState = Object.assign({}, state, {
      feedUpdateCounter: c,
      sorting: {
      actions: sortingActions,
      currentActionId: action.currentActionId,
      orderAsc: state.orderAsc,
    }});
    newState.feed = sortMe(newState);
    return newState;
  },
  [types.SORT_LOOKS_ORDER]: function(state, action){
    let c = state.feedUpdateCounter + 1;
    console.log(c);
    return Object.assign({}, state, { feedUpdateCounter: c })
  },
  [types.CLEAR_LOOKS]: function(state, action){
    let c = state.feedUpdateCounter + 1;
    console.log(c);
    return Object.assign({}, state, { feed: [], feedUpdateCounter: c })
  },
  [types.RECEIVE_LOOKS]: function(state, action){
    let c = state.feedUpdateCounter + 1;
    console.log(c);
    let newState = Object.assign({}, state, {
      feed:  action.feed,
      region: action.region,
      fetching: false,
      receivedAt: action.receivedAt,
      feedUpdateCounter: c
    });
    newState.feed = sortMe(newState);
    return newState;
  },
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  fetching: false,
  feed: [],
  region: -1,
  receivedAt: -1,
  feedId: 0,
  feedUpdateCounter: 0,
  sorting: {
    actions: sortingActions,
    currentActionId: 0,
    orderAsc: false
  }
};

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
