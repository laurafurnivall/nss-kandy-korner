import { useEffect, useState } from "react"
import "./Locations.css"

export const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )
    return <>
    <h2>List of Locations</h2>

    <article className="locations">
        {
            locations.map(
                (location) => {
                    return <section key={location.id} className="location">
                            <header className="locationHeader">Store {location.id}</header>
                            <footer> Located in {location.address}</footer>
                            <footer>{location.sqFt} sqFt</footer>
                    </section>
                }
            )
        }
    </article>
    </>

}