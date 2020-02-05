import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { FooterStyle, PageWrapper, TitleStyle } from '../ZaboUploadPage/ZaboUploadPage.styled';
import rightGrayArrow from '../../../static/images/rightGrayArrow.png';
import ZaboUpload from '../../templates/ZaboUpload';
import Footer from '../../templates/Footer';
import withZabo from './withZabo';
import useSetState from '../../../hooks/useSetState';
import { CATEGORIES } from '../../../lib/variables';
import { ZaboType } from '../../../lib/propTypes';

const SlideTitle = () => {
  const titleList = ['그룹 선택하기', '자보올리기', '정보 입력하기'];

  const titleTemplate = titleList.map ((elem, idx) => (
    <TitleStyle.elem key={elem}>
      <p>{ idx + 1 }. { elem }</p>
      { idx !== 2 ? <img src={rightGrayArrow} alt="right arrow" /> : '' }
    </TitleStyle.elem>
  ));
  return (
    <TitleStyle>
      { titleTemplate }
    </TitleStyle>
  );
};

const FooterChild = ({ isValid, submit }) => (
  <FooterStyle>
    <div className="container">
      <div className="slide-action-group">
        <button type="button" className="next" onClick={submit} disabled={!isValid}>
           제출하기
        </button>
      </div>
    </div>
  </FooterStyle>
);

FooterChild.propTypes = {
  isValid: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

const ZaboEditPage = ({ zabo }) => {
  useEffect (() => {
    window.onbeforeunload = () => true;
  }, []);
  const { photos: [{ url: preview }] } = zabo;
  const catWithSharp = zabo.category.map (cat => `#${cat}`);
  const newCat = CATEGORIES.map (tag => ({ name: tag, clicked: catWithSharp.indexOf (tag) >= 0 }));
  const [state, setState] = useSetState ({
    title: zabo.title,
    description: zabo.description,
    endAt: zabo.endAt,
    category: newCat,
  });
  const {
    title, description, endAt, category,
  } = state;

  const submit = useCallback (() => {
  }, []);

  const isValid = title && description && endAt;

  return (
    <PageWrapper>
      <Prompt
        when
        message="저장되지 않은 변경 사항이 있습니다. 페이지를 떠나시겠습니까?"
      />
      <PageWrapper.Contents>
        <SlideTitle />
        <ZaboUpload.InfoForm.Form
          state={state}
          setState={setState}
          preview={preview}
        />
      </PageWrapper.Contents>
      <Footer scrollFooter>
        <FooterChild isValid={isValid} submit={submit} />
      </Footer>
    </PageWrapper>
  );
};

ZaboEditPage.propTypes = {
  zabo: ZaboType.isRequired,
};

export default withZabo (ZaboEditPage, true);
