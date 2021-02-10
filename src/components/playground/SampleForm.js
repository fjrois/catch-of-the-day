import React from 'react';

class SampleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      textareaValue: '',
      selectValue: 'spanish',
      isGoing: false,
      guestsNumber: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTexareaChange = this.handleTexareaChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChangeGeneric = this.handleInputChangeGeneric.bind(this);
  }

  handleInputChange(event) {
    console.log('handleInputChange event:', event);
    console.log('handleInputChange event.target:', event.target);
    console.log('handleInputChange event.target.value:', event.target.value);
    console.log('handleInputChange event.target.type:', event.target.type);
    this.setState({ inputValue: event.target.value });
  }
  handleTexareaChange(event) {
    console.log('handleTexareaChange event:', event);
    console.log('handleTexareaChange event.target:', event.target);
    console.log('handleTexareaChange event.target.value:', event.target.value);
    this.setState({ textareaValue: event.target.value });
  }
  handleSelectChange(event) {
    console.log('handleSelectChange event:', event);
    console.log('handleSelectChange event.target:', event.target);
    console.log('handleSelectChange event.target.value:', event.target.value);
    this.setState({ selectValue: event.target.value });
  }
  handleFormSubmit(event) {
    console.log('handleFormSubmit event:', event);
    console.log('handleFormSubmit event.target:', event.target);
    const alertText = `Form has been submitted\n${JSON.stringify(
      this.state,
      null,
      4
    )}`;
    alert(alertText);
    event.preventDefault();
    this.clearForm();
  }
  handleInputChangeGeneric(event) {
    console.log('handleInputChangeGeneric event:', event);
    console.log('handleInputChangeGeneric event.target:', event.target);
    const statePropertyName = event.target.name;
    const newValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    console.log(
      'handleInputChangeGeneric statePropertyName:',
      statePropertyName
    );
    console.log('handleInputChangeGeneric newValue:', newValue);
    this.setState({ [statePropertyName]: newValue });
  }
  clearForm() {
    this.setState({ inputValue: '', textareaValue: '' });
  }
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
          Name
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          ></input>
        </label>
        <br />
        <label>
          Description
          <textarea
            value={this.state.textareaValue}
            onChange={this.handleTexareaChange}
          ></textarea>
        </label>
        <br />
        <label>
          Preferred Language
          <select
            // value={this.state.selectValue}
            onChange={this.handleSelectChange}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
          </select>
        </label>
        <br />
        <br />
        <hr />
        <br />

        <label>
          Is going:
          <input
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChangeGeneric}
            name="isGoing"
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            type="number"
            value={this.state.guestsNumber}
            onChange={this.handleInputChangeGeneric}
            name="guestsNumber"
          />
        </label>
        <br />
        <button type="submit">DONE</button>
      </form>
    );
  }
}

export default SampleForm;
