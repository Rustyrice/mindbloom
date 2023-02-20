import React, { useEffect } from "react";


// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import { supabase } from "config/client";

function ProfilePage() {
  const [user, setUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
      Hi {user?.email}
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
