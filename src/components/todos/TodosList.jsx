import React from "react";
import styles from "./Todos.scss"

const Todo = ({ todo, onRemove }) => (
  <li>
    <p> { todo.title } </p> <button onClick={ onRemove }>Remove</button>
  </li>
);

const TodosList = ({ todos, onRemove }) => (
  <ul>
    { Object.entries(todos).map(
      ([key, todo]) => (
        <Todo
          key={ `todo_${key}` }
          todo={ { ...todo, key } }
          onRemove={ () => onRemove(key) }
        />
      )
    ) }
  </ul>
);

export default TodosList;
