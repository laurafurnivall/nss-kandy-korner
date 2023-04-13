
export const Employee = ({ name, location, id, getAllEmployees }) => {


    return <section className="employee">
        <div className="employee_header">{name}</div>
        <div className="employee_location">{location}</div>
        <button className="purchaseButton"
        onClick={() => {
            fetch(`http://localhost:8088/employees/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(getAllEmployees()
             
            )
        }}
        >Fire Employee!</button>
    </section>
}