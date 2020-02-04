import React, {
  useCallback, useEffect, useRef, forwardRef, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRouteMatch, Prompt,
} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import ZaboUpload from '../../templates/ZaboUpload';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';
import {
  setStep as setReduxStep, setGroupSelected, setImagesSeleted, setInfoWritten, reset,
} from '../../../store/reducers/upload';

import {
  PageWrapper, TitleStyle, FooterStyle,
} from './ZaboUploadPage.styled';
import rightArrow from '../../../static/images/rightArrow.png';
import rightGrayArrow from '../../../static/images/rightGrayArrow.png';

const SlideTitle = ({ step }) => {
  const titleList = ['그룹 선택하기', '자보올리기', '정보 입력하기'];

  const titleTemplate = titleList.map ((elem, idx) => (
    <TitleStyle.elem key={elem} step={idx <= step}>
      <p>{ idx + 1 }. { elem }</p>
      { idx !== 2 ? <img src={idx < step ? rightArrow : rightGrayArrow} alt="right arrow" /> : '' }
    </TitleStyle.elem>
  ));
  return (
    <TitleStyle>
      { titleTemplate }
    </TitleStyle>
  );
};

const SlideView = ({ step }) => (
  <SwipeableViews disabled index={step}>
    <ZaboUpload.SelectGroup />
    <ZaboUpload.UploadImage />
    <ZaboUpload.InfoForm />
    <ZaboUpload.UploadProcess step={step} />
  </SwipeableViews>
);

SlideView.propTypes = {
  step: PropTypes.number.isRequired,
};

const FooterChild = (props) => {
  const { prev, next, step } = props;
  const dispatch = useDispatch ();
  const currentGroup = useSelector (state => state.getIn (['auth', 'info', 'currentGroup']));
  const filesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);
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
  const isSubmit = step >= 2;

  return (
    <FooterStyle>
      <div className="container">
        <div className="slide-action-group">
          {step > 0 && <button type="button" className="prev" onClick={prev}>{'<'} 이전</button>}
          <button type="button" className={`next ${isSubmit}`} onClick={validatedNext} disabled={!isValid}>
            { isSubmit ? '제출하기' : '다음' }
          </button>
        </div>
      </div>
    </FooterStyle>
  );
};

FooterChild.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const ZaboUploadPage = () => {
  const dispatch = useDispatch ();
  const step = useSelector (state => state.getIn (['upload', 'step']));
  const setStep = (newStep => dispatch (setReduxStep (newStep)));
  const next = useCallback (() => setStep (step + 1), [step]);
  const prev = useCallback (() => setStep (step - 1), [step]);
  const slideActions = { next, prev };

  // useEffect (() => {
  //   window.onbeforeunload = () => true;
  //   // window.onbeforeunload = undefined;
  // }, []);

  useEffect (() => () => {
    dispatch (reset ());
  }, []);

  return (
    <PageWrapper>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Prompt
        when
        message="저장되지 않은 변경 사항이 있습니다. 페이지를 떠나시겠습니까?"
      />
      <PageWrapper.Contents>
        <SlideTitle step={step} />
        <SlideView step={step} />
      </PageWrapper.Contents>
      <Footer scrollFooter>
        <FooterChild {...slideActions} step={step} />
      </Footer>
    </PageWrapper>
  );
};

export default ZaboUploadPage;
