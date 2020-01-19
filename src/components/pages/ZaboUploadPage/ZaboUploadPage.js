import React, {
  useCallback, useEffect, useRef, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRouteMatch, Prompt,
} from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ZaboUpload from '../../templates/ZaboUpload';
import Header from '../../templates/Header';
import {
  setStep as setReduxStep, setGroupSelected, setImagesSeleted, setInfoWritten, reset,
} from '../../../store/reducers/upload';

import {
  PageWrapper, TitleStyle, FooterStyle,
} from './ZaboUploadPage.styled';
import rightArrow from '../../../static/images/rightArrow.png';
import leftArrow from '../../../static/images/leftArrow.png';

const OptimizedSlider = forwardRef ((props, ref) => {
  const { children, ...others } = props;
  if (Array.isArray (children)) {
    return (
      <Slider {...others} ref={ref}>
        {children[props.step]}
      </Slider>
    );
  }
  return (
    <Slider {...others} ref={ref}>
      {children}
    </Slider>
  );
});

OptimizedSlider.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.arrayOf (PropTypes.element),
  step: PropTypes.number.isRequired,
};

OptimizedSlider.defaultProps = {
};

const SlideTitle = () => {
  const titleList = ['그룹 선택하기', '자보올리기', '정보 입력하기', '업로드 완료'];

  const titleTemplate = titleList.map ((elem, idx) => (
    <div key={elem}>
      <p>{ idx + 1 }. { elem }</p>
      { idx !== 3 ? <img src={rightArrow} alt="right arrow" /> : '' }
    </div>
  ));
  return (
    <TitleStyle>
      { titleTemplate }
    </TitleStyle>
  );
};

const SlideView = ({ step }) => {
  const slick = useRef (null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    initialSlide: step,
  };

  useEffect (() => {
    slick.current.slickGoTo (step);
  }, [step]);

  return (
    <Slider step={step} {...settings} ref={slick}>
      <ZaboUpload.SelectGroup />
      <ZaboUpload.UploadImage />
      <ZaboUpload.InfoForm />
      <ZaboUpload.UploadProcess step={step} />
    </Slider>
  );
};

SlideView.propTypes = {
  step: PropTypes.number.isRequired,
};

const Footer = (props) => {
  const { prev, next, step } = props;
  const dispatch = useDispatch ();
  const currentGroup = useSelector (state => state.getIn (['auth', 'info', 'currentGroup']));
  const filesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const info = infoImmutable.toJS ();
  const { title, desc, expDate } = info;

  const validatedNext = useCallback (() => {
    if (step === 0) {
      dispatch (setGroupSelected (true));
    } else if (step === 1) {
      dispatch (setImagesSeleted (true));
    } else if (step === 2) {
      dispatch (setInfoWritten (true));
    }
    next ();
  }, [step, currentGroup, filesImmutable, infoImmutable]);

  const validCheck = useCallback (() => {
    if (step === 0) {
      return !!currentGroup;
    } if (step === 1) {
      return !!filesImmutable.size;
    } if (step === 2) {
      return (title && desc && expDate);
    }
    return false;
  }, [step, currentGroup, filesImmutable, infoImmutable]);

  const isValid = validCheck ();

  return (
    <FooterStyle>
      <div className="container">
        <div className="slide-action-group">
          {step > 0 && <button className="prev" onClick={prev}>{'<'} 이전</button>}
          <button className="next" onClick={validatedNext} disabled={!isValid}>제출하기</button>
        </div>
      </div>
    </FooterStyle>
  );
};

Footer.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const ZaboUploadPage = () => {
  const match = useRouteMatch ();
  const dispatch = useDispatch ();
  const step = useSelector (state => state.getIn (['upload', 'step']));
  const { infoWritten, groupSelected, imagesSelected } = useSelector (state => state.get ('upload')).toJS ();
  const setStep = (step => dispatch (setReduxStep (step)));
  useEffect (() => {
    const newStep = !groupSelected ? 0 : !imagesSelected ? 1 : !infoWritten ? 2 : 3;
    setStep (newStep);
  }, [groupSelected, imagesSelected, infoWritten]);
  const next = useCallback (() => setStep (step + 1), [step]);
  const prev = useCallback (() => setStep (step - 1), [step]);
  const slideActions = { next, prev };

  useEffect (() => {
    // window.onbeforeunload = () => true;
    // window.onbeforeunload = undefined
  }, []);

  useEffect (() => () => {
    dispatch (reset ());
  }, []);

  return (
    <PageWrapper>
      <Header rightGroup={<Header.AuthButton />} />
      <Prompt
        when
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <PageWrapper.Contents>
        <SlideTitle />
        <SlideView step={step} />
      </PageWrapper.Contents>
      <Footer {...slideActions} step={step} />
    </PageWrapper>
  );
};

export default ZaboUploadPage;
