import { Link } from "react-router-dom"

export const Customer = ({ id, name, email }) => {
    return <section className="customer">
        <div className="customer_header">
            <Link to={`/customers/${id}`}>{name}</Link>
        </div>
        <div>Email: {email}</div>
    </section>
}