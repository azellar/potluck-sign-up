import React, { Component } from 'react';
import db from '../../Firebase';

import ItemForm from '../ItemForm/ItemForm';
import Item from '../Item/Item';

class Event extends Component {
  refEventDoc = db.collection("Events").doc(this.props.appContext.state.currentEventId);
  refItems = db.collection("Events").doc(this.props.appContext.state.currentEventId).collection("Items");

  state = {
    items: [],
    currentEvent: {}
  };

  onItemsUpdate = querySnapshot => {
    const items = [];
    querySnapshot.forEach(doc => {
      const { name, description, dishType, otherInfo, user } = doc.data();
      items.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description,
        dishType,
        otherInfo,
        user
      });
    });
    console.log(items);
    this.setState({
      items
    });
  };

  componentDidMount() {
    this.subscribeItems = this.refItems.orderBy('name').onSnapshot(this.onItemsUpdate);
    this.refEventDoc.get().then((doc) => {
      const { title, description } = doc.data();
      this.setState({
        currentEvent: {
          title,
          description
        }
      })
    });
  }

  createItem = ({name, description, dishType, otherInfo, user, email}) => {
    // console.log(      name,
    //   description,
    //   dishType,
    //   otherInfo,
    //   user,
    //   email);
    this.refItems.add({
      name,
      description,
      dishType,
      otherInfo,
      user,
      email
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  deleteItem = (itemKey) => {
    this.refItems.doc(itemKey).delete()
    .then(() =>  {
      console.log("Item deleted");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }


  render() {
    const { currentEvent, items } = this.state;
    return (
      <>
        <h2>{currentEvent.title}</h2>
        <ItemForm createItem={this.createItem} />
        <div className="item-list">
          {items.map((item) => {
            return <Item item={item} key={item.key} deleteItem={this.deleteItem} />;
          })}
        </div>
      </>
    );
  }
}

export default Event;