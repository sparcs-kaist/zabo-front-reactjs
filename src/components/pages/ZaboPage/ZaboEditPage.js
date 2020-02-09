import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Prompt, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Footer from 'templates/Footer';
import ZaboUpload from 'templates/ZaboUpload';

import { patchZabo } from 'store/reducers/zabo';
import { ZaboType } from 'lib/propTypes';
import { CATEGORIES } from 'lib/variables';

import rightGrayArrow from 'static/images/rightGrayArrow.png';

import useSetState from '../../../hooks/useSetState';
import { FooterStyle, PageWrapper, TitleStyle } from '../ZaboUploadPage/ZaboUploadPage.styled';
import withZabo from './withZabo';

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

const ZaboEditPage = ({ zaboId, zabo }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const [changed, setChanged] = useState (false);
  const [submit, setSubmit] = useState (false);
  useEffect (() => {
    window.onbeforeunload = () => (changed ? true : undefined);
  }, [changed]);
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
    title, description, endAt,
  } = state;

  useEffect (() => {
    if (!submit) return;
    if (changed) {
      setChanged (false);
      return;
    }
    const data = { ...state };
    data.category = data.category.filter (t => t.clicked).map (t => t.name).join ('');
    dispatch (patchZabo ({ zaboId, data }))
      .then (() => {
        history.push (`/zabo/${zaboId}`);
      });
  }, [state, submit, changed]);

  const isValid = !!(title && description && endAt);

  useEffect (() => {
    if (zabo.title !== title || zabo.description !== description || zabo.endAt !== endAt) {
      setChanged (true);
    }
  }, [state]);

  return (
    <PageWrapper>
      <Prompt
        when={changed}
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
        <FooterChild isValid={isValid} submit={() => setSubmit (true)} />
      </Footer>
    </PageWrapper>
  );
};

ZaboEditPage.propTypes = {
  zaboId: PropTypes.string.isRequired,
  zabo: ZaboType.isRequired,
};

export default withZabo (ZaboEditPage, true);
