

export const Product = ({productName, price, id}) => {
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    return <><section className="product">
    <header className="productName">{productName}</header>
    <footer className="productPrice">Price: ${price.toFixed(2)}</footer>
    <button className="purchaseButton"
onClick={() =>{
    fetch(`http://localhost:8088/purchases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: kandyUserObject.id,
            productId: id
        })
    })
    .then(response => response.json())
    .then(() => {
    
    })
}}
>Purchase</button>
</section>
</>
}