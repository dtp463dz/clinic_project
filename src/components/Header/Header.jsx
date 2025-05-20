import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash'; // sử dụng lodash để check obj có rỗng hay ko
import { USER_ROLE } from '../../utils/constant';

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account);

    console.log('account: ', account, ' isAuthenticated: ', isAuthenticated,);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    const handleLogout = () => {
        navigate('/login');
    }
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            let role = account.roleId;
            if (role === USER_ROLE.ADMIN) {

            }
            if (role === USER_ROLE.DOCTOR) {

            }

        }
        console.log('check: ', account, isAuthenticated)
    }, [])
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand'>Booking Health</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>
                            Home
                        </NavLink>
                        <NavLink to="/users" className='nav-link'>
                            Users
                        </NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>

                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign Up</button>
                            </>
                            :
                            <>
                                <span className="nav-link">
                                    Hello {account && account.firstName ? account.firstName : ''}
                                </span>
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Log In</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        Log Out
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>

                                </NavDropdown>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;