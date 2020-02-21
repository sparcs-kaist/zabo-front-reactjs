/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import { addWindowResizeListener } from 'lib/utils/throttle';
import { setWindowSize } from 'store/reducers/app';

class WindowResizeListener extends React.Component {
  listener = () => {}

  componentDidMount () {
    const { setWindowSize } = this.props;

    this.listener = addWindowResizeListener (({ width, height }) => {
      setWindowSize ({ width, height });
    });
  }

  componentWillUnmount () {
    this.listener ();
  }

  render () {
    return null;
  }
}

const mapStateToProps = state => ({
  windowSize: state.getIn (['app', 'windowSize']),
});

const mapDispatchToProps = {
  setWindowSize,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (WindowResizeListener));
