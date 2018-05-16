import React from "react";
import { Box, Flex, Text, Button, Input } from "rebass";

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

const mockUsers = [
  { name: "varenya", type: "verified", isActive: true },
  { name: "vara", type: "top", isActive: true },
  { name: "uttam", type: "top", isActive: false },
  { name: "niraj", type: "top", isActive: true },
  { name: "vishwas", type: "verified", isActive: false },
  { name: "manoj", type: "anonymous", isActive: true }
];

export default class UserList extends React.Component {
  state = {
    selectedList: "verified",
    showStatus: "all",
    userName: "",
    users: mockUsers
  };

  handleClick = showType => {
    this.setState({ selectedList: showType });
  };

  handleStatus = event => {
    this.setState({ showStatus: event.target.value });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAdd = () => {
    this.setState({
      users: [
        ...this.state.users,
        { name: this.state.userName, isActive: true, type: "verified" }
      ],
      userName: ""
    });
  };
  /* 
     imperative implementation 

  */
  showSelectedList = () => {
    let results = [];
    const mockUsers = this.state.users;
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
        <Flex justifyContent="space-evenly">
          <Box w={1 / 2}>
            <Input
              placeholder="Enter user name"
              value={this.state.userName}
              name="userName"
              onChange={this.handleChange}
            />
          </Box>
          <Button onClick={this.handleAdd}>Add</Button>
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
