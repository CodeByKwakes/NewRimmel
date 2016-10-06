import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../../actions/productActions';
import Products from './Products'
import {browserHistory} from 'react-router';

class ProductsPage extends React.Component {
    render() {
      const { products } = this.props;
        return (
            <div>
                <h1>Products</h1>
                <Products products={products} />
            </div>
        );
    }
}

ProductsPage.propTypes = {
  products: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
