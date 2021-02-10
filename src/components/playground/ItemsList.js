import React from 'react';

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const listItems = this.props.list.map((item) => (
      <li key={item.toString()}>Number: {item}</li>
    ));
    return <ol>{listItems}</ol>;
  }
}

export default ItemsList;
