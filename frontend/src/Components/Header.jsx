import { Navbar, Nav, Container, NavDropdown,Badge } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../Slice/usersApiSlice";
import {logout} from '../Slice/authSlice'

const Header = () => {
  const {userInfo} = useSelector((state)=> state.auth)

  
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()  
  
  const logoutHandler = async ()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              { userInfo ? (
                <>
                <NavDropdown title={userInfo.name} id = 'username'>
                  <LinkContainer to = '/profile'>
                    <NavDropdown.Item>
                      profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout 
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ) : (
                <>
                <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> log in
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignInAlt /> Sign up
                </Nav.Link>
              </LinkContainer>
                
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
