type State = object;
interface IAction {
  type : string;
  [key : string] : any;
}
interface IReducer {
  (state : State, action : IAction) : State;
}
interface IListener {
  (state : State) : void;
}

const createStore = (reducer : IReducer) => {
  let state : State = {};
  let listeners : IListener[] = [];

  const getState = () => state;
  const dispatch = (action : IAction) => {
    state = reducer (state, action);
    listeners.forEach (listener => listener (state));
  };
  const subscribe = (listener : IListener) => {
    listeners.push (listener);
    return () => {
      listeners = listeners.filter (l => l !== listener);
    };
  };
  dispatch ({ type: 'Init' });
  return {
    getState,
    dispatch,
    subscribe,
  };
};

const reducer = (
  state : State = {
    /* Prev State */
  },
  action : IAction,
) => ({
  // New State
});

export default createStore;

/*
{
  showVisualText: false,
  app: {

  },
  todo: {

  }
}

ADD_TODO : 아이템을 추가
DELETE_TODO : 아이템을 삭제
UPDATE_TODO : 아이템을 업데이트

SHOW_TEXT: 텍스트를 보이게 한다
HIDE_TEXT: 텍스트를 감춘다.

*/
