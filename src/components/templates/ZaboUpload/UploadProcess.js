import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Loading from './Loading';

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

const UploadProcess = (props) => {
  const dispatch = useDispatch ();
  const infoImmutable = useSelector (state => state.getIn (['upload', 'info']));
  const info = infoImmutable.toJS ();
  const imageFilesImmutable = useSelector (state => state.getIn (['upload', 'images']));
  const imageFiles = imageFilesImmutable.toJS ();
  const sortedImageFiles = imageFiles.slice ();
  sortedImageFiles.sort (gridLayoutCompareFunction);

  return (
    <ProcessWrapper>
      <div className="container">
        <div className="preview">
          {imageFiles.map (file => (
            <div className="preview-item">
              <img src={file.preview} alt="preview item" />
            </div>
          ))}
        </div>
      </div>
      <Loading />
    </ProcessWrapper>
  );
};

UploadProcess.propTypes = {
};

UploadProcess.defaultProps = {

};

const Optimizer = (props) => {
  const { currentStep } = props;
  if (currentStep !== 3) return null;
  return <UploadProcess />;
};

Optimizer.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

Optimizer.defaultProps = {

};

export default Optimizer;
