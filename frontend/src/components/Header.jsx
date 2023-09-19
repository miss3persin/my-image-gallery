import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from '../slices/authSlice';
import { useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async() => {
    try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/');
    } catch (err) {
        console.log(err);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  // const handleSearch = () => {
  //   if (searchTerm.trim() !== '') {
  //     navigate(`/search/${searchTerm}`);
  //   }
  // }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm}`);
    }
    console.log(`Performing search for: ${searchTerm}`);
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Image-Gallery</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="ms-auto d-flex" onSubmit={handleSearchSubmit}>
  <FormControl type="text" placeholder="Search" className="mr-2 flex-grow-1" style={{ minWidth: '300px' }} value={searchTerm}
            onChange={handleSearchChange} onKeyUp={handleKeyUp}/>
  <Button variant="outline-light" style={{ minWidth: '80px' }} className="ml-2" type="submit">Search</Button>
</Form>



            <Nav className="ms-auto">
                {userInfo ? 
                <>
                    <NavDropdown title= {userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>
                                Profile
                            </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={ logoutHandler }>Logout</NavDropdown.Item>
                    </NavDropdown>
                </>
                : 
                    <>
                        <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
                    </>
                }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
