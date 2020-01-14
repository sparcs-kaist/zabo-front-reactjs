import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setModal } from '../../../store/reducers/upload';

const LeavingAlert = () => {
  const dispatch = useDispatch ();
  const showModal = useSelector (state => state.getIn (['upload', 'showModal']));
  useEffect (() => {
    if (showModal) {
      alert ('데이터를 저장하시겠습니까?');
      dispatch (reset ());
      dispatch (setModal (false));
    }
  }, [showModal]);
  return null;
};

export default LeavingAlert;
