import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import React from 'react';

class Inventory extends React.Component {
  render() {
    return (
      <>
        <div className="inventory">
          <h2>Inventory</h2>
          {Object.keys(this.props.fishes).map((fishId) => (
            <EditFishForm
              key={fishId}
              fishId={fishId}
              details={this.props.fishes[fishId]}
              editFish={this.props.editFish}
              removeFish={this.props.removeFish}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />

          <button onClick={this.props.loadSampleFishes}>
            Load Sample Fishes
          </button>
        </div>
      </>
    );
  }
}

export default Inventory;
