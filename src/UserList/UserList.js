import React from "react";
import { Box, Flex, Text, Button, Input } from "rebass";
import * as R from "ramda";
import * as actions from "./actions";

const CHANGE_NAME = "CHANGE_NAME";
const CHANGE_SHOW_TYPE = "CHANGE_SHOW_TYPE";
const ADD_ITEM = "ADD_ITEM";
const DEFAULT = "DEFAULT";

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
  state = {
    selectedList: "verified",
    showStatus: "all",
    users: mockUsers,
    userName: ""
  };

  reduce = action => {
    console.log(action, actions, "ehllo");
    const stateReducer = actions[action.type] || actions[DEFAULT];
    console.log("BEFORE", this.state, action);
    this.setState(stateReducer(action.payload), () => {
      console.log("AFTER", this.state);
    });
  };

  /* FP and state machine */
  getUsersList = () => {
    const { showStatus, selectedList, users } = this.state;
    console.log("showStatus", showStatus, selectedList);
    return stateMachine[selectedList][showStatus](users);
  };
  render() {
    return (
      <Box width={1 / 2}>
        <Flex justifyContent="space-evenly" pt={40}>
          <Button
            bg="papayawhip"
            color="palevioletred"
            className="verified-users-button"
            onClick={this.reduce.bind(null, {
              type: CHANGE_SHOW_TYPE,
              payload: "verified"
            })}
          >
            Verified
          </Button>
          <Button
            bg="papayawhip"
            color="palevioletred"
            className="top-users-button"
            onClick={this.reduce.bind(null, {
              type: CHANGE_SHOW_TYPE,
              payload: "top"
            })}
          >
            Top Users
          </Button>
          <Button
            bg="papayawhip"
            color="palevioletred"
            className="anonymous-users-button"
            onClick={this.reduce.bind(null, {
              type: CHANGE_SHOW_TYPE,
              payload: "anonymous"
            })}
          >
            Anonymous
          </Button>
        </Flex>
        <Flex justifyContent="center" m={20}>
          <select
            name="showStatus"
            id="show-status-menu"
            onChange={event =>
              this.reduce({
                type: CHANGE_NAME,
                payload: { name: event.target.name, value: event.target.value }
              })
            }
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
              onChange={event =>
                this.reduce({
                  type: CHANGE_NAME,
                  payload: {
                    name: event.target.name,
                    value: event.target.value
                  }
                })
              }
            />
          </Box>
          <Button
            onClick={this.reduce.bind(null, {
              type: ADD_ITEM,
              payload: this.state.userName
            })}
          >
            Add
          </Button>
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
