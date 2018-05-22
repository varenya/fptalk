import React from "react";

const getMappedFunction = (type, data = null) => object => object[type](data);

const loaderState = {
  initial: () => ({
    type: "INITIAL",
    getMappedFunction: getMappedFunction("INITIAL")
  }),
  loading: () => ({
    type: "LOADING",
    getMappedFunction: getMappedFunction("LOADING")
  }),
  error: error => ({
    type: "ERROR",
    getMappedFunction: getMappedFunction("ERROR", error)
  }),
  success: data => ({
    type: "LOADER",
    getMappedFunction: getMappedFunction("SUCCESS", data)
  })
};

class Loader extends React.Component {
  state = loaderState.initial();
  componentDidMount() {
    const {url} = this.props;
    this.setState(loaderState.loading());
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState(loaderState.success(data)))
      .catch(error => this.setState(loaderState.error(error.msg)));
  }

  render() {
    const { render } = this.props;
    return this.state.getMappedFunction({
      INITIAL: render.initial,
      LOADING: render.loading,
      ERROR: render.error,
      SUCCESS : render.success
    });
  }
}


export default Loader;