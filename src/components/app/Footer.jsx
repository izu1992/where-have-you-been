import React from 'react';
import styles from "./App.scss";

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <div className={ styles.footer }>
                    Have a great another adventure!
                </div>
            </footer>
        )
    }
}

export default Footer