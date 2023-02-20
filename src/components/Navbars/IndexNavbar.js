import React from "react";
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

import { supabase } from "config/client";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [userState, setUserState] = React.useState(null);

  supabase.auth.onAuthStateChange((event, session) => {
    console.log("onAuthStateChange", event, session);
    if (event !== "SIGNED_OUT") { // If user is signed in
      setUserState(session.user);
    } else {
      setUserState(null);
    }
  });

  console.log("userState", userState);

    const handleSignOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.log("Error signing out:", error);
    };

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
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
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
          >
            mindbloom
          </NavbarBrand>
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
          {userState ? 
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
