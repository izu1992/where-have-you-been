import React from "react";
import styles from "./App.scss";
import BasicMap from "./Map.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer";

const App = () => (
    <div className={ styles.main }>
        <Header/>
        <BasicMap/>
        <Footer/>
    </div>
);

export default App;