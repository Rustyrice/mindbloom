import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function SectionAboutUs() {
    return (
        <>
            <div className="section section-dark text-center">
                <Container>
                    <h2 className="title">Let's talk about us</h2>
                    <Row>
                    <Col md="4">
                        <Card className="card-profile card-plain">
                        <div className="card-avatar">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                src={require("assets/img/default-avatar.png")}
                            />
                            </a>
                        </div>
                        <CardBody>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <div className="author">
                                <CardTitle tag="h4">Chris Jones</CardTitle>
                                <h6 className="card-category">Back-end developer</h6>
                            </div>
                            </a>
                            <p className="card-description text-center">
                            Software development is a team sport, and success comes from collaboration, communication, and mutual respect.
                            </p>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button
                            className="btn-just-icon btn-neutral"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-twitter" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-google-plus" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-linkedin" />
                            </Button>
                        </CardFooter>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-profile card-plain">
                        <div className="card-avatar">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                src={require("assets/img/default-avatar.png")}
                            />
                            </a>
                        </div>
                        <CardBody>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <div className="author">
                                <CardTitle tag="h4">Varniethan Ketheeswaran</CardTitle>
                                <h6 className="card-category">Front-end developer</h6>
                            </div>
                            </a>
                            <p className="card-description text-center">
                            The best code is the one that never needs to be written, but when it is, it should be elegant and efficient.
                            </p>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button
                            className="btn-just-icon btn-neutral"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-twitter" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-google-plus" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-linkedin" />
                            </Button>
                        </CardFooter>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-profile card-plain">
                        <div className="card-avatar">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                src={require("assets/img/default-avatar.png")}
                            />
                            </a>
                        </div>
                        <CardBody>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <div className="author">
                                <CardTitle tag="h4">Oliwer Kolodziejczyk</CardTitle>
                                <h6 className="card-category">Scrum Master</h6>
                            </div>
                            </a>
                            <p className="card-description text-center">
                            Programming isn't just a job, it's a way of life that requires constant learning and adaptation.
                            </p>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button
                            className="btn-just-icon btn-neutral"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-twitter" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-google-plus" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-linkedin" />
                            </Button>
                        </CardFooter>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card className="card-profile card-plain">
                        <div className="card-avatar">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                src={require("assets/img/default-avatar.png")}
                            />
                            </a>
                        </div>
                        <CardBody>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <div className="author">
                                <CardTitle tag="h4">Maciej Kosela</CardTitle>
                                <h6 className="card-category">Front-end developer</h6>
                            </div>
                            </a>
                            <p className="card-description text-center">
                            Debugging is like being a detective in a crime movie where you're also the murderer.
                            </p>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button
                            className="btn-just-icon btn-neutral"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-twitter" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-google-plus" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-linkedin" />
                            </Button>
                        </CardFooter>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card className="card-profile card-plain">
                        <div className="card-avatar">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                src={require("assets/img/default-avatar.png")}
                            />
                            </a>
                        </div>
                        <CardBody>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <div className="author">
                                <CardTitle tag="h4">Nathan Lim</CardTitle>
                                <h6 className="card-category">Back-end Developer</h6>
                            </div>
                            </a>
                            <p className="card-description text-center">
                            Coding is not just about writing lines of code, it's about creating something that can make a difference in people's lives.
                            </p>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button
                            className="btn-just-icon btn-neutral"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-twitter" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-google-plus" />
                            </Button>
                            <Button
                            className="btn-just-icon btn-neutral ml-1"
                            color="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            >
                            <i className="fa fa-linkedin" />
                            </Button>
                        </CardFooter>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default SectionAboutUs;