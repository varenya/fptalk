import React, { Component } from "react";
import { Heading } from "rebass";
import UserList from "./UserList";
import { Box, Flex } from "rebass";

class App extends Component {
  render() {
    return (
      <Box>
        <Heading textAlign="center" pt={40} color="palevioletred">
          User List
        </Heading>
        <Flex alignItems="center" justifyContent="center">
          <UserList />
        </Flex>
      </Box>
    );
  }
}

export default App;
