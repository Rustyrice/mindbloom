import React, { useState } from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

import { supabase } from "config/client";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function RegisterPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  let history = useHistory();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });
    if (error) {
      console.log("error", error);
    } else {
      history.push("/profile-page");
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Hello Stranger 👋</h3>
                
                <Form className="register-form" onSubmit={handleSignUp}>
                  <label>Email</label>
                  <Input placeholder="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                  <label>Name</label>
                  <Input placeholder="Name" type="text" value={name} onChange={e => setName(e.target.value)} />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                  <Button block className="btn-round" color="danger" type={"submit"}>
                    Register
                  </Button>
                </Form>

                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    onClick={() => history.push("/login-page")}
                  >
                    Already have an account?
                  </Button>
                </div>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegisterPage;
