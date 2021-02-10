import React from 'react';

class Toggle extends React.Component {
  // constructor(props) {
  // super(props);
  // this.state = {
  //   isToggleOn: false,
  // };
  // this.handleChange = this.handleChange.bind(this);
  // }
  // handleChange() {
  //   this.setState((state, props) => ({ isToggleOn: !state.isToggleOn }));
  // }
  render() {
    const label = this.props.name + ': ' || '';
    const value = this.props.value || false;
    const backgroundColor = 'white';
    const fontColor = value ? 'green' : 'red';
    return (
      <>
        <button
          onClick={this.props.handleChange}
          name={this.props.name}
          style={{ backgroundColor, color: fontColor }}
        >
          {/* <button onClick={() => this.handleChange()}> */}
          {/* {label + (this.state.isToggleOn ? 'ON' : 'OFF')} */}
          {label + (value ? 'ON' : 'OFF')}
        </button>
      </>
    );
  }
}

export default Toggle;
