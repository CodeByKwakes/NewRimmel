import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import products from './productReducer';
import photos from './photoReducer';
import reddits from './redditReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
 /* products,*/
  photos,
  reddits,
  ajaxCallsInProgress
});

export default rootReducer;
