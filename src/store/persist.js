import { List } from 'immutable';
import storage from 'lib/storage';
import serializer from '../lib/immutable';

const persistUpload = store => next => action => {
  const result = next (action);

  if (action.type.substring (0, 6) === 'upload') {
    const upload = store.getState ()
      .get ('upload')
      .delete ('step', 0)
      .delete ('imagesSelected')
      .delete ('infoWritten', false)
      .set ('images', List ([]));
    storage.setItem ('uploadPersist', serializer.stringify (upload));
  }

  return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
};

export default persistUpload;
