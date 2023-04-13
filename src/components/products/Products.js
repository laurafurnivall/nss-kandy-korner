import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"
import { Product } from "./Product"


export const Products = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPrice, setTopPricedProducts] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.productName.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredProducts(searchedProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products/?_expand=type`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            if (topPrice) {
                const topPricedProducts = products.filter(product => product.price > 2 === true)
                setFilteredProducts(topPricedProducts)
            } else {
                setFilteredProducts(products)
            }
        },
        [topPrice]
    )

    useEffect(
        () => {
            setFilteredProducts(products)
        },
        [products]
    )


    return <>
        <h2>List of Products</h2>
        {
            kandyUserObject.staff ?
                <>
                    <button className="buttons" onClick={() => { setTopPricedProducts(true) }}>Top Priced Products</button>
                    <button className="buttons" onClick={() => { setTopPricedProducts(false) }}>All Products</button>
                    <button className="buttons" onClick={() => { navigate("/products/create") }}>Add Product</button>
                </>
                : ""
        }
        {
            kandyUserObject.staff ?
                <>
                    <article className="products">
                        {
                            filteredProducts.map(
                                (product) => {
                                    return <section key={product.id} className="product">
                                        <header className="productName">{product.productName}</header>
                                        <footer className="productPrice">Price: ${product.price.toFixed(2)}</footer>

                                        <footer className="productType">Type: {product.type.type}</footer>

                                    </section>
                                }
                            )
                        }
                    </article>
                </>
                :
                <>
                    <article className="products">
                        {
                            filteredProducts.map(
                                (product) => <Product key={product.id}
                                id={product.id}
                                productName={product.productName}
                                price={product.price} />
                            )
                        }
                    </article>
                </>
        }
    </>

}
