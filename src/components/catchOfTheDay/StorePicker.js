import React from 'react';
import { getFunName } from '../../helpers';

class StorePicker extends React.Component {
  constructor(props) {
    super(props);
    const initialStoreId = getFunName();
    this.state = { storeId: initialStoreId, initialStoreId };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const propertyName = target.name;
    const newValue = target.value;
    console.log('handleInputChange target', target);
    console.log('handleInputChange propertyName', propertyName);
    console.log('handleInputChange newValue', newValue);
    if (propertyName && this.state.hasOwnProperty(propertyName)) {
      this.setState({ [propertyName]: newValue });
    }
  }

  goToStore = (event) => {
    event.preventDefault();
    console.log('goToStore event', event);
    console.log('goToStore target', event.target);
    this.props.history.push(`/store/${this.state.storeId}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={this.state.initialStoreId}
          onChange={this.handleInputChange}
          name="storeId"
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
