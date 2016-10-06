import * as types from '../actions/actionTypes';
var Promise = require('promise')
var agent = require('superagent-promise')(require('superagent'), Promise)
import {checkJSONFile, onUpdated, gatherDebugInfo} from '../actions/productActions'

const ACTION_HANDLERS = {
  [types.PRODUCT_JSON_LAST_UPDATED]: (state, action) => Object.assign({}, state, { lastUpdated: action.lastUpdated }),
  [types.PRODUCTS_JSON_VALID_CHECK]: function (state, action) {
    console.log(action)
    state.pendingUploadFiles.products.file = action.file
    state.pendingUploadFiles.products.isValid = action.isValid
    state.pendingUploadFiles.products.message = action.message
    state.pendingUploadFiles.products.parsedContent = action.parsedContent

    state.checking.debugMessages = gatherDebugInfo(state)

    return Object.assign({}, state, {})
  },
  [types.LOOKS_JSON_VALID_CHECK]: function (state, action) {
    console.log(action)
    state.pendingUploadFiles.looks.file = action.file
    state.pendingUploadFiles.looks.isValid = action.isValid
    state.pendingUploadFiles.looks.message = action.message
    state.pendingUploadFiles.looks.parsedContent = action.parsedContent

    state.checking.debugMessages = gatherDebugInfo(state)

    return Object.assign({}, state, {})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

function getInitialState() {
  var initialState = {
    pendingUploadFiles: {
      enableRollback: false,
      products: {
        file: null,
        isValid: false,
        lastUpdated: 'N/A',
        message: 'Please drag & drop the Products JSON file here',
        onlineLink: 'http://rimmelcms.holition.com/api/2/region/0/json/calibrated',
        oldFileData: null,
        parsedContent: null
      },
      looks: {
        file: null,
        isValid: false,
        lastUpdated: 'N/A',
        message: 'Please drag & drop the Looks JSON file here',
        onlineLink: 'http://rimmelcms.holition.com/api/2/region/0/json/looks',
        oldFileData: null,
        parsedContent: null
      },
      images: {
        file: null,
        isValid: false,
        message: 'Please drag & drop an ZIP file of product images here'
      }
    },
    checking: {
      debugMessages: []
    }
  }

  return dispatch => {
    agent('GET', 'http://google.com')
    .end()
    .then(function onResult(res) {

    }, function onError() {})
  }
}

export default function productsReducer(state = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
