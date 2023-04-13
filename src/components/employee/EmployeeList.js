import { useEffect, useState } from "react";
import "./employees.css"
import { Employee } from "./Employee";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const getAllEmployees = () => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
        .then(response => response.json())
        .then((employeeArray) => {
            setEmployees(employeeArray)
        })
    }

    useEffect(
        () => {
            getAllEmployees()
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id}
                name={employee.user.name}
                getAllEmployees={getAllEmployees}
                location={employee.location.address}/>
            )
        }
    </article>
}