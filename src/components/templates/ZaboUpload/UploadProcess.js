import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import LoadingDialog from './Loading';

import { uploadZabo } from '../../../store/reducers/zabo';
import { gridLayoutCompareFunction } from '../../../lib/utils';

const ProcessWrapper = styled.section`
  width: 100%;
  .container {
    margin: 0 auto;
  }
  
  .preview {
    display: flex;
    flex-wrap: wrap;
    .preview-item {
      min-width: 0;
      height: auto;
      overflow: visible hidden;
      border: 1px solid #101010;
      margin-right: 12px;
      margin-bottom: 12px;
      img {
        display: block;
        width: 200px;
        height: auto;
      }
    }
  }
`;

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

const UploadProcess = (props) => {
  const dispatch = useDispatch ();
  const [progress, setProgress2] = useState (0);
  const setProgress = x => { console.log ({ x }); setProgress2 (x); };
  const [error, setError] = useState (null);
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const info = infoImmutable.toJS ();
  const {
    title, desc, expDate, tags,
  } = info;
  const imageFilesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const imageFiles = imageFilesImmutable.toJS ();
  const sortedImageFiles = imageFiles.slice ();
  sortedImageFiles.sort (gridLayoutCompareFunction);

  const upload = useCallback (e => {
    e.preventDefault ();
    const formData = new FormData ();
    Array.from (sortedImageFiles).forEach (file => {
      // FileList => Array 로
      formData.append ('img', file);
    });
    formData.append ('title', title);
    formData.append ('description', desc);
    formData.append ('endAt', expDate);
    const uTags = tags.filter (t => t.clicked).map (t => t.name).join ('');
    formData.append ('category', uTags);

    // uploadZabo from this.props
    dispatch (
      uploadZabo (formData, percentCompleted => setProgress (percentCompleted)),
    )
      .then (res => {
        console.log (res.data);
        // this.props.history.push ('/');
      })
      .catch (err => {
        console.error (err);
        setError (err);
        setProgress (0);
      });
  }, [infoImmutable, imageFilesImmutable]);

  return (
    <ProcessWrapper>
      <div className="container">
        <button onClick={upload}>Confirm</button>
        {progress && <h1>{progress}</h1>}
        {error && <div className="error">{error.message}</div>}
      </div>
      {!!progress && (
        <Loading>
          <Loading.Active style={{ width: `${progress}%` }} />
          <Loading.Inactive />
        </Loading>
      )}
      {progress === 100 && '성공'}
      {progress && <LoadingDialog />}
    </ProcessWrapper>
  );
};

UploadProcess.propTypes = {
};

UploadProcess.defaultProps = {

};

const Optimizer = (props) => {
  const { step } = props;
  if (step !== 3) return null;
  return <UploadProcess />;
};

Optimizer.propTypes = {
  step: PropTypes.number.isRequired,
};

Optimizer.defaultProps = {

};

export default Optimizer;
