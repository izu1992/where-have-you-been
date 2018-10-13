import React from "react";


class TodoAdd extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      title: ""
    };
  }

  onChange(event) {
    event.preventDefault();
    this.setState({
      title: event.target.value
    })
  }

  save() {
    this.props.onCreate( { ...this.state });
    this.setState({ title: "" });
  }

  render() {
    return <div>
      <input
        onChange={ event => this.onChange(event) }
        value={ this.state.title }
      ></input>
      <button onClick={ () => this.save() }>Save</button>
    </div>
  }
}

export default TodoAdd;
