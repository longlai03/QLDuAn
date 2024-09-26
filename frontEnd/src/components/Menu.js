import { NavLink } from "react-router-dom"
import "../styles/Menu.css"

const PageMenu = () => {
    return (
        <nav>
            <ul className="menu-bar">
                <li>
                    <NavLink to={"/QLDuAn"}>Quản lý dự án</NavLink>
                </li>
                <li>
                    <NavLink to={"/QLTask"}>Quản lý task</NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default PageMenu;