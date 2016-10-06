import * as types from './actionTypes';
import { readAsText } from 'promise-file-reader';

export function onProductsFileDrop(files) {
  return readJSONFile(files[0], 'Products', 'JSON', types.PRODUCTS_JSON_VALID_CHECK);
}

export function onLooksFileDrop(files) {
  return readJSONFile(files[0], 'Looks', 'JSON', types.LOOKS_JSON_VALID_CHECK);
}

export function onImagesZipFileDrop(files) {
  console.log(files)
  // postFiles(files, LOOKS_POST_FILE_URL)
  return onUpdated;
}

export function readJSONFile(file, fileName, fileType, type) {
  console.log(file);

  var isValid = false
  var message = `Please drag & drop the ${fileName} ${fileType} file here`;

  if (file) {
    return dispatch => {
      return readAsText(file)
        .then(content => dispatch(checkJSONFile(content, file, fileName, fileType, type)));
    };
  } else {
    return {
      type: type,
      isValid: isValid,
      message: message,
      file: file
    }
  }
}

export function checkJSONFile(content, file, fileName, fileType, type) {
  var isValid = false
  var message = `Please drag & drop the ${fileName} ${fileType} file here`
  var parsedContent = []

  try {
    parsedContent = JSON.parse(content)
    isValid = true
    message = `Valid ${fileName} ${fileType} file, drag and drop to update`
  } catch (e) {
    message = `Invalid ${fileType}: ${e.name} - ${e.message}`;
  }

  return {
    type: type,
    isValid: isValid,
    message: message,
    file: file,
    content: content,
    parsedContent: parsedContent
  };
}

export function onUpdated() {
  var rightNow = new Date();
  var res = rightNow.toISOString().slice(0, 10).replace(/-/g, '');

  return {
    type: types.PRODUCT_JSON_LAST_UPDATED,
    lastUpdated: res
  };
}

export function gatherDebugInfo(state) {
  var arr = [];

  arr.push(state.products.content.length);

  return arr;
}

export const actions = {
  onProductsFileDrop,
  onLooksFileDrop
};
