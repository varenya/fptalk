import React, { Component } from "react";
import UserList from "./UserList";
import { css } from "glamor";

let headerStyle = {
  textAlign: "center",
  padding: "40px",
  color: "rgb(75, 75, 75)",
  fontWeight: "normal"
};

let flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

class App extends Component {
  render() {
    return (
      <div {...css({ fontFamily: "sans-serif" })}>
        <h1 className={css(headerStyle)}>User List</h1>
        <div className={css(flexCenter)}>
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
