import React, { useEffect, useState } from "react";
import { supabase } from "../../config/client";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [failedLogIn, setFailedLogIn] = useState(null);

  let history = useHistory();

  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("onAuthStateChange", event, session);
    if (event !== "SIGNED_OUT") { // If user is signed in
      history.push("/dashboard"); // Redirect to dashboard
    }
  }); // See https://supabase.io/docs/reference/javascript/auth-onauthstatechange


  const handleLogIn = async (e) => { // Log In function
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ // Log In with email and password
      email: email,
      password: password,
    });
    if (error) {
      console.log("Error logging in", error);
      setFailedLogIn(true);
    } else {
      history.push("/dashboard"); // Redirect to dashboard page
    }
  };

  const handleGoogleLogIn = async () => { // Log In function
    await supabase.auth.signInWithOAuth({ // Log In with Google, see https://supabase.io/docs/reference/javascript/auth-signinwithoauth
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
        scopes: 'https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read'
      }
    });
  }


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
                <h3 className="title mx-auto">Welcome Back</h3>
                <div className="social-line text-center">

                  {/* Google Log In Button */}
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    onClick={handleGoogleLogIn}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  
                </div>

                {/* Log In form */}
                <Form className="register-form" onSubmit={handleLogIn}>
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </InputGroup>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                  </InputGroup>
                  <Button block className="btn-round" color="danger" type={"submit"}>
                    Log In
                  </Button>
                  {failedLogIn && <p color="danger" className="text-center" id="error_text" display="none">Your email and/or password is incorrect</p>}
                </Form>

                {/* Forgot password and Don't have an account? */}
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                  <Button
                    className="btn-link mt-0"
                    color="danger"
                    href="/register-page"
                  >
                    Don't have an account?
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

export default LoginPage;
