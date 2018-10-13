import React from "react";
import styles from "./App.scss";
import imageSrc from "./peter.jpg";
import Todos from "../todos/Todos";

const App = () => (
  <div className={ styles.app }>
    <Todos/>
  </div>
);

export default App;
