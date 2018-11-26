import React, { Component } from "react";

class ItemForm extends Component {
  state = {
    name: "",
    description: "",
    dishType: "",
    otherInfo: "",
    user: "",
    email: ""
  };

  handleChange = e => {
    e.preventDefault();
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleSumbit = e => {
    e.preventDefault();
    this.props.createItem(this.state);
  };

  render() {
    const loading = false;
    return (
      <form onSubmit={this.handleSumbit}>
        What are you bringing?
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="what are you bringing"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="email">
            Email of who is bringing it
            <input
              type="text"
              id="email"
              name="email"
              placeholder=""
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="describe it"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="dishType">
            Dish Type
            <select
              id="dishType"
              name="dishType"
              required
              value={this.state.dishType}
              onChange={this.handleChange}
            >
              <option value="mainDish">Main Dish</option>
              <option value="side">Side</option>
              <option value="dessert">Dessert</option>
            </select>
          </label>
          <label htmlFor="otherInfo">
            Additional/Allergin Info
            <textarea
              type="text"
              id="otherInfo"
              name="otherInfo"
              placeholder="Let us know of any allergens in your dish"
              value={this.state.otherInfo}
              onChange={this.handleChange}
            />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default ItemForm;
