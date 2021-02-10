import React from 'react';
import { formatPrice } from '../../helpers';

class Fish extends React.Component {
  addFishToCart = (event) => {
    // console.log('addFishToCart event', event);
    // console.log('addFishToCart event.target', event.target);
  };
  render() {
    const index = this.props.index;
    const { name, image, desc, price, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        {/* <p>{JSON.stringify(this.props.details, null, 4)}</p> */}
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name} <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(index)}
        >
          {isAvailable ? 'Add To Cart' : 'Sold Out'}
        </button>
        {/* <p>props {JSON.stringify(this.props, null, 4)}</p> */}
      </li>
    );
  }
}
export default Fish;
