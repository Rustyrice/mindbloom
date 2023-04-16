import React from "react";

// reactstrap components
import {
    Container,
    Row,
    Col
  } from "reactstrap";

function SectionCards() {
    return (
        <>
        <br />
        <br />
        <br />
        <Container>
            <Row>
                <Col md="4">
                    <div className="info">
                        <div className="icon icon-info">
                        <i className="nc-icon nc-planet" />
                        </div>
                        <div className="description">
                        <h4 className="info-title">Get more goodnights</h4>
                        <p className="description">
                        Put your mind to bed, wake up refreshed, and make good days your new normal.
                        </p>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="info">
                        <div className="icon icon-info">
                        <i className="nc-icon nc-ruler-pencil" />
                        </div>
                        <div className="description">
                        <h4 className="info-title">Have better focus</h4>
                        <p>
                        Catch your breath, relax your mind, and feel 14% less stressed during exams.
                        </p>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="info">
                        <div className="icon icon-info">
                        <i className="nc-icon nc-sun-fog-29" />
                        </div>
                        <div className="description">
                        <h4 className="info-title">Make every day happier</h4>
                        <p>
                        Do it for yourself, and everyone you love. It only takes a few minutes to have your mindbloom.
                        </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default SectionCards;