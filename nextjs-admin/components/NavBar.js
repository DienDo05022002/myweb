import React from 'react';
import Head from 'next/head';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

const NavBar = () => {
  const storeTokens = Cookies.get('tokens');
  const [storeRole, setStoreRole] = useState(false)
  useEffect(() => {
    setStoreRole(Cookies.get('user'));
  })
  // console.log(storeTokens)
  const router = useRouter()
  const logOut = () => {
    Cookies.remove('tokens');
    Cookies.remove('user');
    Cookies.remove('ally-supports-cache');
    Cookies.remove('roleId');
    router.push("/auth/login")
  };
  return (
    <div>
      <Container>
        <Head>
          <title>Welcome</title>
        </Head>

        <header>
          <Navbar bg="dark" variant="dark" className="navbar-main" style={{ justifyContent: 'space-around' }}>
            <Navbar.Brand className="navbar-brand">
              <Link
                href="/dashboard"
                style={{ color: 'white' }}
                className="nav-link"
              >
                Home
              </Link>
            </Navbar.Brand>
            <Nav>
              {storeRole !== undefined ? (
                <Button variant="" onClick={logOut} style={{ color: 'white' }}>LogOut</Button>
              ) : (
                <Link
                  href="/auth/login"
                  style={{ color: 'white' }}
                  className="nav-link"
                >
                  Login
                </Link>
              )}
            </Nav>
          </Navbar>
        </header>
      </Container>
    </div>
  );
};

export default NavBar;
