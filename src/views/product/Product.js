import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Products from '../../redux/modules/products';
import NotFound from '../_errors/NotFound';

const mapStateToProps = (state) => ({
  products: state.products.get('entities').toJS()
});

class Product extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    products: PropTypes.object,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  static fetchData(getState, dispatch, location, params) {
    if (!Products.selectors.isLoaded(getState(), params.id)) {
      return dispatch(Products.actions.load(params.id));
    }
  }

  render() {
    require('./Product.scss');

    const id = parseInt(this.props.params.id);
    const prevId = id - 1;
    const nextId = id + 1;

    if (id < 0 || id >= 100) {
      return (
        <NotFound />
      );
    }

    const product = this.props.products[this.props.params.id];

    return (
      <div className="product-container">
        { prevId >= 0 && 
          <Link to={`/products/${prevId}`} className="prev">Previous</Link>
        }

        { nextId < 100 && 
          <Link to={`/products/${nextId}`} className="next">Next</Link>
        }

        { product && 
          <div className="product-block">
            <h1>{product.product_name}</h1>
            <h2>{product.designer}</h2>
            <img src={`${product.product_image}`} />
            <span className="price">{product.price}</span>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Product);
