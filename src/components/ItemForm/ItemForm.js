import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const dishTypes = [
  {
    value: "main",
    label: "Main Dish"
  },
  {
    value: "side",
    label: "Side"
  },
  {
    value: "dessert",
    label: "Dessert"
  },
  {
    value: "other",
    label: "Other"
  }
];

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column"
  },
  formItem: {
    marginBottom: theme.spacing.unit * 4
  }
});

class ItemForm extends Component {
  state = {
    name: "",
    description: "",
    dishType: "",
    otherInfo: "",
    user: "",
    volunteer: ""
  };

  handleChange = e => {
    e.preventDefault();
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleSumbit = e => {
    e.preventDefault();
    this.setState({
      name: "",
      description: "",
      dishType: "",
      otherInfo: "",
      user: "",
      volunteer: ""
    });
    this.props.createItem(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleSumbit}>
        <Paper className={classes.paper}>
          <TextField
            type="text"
            id="volunteer"
            name="volunteer"
            label="Who's bringing the dish"
            placeholder=""
            required
            value={this.state.volunteer}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.formItem}
          />
          <TextField
            type="text"
            id="name"
            name="name"
            label="Dish Name"
            placeholder="What are you bringing"
            required
            value={this.state.name}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.formItem}
          />
          <TextField
            type="text"
            id="description"
            name="description"
            label="Description"
            placeholder="Dish description"
            required
            multiline
            value={this.state.description}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.formItem}
          />
          <TextField
            id="dishType"
            select
            label="Dish Type"
            name="dishType"
            type="text"
            value={this.state.dishType}
            onChange={this.handleChange}
            helperText="Please select the type of dish you are bringing"
            margin="normal"
            variant="outlined"
            className={classes.formItem}
          >
            {dishTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            id="otherInfo"
            name="otherInfo"
            label="Additional/Allergen Info"
            placeholder="Any additional or allergen info about the dish"
            multiline
            value={this.state.otherInfo}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.formItem}
          />
          <Button variant="outlined" type="submit">
            Add Item
          </Button>
        </Paper>
      </form>
    );
  }
}

export default withStyles(styles)(ItemForm);
