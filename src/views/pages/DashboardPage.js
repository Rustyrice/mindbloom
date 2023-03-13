import React, { useEffect, useState } from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { supabase } from "config/client";

function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        console.log("user", value.data.user);
        setUser(value.data.user);
      } else {
        console.log("no user");
      }
    });
  }, []);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/default-avatar.png")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Hi {user?.user_metadata.name} <br />
              </h4>
              <p>This page will show all the data and trends about Personal Informatics according to user Input</p>
            </div>
          </div>
          
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default DashboardPage;
