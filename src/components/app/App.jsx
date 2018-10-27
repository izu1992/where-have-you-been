import React from "react";
import styles from "./App.scss";
import BasicMap from "./Map.jsx";

const App = () => (
    <div className={ styles.main }>
        <BasicMap/>
    </div>
);

export default App;