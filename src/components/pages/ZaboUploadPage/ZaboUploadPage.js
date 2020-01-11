import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ZaboUpload from '../../templates/ZaboUpload';

const SlideComponent = styled.div``;

const SlideViewWrapper = styled.div``;

const SlideView = ({ currentStep }) => {
  const slick = useRef (null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    initialSlide: currentStep,
  };

  useEffect (() => {
    slick.current.slickGoTo (currentStep);
  }, [currentStep]);

  const next = useCallback (() => slick.current.slickNext (), []);
  const prev = useCallback (() => slick.current.slickPrev (), []);
  const slideActions = { next, prev };

  return (
    <>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      <Slider {...settings} ref={slick}>
        <ZaboUpload.SelectGroup />
        <ZaboUpload.UploadImage />
        <ZaboUpload.InfoForm />
        <ZaboUpload.UploadProcess currentStep={currentStep} />
      </Slider>
    </>
  );
};

SlideView.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

const ZaboUploadPage = () => {
  const match = useRouteMatch ();
  const { infoWritten, groupSelected, imagesSelected } = useSelector (state => state.get ('upload')).toJS ();
  const currentStep = !groupSelected ? 0 : !imagesSelected ? 1 : !infoWritten ? 2 : 3;

  return (
    <div>
      <div>Step 1 &gt; Step 2 &gt; Step 3 &gt; Step 4</div>
      <SlideView currentStep={currentStep} />
    </div>
  );
};

export default ZaboUploadPage;
