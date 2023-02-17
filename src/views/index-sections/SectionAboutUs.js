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
                            Teamwork is so important that it is virtually impossible
                            for you to reach the heights of your capabilities or make
                            the money that you want without becoming very good at it.
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
                            Teamwork is so important that it is virtually impossible
                            for you to reach the heights of your capabilities or make
                            the money that you want without becoming very good at it.
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
                                <h6 className="card-category">Back-end developer</h6>
                            </div>
                            </a>
                            <p className="card-description text-center">
                            Teamwork is so important that it is virtually impossible
                            for you to reach the heights of your capabilities or make
                            the money that you want without becoming very good at it.
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
                            A group becomes a team when each member is sure enough of
                            himself and his contribution to praise the skill of the
                            others. No one can whistle a symphony. It takes an
                            orchestra to play it.
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
                            The strength of the team is each individual member. The
                            strength of each member is the team. If you can laugh
                            together, you can work together, silence isn’t golden,
                            it’s deadly.
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