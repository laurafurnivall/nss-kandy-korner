import "./NavBar.css"
import { EmployeeNavBar } from "./EmployeeNavBar"
import { CustomerNavBar } from "./CustomerNavBar"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        return <EmployeeNavBar/>
    } else {
        return <CustomerNavBar/>
    }
}