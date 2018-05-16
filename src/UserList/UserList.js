import React from "react";
import { Box, Flex, Text, Button, Heading } from "rebass";

const CustomBox = Box.extend`
  border-radius: 10px;
  background-color: ${props => (props.isActive ? "#efb85f" : "papayawhip")};
`;

function UserItem(props) {
  const { isActive, ...otherProps } = props;
  return (
    <CustomBox
      p={3}
      mx={2}
      my={4}
      color="palevioletred"
      width={1}
      isActive={props.isActive}
      {...otherProps}
    />
  );
}

export default class UserList extends React.Component {
  state = {
    selectedList: "verified",
    showStatus: "all",
    loading: false,
    error: false,
    usersData: []
  };

  handleClick = showType => {
    this.setState({ selectedList: showType });
  };

  handleStatus = event => {
    this.setState({ showStatus: event.target.value });
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(users => this.setState({ usersData: users, loading: false }))
      .catch(err => {
        this.setState({ loading: false, error: true });
      });
  }
  /* 
     imperative implementation 

  */
  showSelectedList = () => {
    let results = [];
    const mockUsers = this.state.usersData;
    for (let i = 0; i < mockUsers.length; i++) {
      if (this.state.showStatus === "all") {
        if (mockUsers[i].type === this.state.selectedList)
          results.push(mockUsers[i]);
      } else if (this.state.showStatus === "active") {
        if (
          mockUsers[i].type === this.state.selectedList &&
          mockUsers[i].isActive
        )
          results.push(mockUsers[i]);
      } else {
        if (
          mockUsers[i].type === this.state.selectedList &&
          !mockUsers[i].isActive
        )
          results.push(mockUsers[i]);
      }
    }
    return results;
  };
  render() {
    if (this.state.loading) {
      return (
        <Box p={50}>
          <Heading>Loading..</Heading>
        </Box>
      );
    } else if (this.state.error) {
      return <Heading p={50}>Error</Heading>;
    }
    return (
      <Box width={1 / 2}>
        <Flex justifyContent="space-evenly" pt={40}>
          <Button
            bg="papayawhip"
            color="palevioletred"
            className="verified-users-button"
            onClick={this.handleClick.bind(null, "verified")}
          >
            Verified
          </Button>
          <Button
            bg="papayawhip"
            color="palevioletred"
            className="top-users-button"
            onClick={this.handleClick.bind(null, "top")}
          >
            Top Users
          </Button>
          <Button
            bg="papayawhip"
            color="palevioletred"
            className="anonymous-users-button"
            onClick={this.handleClick.bind(null, "anonymous")}
          >
            Anonymous
          </Button>
        </Flex>
        <Flex justifyContent="center" m={20}>
          <select
            name="showStatus"
            id="show-status-menu"
            onChange={this.handleStatus}
            value={this.state.showStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">In Active</option>
          </select>
        </Flex>
        {this.showSelectedList().map(user => (
          <UserItem key={user.name} isActive={user.isActive}>
            <Text fontSize={20} style={{ textTransform: "capitalize" }}>
              {user.name}
            </Text>
          </UserItem>
        ))}
      </Box>
    );
  }
}
