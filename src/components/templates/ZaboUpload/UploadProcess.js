import React, {
  useCallback, useEffect,
  useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { reset } from 'store/reducers/upload';
import { uploadZabo } from 'store/reducers/zabo';
import {
  cropImage, dataURLToBlob, gridLayoutCompareFunction, imageFileGetWidthHeight,
} from 'lib/utils';

const Loading = styled.div`
  margin: 24px 0;
  padding: 0 16px;
  width: 100%;
  display: flex;
`;
Loading.Active = styled.div`
  width: 0;
  border-top: 5px solid pink;
`;
Loading.Inactive = styled.div`
  flex: 1;
  border-top: 5px solid gainsboro;
`;

const UploadProcess = ({ children }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);
  const {
    title, description, hasSchedule, schedules, category,
  } = info;
  const imageFilesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const imageFiles = useMemo (() => imageFilesImmutable.toJS (), [imageFilesImmutable]);
  const [progress, setProgress] = useState (0);
  const [error, setError] = useState (null);

  const upload = useCallback (async () => {
    // e.preventDefault ();
    const sortedImageFiles = imageFiles.slice ();
    sortedImageFiles.sort (gridLayoutCompareFunction);
    const { width, height } = await imageFileGetWidthHeight (sortedImageFiles[0]);
    let ratio = width / height;
    if (ratio > 2) ratio = 2;
    else if (ratio < 0.5) ratio = 0.5;
    const formData = new FormData ();
    const sources = await Promise.all (sortedImageFiles.map (file => cropImage (file, ratio)));
    sources.forEach (imageSrc => {
      const blob = dataURLToBlob (imageSrc);
      formData.append ('img', blob);
    });
    formData.append ('title', title);
    formData.append ('description', description);
    if (hasSchedule) formData.append ('schedules', JSON.stringify (schedules));
    const uCats = category.filter (c => c.clicked).map (t => t.name).join ('#');
    formData.append ('category', uCats);

    // uploadZabo from this.props
    dispatch (
      uploadZabo (formData, percentCompleted => setProgress (percentCompleted)),
    )
      .then (zabo => {
        setProgress (0);
        history.push (`/zabo/${zabo._id}`);
        dispatch (reset ());
      })
      .catch (err => {
        console.error (err);
        setError (err);
        setProgress (0);
        alert (err.error);
      });
  }, [infoImmutable, imageFilesImmutable]);

  useEffect (() => {
    upload ();
  }, []);

  return React.Children.only (children (progress, error));
};

UploadProcess.propTypes = {
  children: PropTypes.func,
};

UploadProcess.defaultProps = {

};

export default UploadProcess;
