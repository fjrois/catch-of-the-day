import { formatPrice } from '../../helpers';
import React from 'react';

class Order extends React.Component {
  renderOrderItem = (fishId) => {
    const fishDetails = this.props.fishes[fishId];
    const orderCount = this.props.order[fishId];
    const isAvailable =
      fishDetails && fishDetails.price && fishDetails.status === 'available';

    if (!fishDetails) return null;

    if (isAvailable) {
      return (
        <li key={fishId}>
          {isAvailable}
          {orderCount}lbs of {fishDetails.name}{' '}
          {formatPrice(orderCount * fishDetails.price)}
          <button onClick={() => this.props.removeFromOrder(fishId)}>
            &times;
          </button>
        </li>
      );
    } else {
      return (
        <li key={fishId}>
          Sorry, {fishDetails ? fishDetails.name : ' this fish '} is not
          available anymore
        </li>
      );
    }
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((subtotal, fishId) => {
      const fishDetails = this.props.fishes[fishId];
      const orderCount = this.props.order[fishId];
      const isAvailable =
        fishDetails && fishDetails.price && fishDetails.status === 'available';

      let result = subtotal;
      if (isAvailable) {
        result += fishDetails.price * orderCount;
      }
      return result;
    }, 0);

    return (
      <>
        <div className="order-wrap">
          <h2>Order</h2>
          <ul className="order">
            {Object.keys(this.props.order).map(this.renderOrderItem)}
          </ul>
          {/* {JSON.stringify(this.props.order, null, 4)} */}
          <div className="total">
            Total: <strong>{formatPrice(total)}</strong>
          </div>
        </div>
      </>
    );
  }
}

export default Order;
