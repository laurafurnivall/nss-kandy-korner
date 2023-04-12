import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const KandyForm = () => {
    const [types, setTypes] = useState([])
    const [product, update] = useState({
        typeId: "",
        productName: "",
        price: ""
    })
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
                .then(response => response.json())
                .then((typesArray) => {
                    setTypes(typesArray)
                })
        },
        []
    )


    const handleSaveProductClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            typeId: parseInt(product.typeId),
            productName: product.productName,
            price: parseInt(product.price)
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("../products")
            })
    }

    return (
        <form className="productForm">
            <h2 className="productForm_title">Add a New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="kandyName">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of your new favorite kandy..."
                        value={product.productName}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.productName = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="kandyName">Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={product.price}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.price = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.typeId = event.target.value
                                update(copy)
                            }
                        }>
                            <option key={0}>Choose a Product Type</option>
                        {
                            types.map(
                                (type) => {
                                    return (
                                        <option key={type.id} value={type.id}>{type.type}</option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveProductClick(clickEvent)}
                className="btn btn-primary">
                Add New Product
            </button>

        </form>
    )
}