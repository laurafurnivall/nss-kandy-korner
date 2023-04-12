import { useState } from "react"
import { ProductSearch } from "./ProductSearch"
import { Products } from "./Products"


export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms}/>
        <Products searchTermState={searchTerms}/>
    </>
}