import styles from "./App.scss";
import Map from "../static/world-50m.json";
import React, { Component } from "react"
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps"
import ReactTooltip from 'react-tooltip'

class BasicMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: "",
            info: false,
            visited: false,
            visitedCountries: JSON.parse(localStorage.getItem("country")) || {}
        }
    }

    // Pobieranie danych z API po kliknięciu na dany kraj
    handleClick = (geography) => {
        fetch(`https://restcountries.eu/rest/v2/alpha/${geography.properties.ISO_A3}`)
            .then( response => {
            return response.json()
        }).then(data => {
            this.setState({
                country: data,
                info: true
            })
        }).catch(err => {
            console.log("Something went wrong :(")
        })
    };

    //Zamykanie info
    closeCountryInfo = () => {
        this.setState({
            info: false
        })
    };

    //Zamykanie listy z odwiedzonymi krajami
    closeCountryList = () => {
        this.setState({
            visited: false
        })
    };

    //Dodawanie odwiedzonego kraju do tablicy
    addCountryToList = (countryToAdd) => {

        this.setState((prevState) => {
            const visitedCountries = { ...prevState.visitedCountries, [countryToAdd.alpha3Code]: countryToAdd};
            localStorage.setItem('country', JSON.stringify( visitedCountries ) );

            return {
                visited: true,
                visitedCountries
                //counter: this.state.counter + 1,
            }
        });
    };

    //Usuwanie nieodwiedzonego kraju z tablicy
    removeCountryFromList = (countryToRemove) => {
        this.setState((prevState) => {

            const newVisiedCountries = { ...prevState.visitedCountries };
            delete newVisiedCountries[countryToRemove.alpha3Code];

            localStorage.setItem('country', JSON.stringify( newVisiedCountries ) );

            return {
                info: false,
                visitedCountries: newVisiedCountries,
                //counter: this.state.counter - 1
            }
        });
    };


    render() {
        let countryInfo = "";
        let countryList = [];
        let count = Object.keys(this.state.visitedCountries).length;

        //Sprawdzam czy kliknięto na kraj
        if (this.state.info === true) {
            //Tworzę info na temat klikniętego kraju
            countryInfo = <div className={ styles.countryInfo }>
                <a href="#" className={styles.close} onClick={this.closeCountryInfo}/>
                <h2>{ this.state.country.name } </h2>
                <div>Native name: { this.state.country.nativeName } </div>
                <div>Capital city: { this.state.country.capital } </div>
                <div>Region: { this.state.country.subregion } </div>
                <h5 className='been'>Have you been in this country? <button className='btn' onClick={
                    () => this.addCountryToList({ ...this.state.country })
                } >Yes!</button> <button className='btn' onClick={
                    () => this.removeCountryFromList({ ...this.state.country })
                } >No!</button> </h5>
            </div>;
        } else if (this.state.info === false) {
            countryInfo = "";
        }

        //Lista odwiedzonych krajów
        if (this.state.visited === true) {
            console.log(this.state.visitedCountries);
            countryList = <div className={ styles.countryList }>
                <a href="#" className={styles.close} onClick={this.closeCountryList}/>
                <h2 className={ styles.counter }> You have been in { count } countries: </h2>
                <ul>
                    { Object.values(this.state.visitedCountries).map(country => (<li key={country.name}> { country.name } </li>)) }
                </ul>
                </div>;
        }

        return (
            <div className={styles.wrapperStyles}>
                <ComposableMap
                    projectionConfig={{
                        scale: 205,
                    }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <ZoomableGroup center={[0,20]} disablePanning>
                        <Geographies geography={ Map } disableOptimization>
                            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                <Geography
                                    key={ `kraj_${i}_${geography.properties.ISO_A3 in this.state.visitedCountries}`}
                                    cacheId={geography.properties.ISO_A3}
                                    data-tip={geography.properties.NAME}
                                    geography={geography}
                                    projection={projection}
                                    onClick={this.handleClick}
                                    className={ [styles.selectedMap, geography.properties.ISO_A3 in this.state.visitedCountries && styles.visitedCountry].join(" ") } /*Kolorowanie odwiedzonego kraju*/
                                />
                            ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <ReactTooltip border={true}/>
                <div> { countryInfo }</div>
                <div> { countryList }</div>
            </div>
        )
    }
}

export default BasicMap


//Pierdu pierdu
//console.log(Object.keys(this.state.visitedCountries).indexOf(geography.properties.ISO_A3)) ||


