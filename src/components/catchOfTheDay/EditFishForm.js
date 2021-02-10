import React from 'react';

class EditFishForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('here', event.target);

    const { name: propertyName, value: newValue } = event.target;
    console.log('propertyName', propertyName);
    console.log('newValue', newValue);

    const newFishDetails = { ...this.props.details };
    newFishDetails[propertyName] = newValue;

    this.props.editFish(this.props.fishId, newFishDetails);
  }

  render() {
    const { name, price, status, desc, image } = this.props.details;
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.handleChange}
        />
        <select name="status" onChange={this.handleChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="notavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={desc}
          onChange={this.handleChange}
        ></textarea>
        <input
          type="text"
          name="image"
          value={image}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.removeFish(this.props.fishId)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
