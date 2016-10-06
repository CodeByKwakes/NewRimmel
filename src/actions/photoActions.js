import * as types from './actionTypes';
import axios from 'axios';
import _ from 'lodash';

// ------------------------------------
// Sorting actions
// ------------------------------------
export const sortingActions = [{
    id: 0,
    name: "Date",
    sort: function(list, asc){
      console.log(asc);

      var newArr = _.sortBy(list,  function(value) {
        return new Date(value.created);
      });

      //if(asc === false){
        newArr = newArr.reverse();
      //}

      return newArr;
    }
  },{
    id: 1,
    name: "Name",
    sort: function(list, asc){
      console.log(asc);

      var newArr = _.sortBy(list, function(value) {
        return value.name;
      });

      //if(asc === false){
       // newArr = newArr.reverse();
      //}

      return newArr;
    }
  },{
    id: 2,
    name: "Votes",
    sort: function(list, asc){
      console.log(asc);

      var newArr = _.sortBy(list, 'votes', 'asc');

      //if(asc === false){
        newArr = newArr.reverse();
     // }

     // console.log(newArr);

      return newArr;
    }
  }];

// ------------------------------------
// Actions
// ------------------------------------
export function clearLooks(region = 0) {
  return {
    type: types.CLEAR_LOOKS,
    region: region
  }
}

export function requestLooks(region = 0) {
  return {
    type: types.REQUEST_LOOKS,
    region: region
  }
}

export function recieveLooks(region = 0, json) {
  return {
    type: types.RECEIVE_LOOKS,
    region: region,
    feed: json,
    receivedAt: Date.now()
  }
}

const RIMMEL_CMS = types.RIMMEL_CMS;
export function fetchLooks(region = 0) {
  // console.log(region);
  return dispatch => {
    dispatch(requestLooks(region))
    return fetch(`${RIMMEL_CMS}region/${region}/looks`)
      .then(response => response.json())
      .then(json => dispatch(recieveLooks(region, json)))
  }
}

export function onLookDownvoted(lookId) {
  console.log('onLookUpvoted(' + lookId + ')');
  return dispatch => {
    axios.post(`${RIMMEL_CMS}downvote/` + lookId, {params: {}})
      .then(json => dispatch(fetchLooks(0)))
  }
}

export function onLookUpvoted(lookId) {
  console.log('onLookUpvoted(' + lookId + ')');
  return dispatch => {
    axios.post(`${RIMMEL_CMS}vote/` + lookId, {params: {}})
      .then(dispatch(fetchLooks(0)))
  }
}

export function onLookDeleted(lookId) {
  console.log('onLookDeleted(' + lookId + ')');
  return dispatch => {
    axios.get(`${RIMMEL_CMS}look/delete/` + lookId, {params: {}})
      .then(response => response.data)
      .then(json => dispatch(fetchLooks(0)))
  }
}

export function onFeedSortActionValueChange(event, index, value) {
  console.log('onFeedSortActionValueChange', value);
  return {
    currentActionId: value,
    type: types.SORT_LOOKS
  }
}

export function onFeedSortOrderByValueChange(event, index, value) {
  console.log('onFeedSortOrderByValueChange', value);
  return {
    orderAsc: value,
    type: types.SORT_LOOKS_ORDER
  }
}

export const actions = {
  requestLooks,
  recieveLooks,
  fetchLooks,
  clearLooks,
  onFeedSortActionValueChange,
  onFeedSortOrderByValueChange,
  onLookDownvoted,
  onLookUpvoted,
  onLookDeleted
}

export function sortMe(state){
  let s = null, newFeed = [];
  for(let i = 0; i < state.sorting.actions.length; i++){
    if(state.sorting.currentActionId === state.sorting.actions[i].id){
      s = state.sorting.actions[i];
      break;
    }
  }

  console.log(s);
  if(s != null){
    newFeed = s.sort(state.feed, state.sorting.orderAsc);
  }else{
    console.log('Sort not found: ', state);
  }

  return newFeed;
}
