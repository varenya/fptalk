export const ADD_ITEM = name => (state, props) => ({
  users: [...state.users, { name, type: "verified", isActive: true }],
  userName: ""
});

export const CHANGE_SHOW_TYPE = showType => (state, props) => ({
  selectedList: showType
});

export const CHANGE_NAME = ({ name, value }) => (state, props) => ({
  [name]: value
});

export const DEFAULT = () => (state, props) => state;
