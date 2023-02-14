import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function SectionDark() {
  return (
    <>
      <div className="section section-dark">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">Why should you use mindbloom?</h2>
              <p className="description">
              Achieving and maintaining a sense of wellbeing requires taking care 
              of one's physical and mental health, as well as cultivating positive 
              relationships and engaging in meaningful activities. A focus on 
              wellbeing can lead to increased life satisfaction, improved 
              relationships, and a better quality of life.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionDark;
