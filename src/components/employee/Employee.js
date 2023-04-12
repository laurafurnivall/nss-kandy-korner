export const Employee = ({ name, location }) => {
    return <section className="employee">
        <div className="employee_header">{name}</div>
        <div className="employee_location">{location}</div>
    </section>
}