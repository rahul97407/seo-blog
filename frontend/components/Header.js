import React, { useState } from 'react';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth';
import Router, { useRouter } from 'next/router';


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

import Search from './blogs/Search'


Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);



    return (<React.Fragment>
        <Navbar color="light" light expand="md" >
            <Link href="/">
                <NavLink className="fw-bold">{APP_NAME}</NavLink>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto me-4" navbar>
                    <React.Fragment>
                        <NavItem>
                            <Link href="/blogs">
                                <NavLink>
                                    Blogs
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/contact">
                                <NavLink>
                                    Contact
                                </NavLink>
                            </Link>
                        </NavItem>
                    </React.Fragment>

                    {!isAuth() && (
                        <React.Fragment>
                            <NavItem>
                                <Link href="/signin">
                                    <NavLink>
                                        Signin
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/signup">
                                    <NavLink>
                                        Signup
                                    </NavLink>
                                </Link>
                            </NavItem>
                        </React.Fragment>
                    )}

                    {isAuth() && (
                        <NavItem>
                            <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace('/signin'))}>
                                Signout
                            </NavLink>
                        </NavItem>)}

                    <NavItem>
                        <Link href="/user/crud/blog">
                            <NavLink className="btn btn-primary text-light">
                                Write a blog
                            </NavLink>
                        </Link>
                    </NavItem>

                    {isAuth() && isAuth().role === 0 && (
                        <NavItem>
                            <Link href="/user">
                                <NavLink>{`${isAuth().name}'s Dashboard `}</NavLink>
                            </Link>
                        </NavItem>)}

                    {isAuth() && isAuth().role === 1 && (
                        <NavItem>
                            <Link href="/admin">
                                <NavLink style={{ cursor: 'pointer' }}>{`${isAuth().name}'s Dashboard `}</NavLink>
                            </Link>
                        </NavItem>)}
                </Nav>
            </Collapse>
        </Navbar>
        <Search/>
    </React.Fragment>);
}

export default Header;