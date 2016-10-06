import React from 'react'
import './Products.scss'
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

const iconStyles = {
  marginRight: 24
}

export const Products = (props) => (
  <div className='products-container'>
    <h2>Looks & Calibrated Data</h2>
    <p>This data is served from S3 to each Regionalised App</p>
    <p>Products <a href={props.products.pendingUploadFiles.products.onlineLink}>JSON </a>
      last updated on: {props.products.pendingUploadFiles.products.lastUpdated}</p>
    <p>Looks <a href={props.products.pendingUploadFiles.looks.onlineLink}>JSON </a>
      last updated on: {props.products.pendingUploadFiles.looks.lastUpdated}</p>
    <p><strong>Warning: </strong> Please make sure you are modifying the right region</p>
    <div className='products-dropzones'>
      <div className='products-dropzone'>
        <Dropzone multiple={false} onDrop={props.onProductsFileDrop} className='products-dropzone-inner'>
          <div className='products-dropzone-inner-content'>
            <p><strong>Step 1</strong></p>
            <p>{props.products.pendingUploadFiles.products.message}</p>
            <div>
              <i className='material-icons'>{props.products.pendingUploadFiles.products.isValid ? 'done' : 'close'}</i>
            </div>
          </div>
        </Dropzone>
        <FlatButton label='Upload' primary
          disabled={props.products.pendingUploadFiles.products.isValid ? false : true} />
      </div>
      <div className='products-dropzone'>
        <Dropzone multiple={false} onDrop={props.onLooksFileDrop} className='products-dropzone-inner'>
          <div className='products-dropzone-inner-content'>
            <p><strong>Step 2</strong></p>
            <p>{props.products.pendingUploadFiles.looks.message}</p>
            <div>
              <i className='material-icons'>{props.products.pendingUploadFiles.looks.isValid ? 'done' : 'close'}</i>
            </div>
          </div>
        </Dropzone>
        <FlatButton label='Upload' primary
          disabled={props.products.pendingUploadFiles.looks.isValid ? false : true} />
      </div>
      <div className='products-dropzone'>
        <Dropzone multiple={false} onDrop={props.onImagesZipFileDrop} className='products-dropzone-inner'>
          <div className='products-dropzone-inner-content'>
            <p><strong>Step 3</strong></p>
            <p>{props.products.pendingUploadFiles.images.message}</p>
            <div>
              <i className='material-icons'>{props.products.pendingUploadFiles.images.isValid ? 'done' : 'close'}</i>
            </div>
          </div>
        </Dropzone>
        <FlatButton label='Upload' primary
          disabled={props.products.pendingUploadFiles.images.isValid ? false : true} />
      </div>
    </div>
    <div className='products-debug-output'>
      <ul>
        {props.products.checking.debugMessages.map((r, i) => <li>{r}</li>) }
      </ul>
    </div>
  </div>
)

Products.propTypes = {
  products: React.PropTypes.object.isRequired,
  onProductsFileDrop: React.PropTypes.func.isRequired,
  onLooksFileDrop: React.PropTypes.func.isRequired,
  onImagesZipFileDrop: React.PropTypes.func.isRequired
}

export default Products
