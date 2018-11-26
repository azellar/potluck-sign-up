import React, { Component } from "react";

class Item extends Component {
  render() {
    const {
      item: { key, description, dishType, name, otherInfo }
    } = this.props;

    return (
      <div key={key}>
        <p>{`name: ${name}, desc: ${description}, dish type: ${dishType}, additional info: ${otherInfo}`}</p>
        <button onClick={() => this.props.deleteItem(key)}>Delete</button>
      </div>
    );
  }
}

export default Item;
