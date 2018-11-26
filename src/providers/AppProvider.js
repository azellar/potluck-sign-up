import React, { Component } from 'react';
// import axios from 'axios';

import db from "../Firebase";

export const AppContext = React.createContext();

const initialState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    loggedIn: true
  },
  currentEventId: 'UqPzwFiLeUyDjT6g3xDY'
};

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      // clearFlash: () => {
      //   let newState = Object.assign({}, this.state);
      //   this.setState({
      //     ...newState,
      //     flash: ''
      //   })
      // },
      signup: (firstName, lastName, email) => {
        this.signup(firstName, lastName, email);
      },
      login: email => {
        this.login(email);
      },
      logout: dataContext => {
        this.logout(dataContext);
      }
    };
  }

  login = email => {
    db.collection("Users").where("email", "==", email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { email, firstName, lastName } = doc.data();

        this.setState({
          user: {
            id: doc.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            loggedIn: true
          },
        });
      })
    }).catch((error) => {
      console.log("Error getting user documents: ", error);
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;