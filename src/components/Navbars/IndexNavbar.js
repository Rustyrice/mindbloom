import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classnames from "classnames"; // used for making className more dynamic

import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import { IoArrowBack } from "react-icons/io5";

import { supabase } from "config/client";

function IndexNavbar({ title }) {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);
  const [backButton, setBackButton] = useState(false);

  let history = useHistory();

  async function checkLoggedIn() {
    const { data } = await supabase.auth.getSession()
    if (data.session) { // if there is a session, user is logged in
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }

  useEffect(() => {
    checkLoggedIn() // check if user is logged in on page load
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error signing out:", error);
    setLoggedin(false);
    history.push("/index");
  };

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  useEffect(() => {
    if (history.length > 2 && history.location.pathname !== "/dashboard" && history.location.pathname !== "/index") {
      setBackButton(true);
    } else {
      setBackButton(false);
    }
  }, [history]);

  let location = useLocation();


  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          {backButton && <Button outline color="danger" onClick={() => history.goBack()} className="btn-round"> <IoArrowBack /> </Button>}
          
          {loggedIn ?
            <NavbarBrand
              data-placement="bottom"
              href="/dashboard"
            >
              Dashboard {title}
            </NavbarBrand>
            :
            <NavbarBrand
              data-placement="bottom"
              href="/index"
            >
              mindbloom
            </NavbarBrand>
            
          }
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >

          {loggedIn ? 
            <Nav navbar>
             <NavItem>
             <Button
               className="btn-round"
               color="danger"
               onClick={handleSignOut}
             >
               <i /> Log Out
             </Button>
              </NavItem>
            </Nav>

            :
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="/login-page"
                >
                  <i /> Log in
                </NavLink>
              </NavItem>

              <NavItem>
                <Button
                  className="btn-round"
                  color="danger"
                  href="register-page"
                >
                  <i /> Sign Up
                </Button>
              </NavItem>
            </Nav>
          }
            
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
