import React from "react";
import styles from "./Todos.scss"
import { getAll, remove, create } from "../db/todos";
import TodosList from "./TodosList";
import TodoAdd from "./TodoAdd";

class Todos extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      todos: [],
      loading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ loading: true }, () => {
      getAll().then(todos => {
        this.setState({ todos, loading: false });
      })
    });
  }

  remove(key) {
    this.setState({ loading: true }, () => {
      remove(key).then(() => this.loadData())
    });
  }

  create(data) {
    this.setState({ loading: true }, () => {
      create(data).then(() => this.loadData())
    });
  }

  render() {
    if (this.state.loading) {
      return "Loading...";
    }
    return (
      <div className={ styles.todos }>
        <TodosList
          todos={ this.state.todos }
          onRemove={ key => this.remove(key) }
        />
        <TodoAdd onCreate={ data => this.create(data) }/>
      </div>
    );
  }
}

export default Todos;
