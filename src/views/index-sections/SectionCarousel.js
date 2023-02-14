import React from "react";

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

// core components

const items = [
  {
    src: require("assets/img/jane.jpg"),
    altText: '"Mindbloom provides me with a connection to myself, and a disconnection from negative thoughts, feelings, and sensations."',
    caption: '"Mindbloom provides me with a connection to myself, and a disconnection from negative thoughts, feelings, and sensations."'
  },
  {
    src: require("assets/img/mark.jpg"),
    altText: '"Changing my thoughts has allowed me to change my life."',
    caption: '"Changing my thoughts has allowed me to change my life."'
  },
  {
    src: require("assets/img/phil.jpg"),
    altText: '"I was broken … then someone told me to try meditation."',
    caption: '"I was broken … then someone told me to try meditation."'
  }
];

function SectionCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="section pt-o" id="carousel">
          <Container>
            <div className="title">
              <h3>Mindbloom Stories</h3>
            </div>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <Card className="page-carousel">
                  <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                  >
                    <CarouselIndicators
                      items={items}
                      activeIndex={activeIndex}
                      onClickHandler={goToIndex}
                    />
                    {items.map((item) => {
                      return (
                        <CarouselItem
                          onExiting={onExiting}
                          onExited={onExited}
                          key={item.src}
                        >
                          <img src={item.src} alt={item.altText} />
                          <CarouselCaption
                            captionText={item.caption}
                            captionHeader=""
                          />
                        </CarouselItem>
                      );
                    })}
                    <a
                      className="left carousel-control carousel-control-prev"
                      data-slide="prev"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        previous();
                      }}
                      role="button"
                    >
                      <span className="fa fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="right carousel-control carousel-control-next"
                      data-slide="next"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        next();
                      }}
                      role="button"
                    >
                      <span className="fa fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </a>
                  </Carousel>
                </Card>
              </Col>
            </Row>
          </Container>
      </div>{" "}
    </>
  );
}

export default SectionCarousel;
