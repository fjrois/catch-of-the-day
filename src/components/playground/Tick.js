import React from 'react';

class Tick extends React.Component {
  render() {
    return (
      <p>
        Timer here: {new Date().toString()} {this.props.input}
      </p>
    );
  }
}

export default Tick;
