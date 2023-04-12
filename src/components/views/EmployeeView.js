import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../locations/Locations"
import { Products } from "../products/Products"
import { KandyForm } from "../products/kandyForm"
import { EmployeeList } from "../employee/EmployeeList"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"

export const EmployeeViews = () => {
	return (
	<Routes>
		<Route path="/" element={
			<>
				<h1>Kandy Korner</h1>
				<div>Get Kandy wherever and whenever you want!</div>

				<Outlet />
			</>
		}>

			<Route path="locations" element={ <Locations /> } />
			<Route path="products" element={ <Products /> } />
			<Route path="products/create" element={ <KandyForm/> } />
			<Route path="employee" element={ <EmployeeList/> } />
			<Route path="customers" element={ <CustomerList/> } />
			<Route path="customers/:customerId" element={ <CustomerDetails/> } />
		</Route>
	</Routes>
)
}