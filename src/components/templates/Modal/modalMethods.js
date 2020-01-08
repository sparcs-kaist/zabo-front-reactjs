import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

const { body } = document;

export const showInstanceModal = ({ content, onCancel, ...props }) => {
  const container = document.createElement ('div');
  body.appendChild (container);

  const render = show => {
    ReactDOM.render (
      // eslint-disable-next-line no-use-before-define
      <Modal show={show} shownByMethod onCancel={_onCancel} onCanceled={unmount} {...props}>
        {content}
      </Modal>,
      container,
    );
  };

  const show = () => render (true);

  const hide = () => render (false);

  const unmount = () => {
    ReactDOM.unmountComponentAtNode (container);
    body.removeChild (container);
  };

  const _onCancel = () => {
    if (typeof onCancel === 'function') onCancel ();
    hide ();
  };

  show ();

  return hide;
};
