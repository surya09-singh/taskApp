import {Container, Nav, Navbar} from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';

function SettNavbar(){
    const navigate = useNavigate();
    const {setAuthUser , isLoggedIn, setisLoggedIn} = useAuth()


    const logOut = () => {
        /* jshint ignore:start*/
      // eslint-disable-next-line
        setisLoggedIn(false),
setAuthUser(null),
localStorage.clear()
navigate('/')

console.log('ljfhvtu');
    }

    return(
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Task Assinged</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar1">  
            <Nav className="me-auto">
             {!isLoggedIn && <Nav.Link href="/register">Register</Nav.Link> }
              {!isLoggedIn &&  <Nav.Link href="/">Login</Nav.Link>}
              {isLoggedIn && <button onClick={() => {
logOut()

              }}> Logout </button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    )
}
export default SettNavbar;