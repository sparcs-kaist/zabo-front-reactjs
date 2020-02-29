import React, {
  useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Prompt, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import isEqual from 'lodash.isequal';

import Footer from 'templates/Footer';
import ZaboUpload from 'templates/ZaboUpload';
import { FooterStyle, PageWrapper } from 'pages/ZaboUploadPage/ZaboUploadPage.styled';

import { defaultSchedule } from 'store/reducers/upload';
import { patchZabo } from 'store/reducers/zabo';
import withZabo from 'hoc/withZabo';
import useSetState from 'hooks/useSetState';
import { ZaboType } from 'lib/propTypes';
import { ZABO_CATEGORIES } from 'lib/variables';

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
  const newCat = ZABO_CATEGORIES.map (tag => ({ name: tag, clicked: zabo.category.indexOf (tag) >= 0 }));

  const prevSchedules = zabo.schedules.length ? zabo.schedules : [defaultSchedule];
  const prevHasSchedule = !!zabo.schedules.length;
  const [state, setState] = useSetState ({
    title: zabo.title,
    description: zabo.description,
    schedules: prevSchedules,
    category: newCat,
    hasSchedule: prevHasSchedule,
  });
  const {
    title, description, schedules, hasSchedule,
  } = state;

  useEffect (() => {
    if (!submit) return;
    if (changed) {
      setChanged (false);
      return;
    }
    const data = { ...state };
    if (!hasSchedule) delete data.schedules;
    data.category = data.category.filter (t => t.clicked).map (t => t.name).join ('#');
    dispatch (patchZabo ({ zaboId, data }))
      .then (() => {
        history.push (`/zabo/${zaboId}`);
      });
  }, [state, submit, changed]);

  const isValid = useMemo (() => {
    const zaboValid = (title && description);
    if (!hasSchedule) return zaboValid;
    const schedule = schedules[0];
    const { title: scheduleTitle, startAt, eventType } = schedule;
    const scheduleValid = (scheduleTitle && startAt && eventType);
    return zaboValid && scheduleValid;
  }, [state]);

  useEffect (() => {
    if (
      zabo.title !== title
      || zabo.description !== description
      || !isEqual (prevSchedules, schedules)
    ) {
      setChanged (true);
    } else {
      setChanged (false);
    }
  }, [state]);

  return (
    <PageWrapper>
      <Prompt
        when={changed}
        message="저장되지 않은 변경 사항이 있습니다. 페이지를 떠나시겠습니까?"
      />
      <PageWrapper.Contents>
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
