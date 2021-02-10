import React from 'react';

// const elemento = <p>Aqui va el relojsss</p>;
// function Clock(props) {
//   return elemento;
// }

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: null, count: 0, intervalId: null };
  }
  tick() {
    const newDate = new Date();
    const newTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    this.setState({ time: newTime });

    // To rely on and update current state and/or props
    this.setState((state, props) => ({
      count: state.count + 1,
    }));
  }
  componentDidMount() {
    const newIntervalId = setInterval(() => this.tick(), 1000);
    this.setState({ intervalId: newIntervalId });
  }
  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }
  render() {
    return (
      <p>
        {this.state.intervalId}. {this.state.time} (count: {this.state.count})
      </p>
    );
  }
}

export default Clock;
