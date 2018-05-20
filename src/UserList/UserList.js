import React from "react";
import { css } from "glamor";

function UserItem(props) {
  const { isActive, ...otherProps } = props;
  return (
    <div
      {...css({
        padding: "20px",
        textTransform: "capitalize",
        margin: "25px 10px",
        color: `${isActive ? "#fff" : "#0078e7"}`,
        width: "100%",
        borderRadius: "10px",
        backgroundColor: `${isActive ? "#0078e7" : "#fff"}`
      })}
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

const buttonStyle = {
  backgroundColor: "#0078e7",
  color: "#fff",
  fontSize: "14px",
  lineHeight: "1.1428571428571428",
  margin: "0px",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "4px",
  border: "0",
  display: "inline-block",
  verticalAlign: "middle",
  textAlign: "center",
  textDecoration: "none",
  appearance: "none",
  ":hover": {
    boxShadow: "inset 0 0 0 999px rgba(0,0,0,0.125)"
  }
};

let inputStyles = {
  lineHeight: "inherit",
  margin: "0px",
  paddingLeft: "4px",
  paddingRight: "4px",
  paddingTop: "8px",
  paddingBottom: "8px",
  width: "100%",
  border: "0",
  borderColor: "#eee",
  boxShadow: "inset 0 0 0 1px #eee",
  borderRadius: "4px",
  color: "inherit",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  display: "inline-block",
  verticalAlign: "middle"
};

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
      <div {...css({ width: "50%" })}>
        <div
          {...css({
            justifyContent: "space-evenly",
            margin: "20px",
            display: "flex"
          })}
        >
          <button
            className={`${css(buttonStyle)} verified-users-button`}
            onClick={this.handleClick.bind(null, "verified")}
          >
            Verified
          </button>
          <button
            className={`${css(buttonStyle)} top-users-button`}
            onClick={this.handleClick.bind(null, "top")}
          >
            Top Users
          </button>
          <button
            className={`${css(buttonStyle)} anonymous-users-button`}
            onClick={this.handleClick.bind(null, "anonymous")}
          >
            Anonymous
          </button>
        </div>
        <div
          {...css({
            justifyContent: "center",
            margin: "20px",
            display: "flex"
          })}
        >
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
        </div>
        <div {...css({ display: "flex", justifyContent: "space-evenly" })}>
          <div {...css({ width: "50%" })}>
            <input
              {...css(inputStyles)}
              placeholder="Enter user name"
              value={this.state.userName}
              name="userName"
              onChange={this.handleChange}
            />
          </div>
          <button
            {...css([
              buttonStyle,
              { backgroundColor: "#0067ee", color: "#fff" }
            ])}
            onClick={this.handleAdd}
          >
            Add
          </button>
        </div>
        {this.showSelectedList().map(user => (
          <UserItem key={user.name} isActive={user.isActive}>
            {user.name}
          </UserItem>
        ))}
      </div>
    );
  }
}
