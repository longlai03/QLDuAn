import { NavLink } from "react-router-dom"
import "../../styles/Menu.css"

const PageMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}>Đăng Nhập</NavLink>
                </li>
                <li>
                    <NavLink to={"/QLDuAN"}>Quản lý dự án</NavLink>
                </li>
                <li>
                    <NavLink to={"/QLTask"}>Quản lý task</NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default PageMenu;