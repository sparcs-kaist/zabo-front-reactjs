import { Store } from 'redux';
import { Action } from 'redux-actions';

import storage from 'lib/storage';

const persistUpload = (store : Store) => (next : (action : Action<any>) => any) => (action : Action<any>) => {
  const result = next (action);

  if (action.type.substring (0, 6) === 'upload') {
    const { upload } = store.getState ();
    const {
      step, imagesSelected, submitted, ...persisted
    } = upload;
    persisted.images = [];
    persisted.date = new Date ();
    storage.setItem ('uploadPersist', JSON.stringify (persisted));
  }

  return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
};

export default persistUpload;
