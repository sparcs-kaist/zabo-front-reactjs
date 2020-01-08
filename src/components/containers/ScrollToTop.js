/* eslint-disable */
import { PureComponent } from 'react';

class ScrollToTop extends PureComponent {
  componentDidUpdate (prevProps) {
    if (this.props.match.params.route !== prevProps.match.params.route) window.scrollTo (0, 0);
    else if (
      this.props.updateWithPath
      && this.props.location.pathname !== prevProps.location.pathname
    ) window.scrollTo (0, 0);
  }

  render () {
    return null;
  }
}

export default ScrollToTop;
