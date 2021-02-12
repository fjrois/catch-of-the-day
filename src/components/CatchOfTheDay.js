import Fish from './catchOfTheDay/Fish';
import Header from './catchOfTheDay/Header';
import Inventory from './catchOfTheDay/Inventory';
import Order from './catchOfTheDay/Order';
import React from 'react';
// import StorePicker from './catchOfTheDay/StorePicker';
import sampleFishes from '../sample-fishes.js';
import base from '../base';

class CatchOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fishes: {}, order: {} };
    this.addFish = this.addFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);
    this.editFish = this.editFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentDidMount() {
    const storeId = this.props.storeId;
    const localStorageRef = localStorage.getItem(storeId);
    console.log('localStorageRef', localStorageRef);
    if (localStorageRef) {
      const order = JSON.parse(localStorageRef);
      this.setState({ order });
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const storeId = this.props.storeId;
    localStorage.setItem(storeId, JSON.stringify(this.state.order));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(newFish) {
    const updatedFishes = { ...this.state.fishes };
    const timestamp = Date.now();
    updatedFishes[`fish${timestamp}`] = newFish;

    this.setState({ fishes: updatedFishes });

    console.log('addFish timestamp', timestamp);
    console.log('addFish newFish', newFish);
  }

  addToOrder(key) {
    console.log('adding to cart one more of', key);
    const updatedOrder = { ...this.state.order };
    if (!updatedOrder[key]) updatedOrder[key] = 0;
    updatedOrder[key] = updatedOrder[key] + 1;

    this.setState({ order: updatedOrder });
  }

  removeFromOrder(key) {
    const updatedOrder = { ...this.state.order };
    delete updatedOrder[key];
    this.setState({ order: updatedOrder });
  }

  loadSampleFishes() {
    this.setState({ fishes: sampleFishes });
  }

  editFish(fishId, newDetails) {
    const updatedFishes = { ...this.fishes };
    updatedFishes[fishId] = newDetails;

    this.setState({ fishes: updatedFishes });
  }

  removeFish(fishId) {
    console.log('removing fish', fishId);
    const updatedFishes = { ...this.state.fishes };

    console.log('removing updatedFishes', updatedFishes);
    // delete updatedFishes[fishId]; // Not valid for firebase integration
    updatedFishes[fishId] = null;
    console.log('removing updatedFishes', updatedFishes);
    this.setState({ fishes: updatedFishes });
    this.removeFromOrder(fishId);
  }

  render() {
    return (
      <>
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh seafood market" />
            <ul className="fishes">
              {Object.keys(this.state.fishes).map((key) => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ))}
            </ul>
          </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            removeFromOrder={this.removeFromOrder}
          />
          <Inventory
            fishes={this.state.fishes}
            addFish={this.addFish}
            loadSampleFishes={this.loadSampleFishes}
            editFish={this.editFish}
            removeFish={this.removeFish}
            storeId={this.props.storeId}
          />
        </div>
      </>
    );
  }
}

export default CatchOfTheDay;
