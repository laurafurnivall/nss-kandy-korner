import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export const NewEmployeeForm = () => {
    const [newUser, setUser] = useState({
        name: "",
        email: "",
        isStaff: true
    })
    const [newEmployee, setEmployee] = useState({
        userId: 0,
        startDate: "",
        payRate: 15.25,
        locationId: 0
    })
    const [locations, setLocation] = useState([])
    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocation(locationArray)
                })
        },
        []
    )

    const addNewEmployee = (event) => {
        event.preventDefault()

        let createNewUser = {
            name: newUser.name,
            email: newUser.email,
            isStaff: true
        }

        let createNewEmployee = {
            startDate: newEmployee.startDate,
            locationId: newEmployee.locationId,
            payRate: newEmployee.payRate,
            userId: 0
        }

        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createNewUser)
        })
            .then(response => response.json())
            .then((obj) => {
                createNewEmployee.userId = obj.id 
                fetch(`http://localhost:8088/employees?_expand=user&_expand=location`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(createNewEmployee)
                })
                    .then(response => response.json())
                    .then((createduser) => {
                        if (createduser.hasOwnProperty("id")) {
                            localStorage.setItem("kandy_user", JSON.stringify({
                                id: createduser.id,
                                staff: true
                            }))
                        }
                        navigate("../employee")
                    })

            })
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={addNewEmployee}>
                <h1 className="h3 mb-3 font-weight-normal">New Employee Form</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={(event) => {
                        const copy = {...newUser}
                        copy.name = event.target.value
                        setUser(copy)
                    }}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={(event) => {
                        const copy = {...newUser}
                        copy.email = event.target.value
                        setUser(copy)
                    }}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Start Date </label>
                    <input onChange={(event) => {
                        const copy = {...newEmployee}
                        copy.startDate = event.target.value
                        setEmployee(copy)
                    }}
                        type="date" id="startDate" className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Location </label>
                    <select onChange={(event) => {
                        const copy = {...newEmployee}
                        copy.locationId = event.target.value
                        setEmployee(copy)
                    }}>
                        <option key={0}>Choose a Location</option>
                        {
                            locations.map(
                                (location) => {
                                    return (
                                        <option key={location.id} id="locationId" value={location.id}>{location.address}</option>
                                    )
                                }
                            )
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label> Starting PayRate: $15.00 </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Employ Me! </button>
                </fieldset>
            </form>
        </main>
    )
}
