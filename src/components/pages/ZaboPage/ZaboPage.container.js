import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import ZaboPage from './ZaboPage';

import { getZabo } from '../../../store/reducers/zabo';

class ZaboPageContainer extends PureComponent {
  componentDidMount () {
    const { zaboId } = this.props;
    this.props.getZabo (zaboId);
  }

  render () {
    return <ZaboPage {...this.props} />;
  }
}

ZaboPageContainer.propTypes = {
  getZabo: PropTypes.func.isRequired,
  zaboId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { zaboId } = ownProps;
  return {
    zabo: state.getIn (['zabo', 'zabos', zaboId]),
  };
};

const mapDispatchToProps = {
  getZabo,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (ZaboPageContainer));
