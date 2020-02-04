import React from 'react';
import { createLocation } from 'history';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import StyledButton, { ButtonGroup } from './Button.styled';

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class Link extends React.Component {
  handleClick = event => {
    if (this.props.onClick) this.props.onClick (event);

    if (
      !event.defaultPrevented // onClick prevented default
      && event.button === 0 // ignore everything but left clicks
      && !this.props.target // let browser handle "target=_blank" etc.
      && !isModifiedEvent (event) // ignore clicks with modifier keys
    ) {
      event.preventDefault ();

      const { history } = this.context.router;
      const { replace, to } = this.props;

      if (replace) {
        history.replace (to);
      } else {
        history.push (to);
      }
    }
  }

  render () {
    const {
      replace, to, innerRef, ...props
    } = this.props; // eslint-disable-line no-unused-vars

    invariant (this.context.router, 'You should not use <Link> outside a <Router>');

    invariant (to !== undefined, 'You must specify the "to" property');

    const { history } = this.context.router;
    const location = typeof to === 'string' ? createLocation (to, null, null, history.location) : to;

    const href = history.createHref (location);
    return <StyledButton {...props} onClick={this.handleClick} href={href} ref={innerRef} />;
  }
}

Link.contextType = {
  router: PropTypes.shape ({
    history: PropTypes.shape ({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

Link.defaultProps = {
  replace: false,
};

const Button = props => {
  if (props.to) return <Link {...props} />;
  return <StyledButton {...props} />;
};

Button.propTypes = {
  // type: PropTypes.oneOf(["blue", "blueBorder", "white", "whiteBorder", "redBorder"]),
  // size: PropTypes.oneOf(["large", "normal", "small", "x-small"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

Button.defaultProps = {};

Button.Group = ButtonGroup;

export default Button;
