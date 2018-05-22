import React, { Component } from "react";
import Loader from "./UserList/Loader";
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

/* 
  Reference Links :

  https://twitter.com/sharifsbeat/status/993969723858702336


  https://medium.com/javascript-inside/slaying-a-ui-antipattern-in-react-64a3b98242c


*/

class App extends Component {
  render() {
    return (
      <div {...css({ fontFamily: "sans-serif" })}>
        <h1 className={css(headerStyle)}>User List</h1>
        <div className={css(flexCenter)}>
          <Loader
            url="http://localhost:3001/users"
            render={{
              initial: () => <div>INITIAL</div>,
              loading: () => <h1 {...css({ padding: "50px" })}>LOADING..</h1>,
              error: error => (
                <div {...css({ color: "#900", textTransform: "uppercase" })}>
                  {error}
                </div>
              ),
              success: data => <UserList users={data} />
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
