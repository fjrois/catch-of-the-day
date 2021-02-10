// import Order from './catchOfTheDay/Order';
import CatchOfTheDay from './CatchOfTheDay';
import Playground from './Playground';
import Toggle from './Toggle';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCatchOn: true,
      isPlaygroundOn: false,
    };
    this.handleToggleChange = this.handleToggleChange.bind(this);
    console.log('App params:', this.props.match.params);
  }
  goHome = () => {
    this.props.history.push('/');
  };

  handleToggleChange(event) {
    const target = event.target;
    const toggleName = target?.name;

    console.log('handleToggleChange toggleName:', toggleName);
    console.log('handleToggleChange target:', target);

    if (toggleName) {
      const propertyName = `is${toggleName[0].toUpperCase()}${toggleName.substring(
        1
      )}On`;
      const newValue = !this.state[propertyName];
      console.log('handleToggleChange propertyName:', propertyName);
      console.log('handleToggleChange newValue:', newValue);
      this.setState({ [propertyName]: newValue });
    }
  }
  render() {
    const params = this.props.match.params;
    const { storeId } = params;
    return (
      <>
        <div>
          <button onClick={this.goHome}>HOME</button>
        </div>
        <div>
          <h1>Store id: {storeId}</h1>
        </div>
        <div>
          <Toggle
            name="catch"
            value={this.state.isCatchOn}
            handleChange={this.handleToggleChange}
          />
        </div>
        <div>
          <Toggle
            name="playground"
            value={this.state.isPlaygroundOn}
            handleChange={this.handleToggleChange}
          />
        </div>
        {this.state.isCatchOn ? <CatchOfTheDay storeId={storeId} /> : ''}
        {this.state.isPlaygroundOn ? <Playground /> : ''}
      </>
    );
  }
}

export default App;
