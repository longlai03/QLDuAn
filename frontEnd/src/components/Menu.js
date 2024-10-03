import { NavLink } from "react-router-dom"
import "../styles/Menu.css"
import "bootstrap/dist/css/bootstrap.css"

const PageMenu = () => {

    const pages = [
        {
            text: "Quản lý dự án",
            link: "/QLDuAn",
        },
        {
            text: "Quản lý task",
            link: "/QLTask",
        }
    ]
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <ul className="navbar-nav">
                {pages.map((pages, index) => {
                    return <li key={index} className="nav-item"><NavLink className="nav-link" to={pages.link}>{pages.text}</NavLink></li>
                })}
            </ul>
        </nav>
    )
}
export default PageMenu;