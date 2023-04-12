import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../locations/Locations"
import { ProductContainer } from "../products/ProductContainer"

export const CustomerViews = () => {
	return (
	<Routes>
		<Route path="/" element={
			<>
				<h1>Kandy Korner</h1>
				<div>Get Kandy wherever and whenever you want!</div>

				<Outlet />
			</>
		}>
            <Route path="products" element={ <ProductContainer /> } />
			<Route path="locations" element={ <Locations /> } />
		</Route>
	</Routes>
)
}