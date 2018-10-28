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

    //Dodawanie odwiedzonego kraju do listy
    addCountryToList = (countryToAdd) => {

        this.setState((prevState) => {
            const visitedCountries = { ...prevState.visitedCountries, [countryToAdd.alpha3Code]: countryToAdd};
            localStorage.setItem('country', JSON.stringify( visitedCountries ) );

            return {
                visited: true,
                visitedCountries
            }
        });
    };

    //Usuwanie nieodwiedzonego kraju z listy
    removeCountryFromList = (countryToRemove) => {
        this.setState((prevState) => {

            const newVisiedCountries = { ...prevState.visitedCountries };
            delete newVisiedCountries[countryToRemove.alpha3Code];

            localStorage.setItem('country', JSON.stringify( newVisiedCountries ) );

            return {
                info: false,
                visitedCountries: newVisiedCountries,
            }
        });
    };

    render() {
        let countryInfo = "";
        let countryList = [];
        let count = Object.keys(this.state.visitedCountries).length;

        //Jeżeli kliknięto na kraj to renderuję info na jego temat
        if (this.state.info === true) {
            countryInfo = <div className={ styles.countryInfo }>
                <img className={ styles.flag } src={this.state.country.flag} alt='flag of country'/>
                <div className={ styles.title }>{ this.state.country.name } </div>
                <div className={ styles.info }>
                <div>Native name: { this.state.country.nativeName } </div>
                <div>Capital city: { this.state.country.capital } </div>
                <div>Region: { this.state.country.subregion } </div>
                <div>Language:
                    { this.state.country.languages.map((lang) => {
                            return <span key={lang.name}> {lang.name}   </span>
                        })
                    }
                </div>
                <div>Currency:
                    { this.state.country.currencies.map((el) => {
                            return <span key={el.code}> {el.name} ( {el.code}, {el.symbol} ) </span>
                        })
                    }
                </div>
                </div>
                <div className={ styles.been } > <p>Have you been in this country?</p> <button className={ styles.btn } onClick={
                    () => this.addCountryToList({ ...this.state.country })
                } >Yes!</button> <button className={ styles.btn } onClick={
                    () => this.removeCountryFromList({ ...this.state.country })
                } >No!</button> </div>
            </div>;
        } else if (this.state.info === false) {
            countryInfo = <div className={ styles.startInfo }> </div>
        }

        //Render listy odwiedzonych krajów
        if (this.state.visited === true) {
            countryList = <div className={ styles.countryList }>
                <div className={ styles.counter }> You have been in { count } countries: </div>
                <ul>
                    { Object.values(this.state.visitedCountries).map(country => (<li key={country.name}> { country.name } </li>)) }
                </ul>
                </div>;
        } else {
            countryList = <div className={ styles.countryList }>
                <div className={ styles.startInfo }> </div>
            </div>;
        }

        return (
            <div className={styles.mainMap}>
                <div> { countryInfo }</div>
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
                </div>
                <div>{ countryList }</div>
            </div>
        )
    }
}

export default BasicMap