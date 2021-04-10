
import {Link} from "react-router-dom"


export default function Navbar() {
return(
  
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">React-Frontend</a>
 
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link active" to="/">Users</Link>
              <Link className="nav-item nav-link" to="/about">About</Link>
            </div>
          </div>
        </nav>
  
    
)}
 