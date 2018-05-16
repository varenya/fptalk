import React from "react";
import { Box, Flex, Text, Button } from "rebass";
import * as R from "ramda";

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

const getUsers = (userType = "verified", filterFn = R.always(Boolean(true))) =>
  R.pipe(R.groupBy(R.prop("type")), R.prop(userType), R.filter(filterFn));

/* 

 if curious about the pattern checkout xstate

*/

const stateMachine = {
  verified: {
    active: getUsers("verified", R.propEq("isActive", true)),
    inactive: getUsers("verified", R.propEq("isActive", false)),
    all: getUsers("verified")
  },
  top: {
    active: getUsers("top", R.propEq("isActive", true)),
    inactive: getUsers("top", R.propEq("isActive", false)),
    all: getUsers("top")
  },
  anonymous: {
    active: getUsers("anonymous", R.propEq("isActive", true)),
    inactive: getUsers("anonymous", R.propEq("isActive", false)),
    all: getUsers("anonymous")
  }
};

export default class UserList extends React.Component {
  state = { selectedList: "verified", showStatus: "all" };

  handleClick = showType => {
    this.setState({ selectedList: showType });
  };

  handleStatus = event => {
    this.setState({ showStatus: event.target.value });
  };
  /* FP and state machine */
  getUsersList = () => {
    const { showStatus, selectedList } = this.state;
    return stateMachine[selectedList][showStatus](mockUsers);
  };
  /* 
     imperative implementation 

  */
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
        {this.getUsersList().map(user => (
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
