import   React     from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <span className="navbar-brand">Simple Todo App</span>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-link" to="/" exact>Todos</NavLink>
                <NavLink className="nav-link" to="/trashbin">Trashbin</NavLink>
              </div>
            </div>
          </div>
        </nav>
    )
}