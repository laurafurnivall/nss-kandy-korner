import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState()
    const [ number, updateNumber] = useState({
        userId: customerId,
        loyaltyNumber: 0
    })
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(number)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/customers") 
        })
    }

    return <> <section className="customer">
        <header className="customer_header">{customer?.user?.name}</header>
        <div>Email: {customer?.user?.email}</div>
        <div className="customer_loyalty">Loyalty Number: {customer?.loyaltyNumber}</div>
    </section>

        <h2 className="profile__title">Update Loyalty Number</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="loyalty-number">Loyalty Number:</label>
                <input
                    required autoFocus
                    type="number"
                    className="number-control"
                    value={number.loyaltyNumber}
                    onChange={(evt) => {
                        const copy = { ...number}
                        copy.loyaltyNumber = evt.target.value
                        updateNumber(copy)
                    }} />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Update
        </button></>
}