import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import products from './productReducer';
import photos from './photoReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  products,
  photos,
  ajaxCallsInProgress
});

export default rootReducer;
