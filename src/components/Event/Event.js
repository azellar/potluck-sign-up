import React, { Component } from "react";
import db from "../../Firebase";

import ItemForm from "../ItemForm/ItemForm";
import Item from "../Item/Item";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";


const styles = theme =>  ({
  gridContainer: {
    flexGrow: 1
  },
  gridItem: {
    marginBottom: theme.spacing.unit * 4,
    '&:last-child': {
      marginBottom: 0
    }
  }
});

class Event extends Component {
  refEventDoc = db
    .collection("Events")
    .doc(this.props.appContext.state.currentEventId);
  refItems = db
    .collection("Events")
    .doc(this.props.appContext.state.currentEventId)
    .collection("Items");

  state = {
    items: [],
    currentEvent: {}
  };

  onItemsUpdate = querySnapshot => {
    const items = [];
    querySnapshot.forEach(doc => {
      const { name, description, dishType, otherInfo, user, volunteer } = doc.data();
      items.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description,
        dishType,
        otherInfo,
        user,
        volunteer
      });
    });
    console.log(items);
    this.setState({
      items
    });
  };

  componentDidMount() {
    this.subscribeItems = this.refItems
      .orderBy("name")
      .onSnapshot(this.onItemsUpdate);
    this.refEventDoc.get().then(doc => {
      const { title, description } = doc.data();
      this.setState({
        currentEvent: {
          title,
          description
        }
      });
    });
  }

  createItem = ({ name, description, dishType, otherInfo, user, volunteer }) => {

    this.refItems
      .add({
        name,
        description,
        dishType,
        otherInfo,
        user,
        volunteer
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  deleteItem = itemKey => {
    this.refItems
      .doc(itemKey)
      .delete()
      .then(() => {
        console.log("Item deleted");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { currentEvent, items } = this.state;
    const { classes } = this.props;
    return (
      <>
        <h2>{currentEvent.title}</h2>
        <Grid className={classes.gridContainer} container justify="space-evenly" >
          <Grid className={classes.gridItem} item xs={10} sm={5}>
            <ItemForm createItem={this.createItem} />
          </Grid>
          <Grid className={classes.gridItem} container item xs={10} sm={5} spacing={16}>
            {items.map(item => {
              return (
                <Grid item xs={5} key={item.key}>
                  <Item item={item} key={item.key} deleteItem={this.deleteItem} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Event);
