import { useState, useEffect } from "react"

export const Purchases = ()=> {
    
    const [purchases, setPurchases] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () =>{
        fetch(`http://localhost:8088/purchases/?_expand=product&user=${kandyUserObject.id}`)
        .then(response => response.json())
        .then((purchaseArray) => {
            setPurchases(purchaseArray)
        })
        },
        []
    )
    
    return <><h2>List of Orders</h2>

    <article className="tickets">
        {
            purchases.map(
                (purchase) => {
                    if (kandyUserObject.id === purchase.userId) {
                    return <section key={purchase.id} className="product">
                    <header className="productName">{purchase?.product?.productName}</header>
                    <footer className="productPrice">Price: ${purchase?.product?.price.toFixed(2)}</footer>
                    </section>
                }}
            )
        }
    </article>
    </>

}