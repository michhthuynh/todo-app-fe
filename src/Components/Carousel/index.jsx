import React from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Carousel.scss'
CarouselComponent.propTypes = {

};

function CarouselComponent(props) {
  const renderPrev = (onClickHandler, hasPrev, label) => {
    return (
      <button type="button" onClick={onClickHandler} title={label} id='prev-btn' className={hasPrev ? "btn" : "btn disabled"}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    )
  }

  const renderNext = (onClickHandler, hasNext, label) => {
    return (
      <button type="button" onClick={onClickHandler} title={label} id='next-btn' className={hasNext ? "btn" : "btn disabled"}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    )
  }

  return (
    <Carousel
      className="carousel__main"
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={renderPrev}
      renderArrowNext={renderNext}
    >
      <div>
        <img src="https://image.freepik.com/free-vector/list-goals-complete-concept-illustration-cartoon-flat-tiny-people-group-planning-standing-near-checklist-planner-paper-document-marking-completed-business-tasks-isolated_213110-496.jpg" alt="#" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="/static/media/hero-a.0ffdd091.svg" alt="#" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="/static/media/hero-a.0ffdd091.svg" alt="#" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}

export default CarouselComponent;