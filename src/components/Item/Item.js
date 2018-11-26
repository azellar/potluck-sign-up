import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    width: 250,
    height: 250
    // padding: theme.spacing.unit * 2,
  },
  deleteButton: {
      '&:hover': {
        color: 'red'
      }
  }
});

class Item extends Component {
  render() {
    const {
      classes,
      deleteItem,
      item: { key, description, dishType, name, otherInfo, volunteer }
    } = this.props;

    return (
      <Card key={key} className={classes.card}>
        <CardContent>
          <Typography gutterBottom>{`Volunteer: ${volunteer}`}</Typography>
          <Typography gutterBottom>{`Dish: ${name}`}</Typography>
          <Typography gutterBottom paragraph>
            {`Dish Description: ${description}`}
          </Typography>
          <Typography gutterBottom>{`Dish Type: ${dishType}`}</Typography>
          <Typography gutterBottom paragraph>
            {`Additional/Allergen Info: ${otherInfo}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.deleteButton} onClick={() => deleteItem(key)}>
            Delete
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Item);
