import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ZaboList from 'templates/ZaboList';
import ZaboPageWrapper, { Zabo } from './ZaboPage.styled';
import { ZaboType } from '../../../lib/propTypes';
import { to2Digits } from '../../../lib/utils';

class ZaboPage extends PureComponent {
  render () {
    const { zabo, zaboId } = this.props;
    const {
      title, owner, endAt, createdAt, description, category = [], photos = [{}],
    } = zabo;
    const curMoment = moment ();
    const createdAtMoment = moment (createdAt);
    const minDiff = curMoment.diff (createdAtMoment, 'minutes');
    const hourDiff = curMoment.diff (createdAtMoment, 'hours');
    const daysDiff = curMoment.diff (createdAtMoment, 'days');
    const monthDiff = curMoment.diff (createdAtMoment, 'months');
    const due = moment (endAt).diff (curMoment, 'days');

    return (
      <ZaboPageWrapper>
        <div className="container">
          <Zabo>
            <Zabo.Poster meta={photos[0]}>
              <img width="100%" src={photos[0].url} alt="poster" />
            </Zabo.Poster>
            <Zabo.Writings>
              <div className="title">{title}</div>
              <div className="owner">{owner ? owner.name : 'annoymous'}</div>
              <div className="times">
                <div className="after-create">
                  {minDiff < 60 ? `${minDiff} minutes...`
                    : hourDiff < 24 ? `${hourDiff} hours...`
                      : daysDiff < 30 ? `${daysDiff} days ...`
                        : monthDiff}
                </div>
                <div className="due-date">D{to2Digits (-due, true)}</div>
              </div>
              <hr />
              <div className="description">{description}</div>
              <hr />
              <ul className="keyword-result">
                {category.map (cat => (
                  <li key={cat}>#{cat}</li>
                ))}
              </ul>
            </Zabo.Writings>
          </Zabo>
        </div>
        <ZaboList type="related" relatedTo={zaboId} key={zaboId} />
      </ZaboPageWrapper>
    );
  }
}

ZaboPage.propTypes = {
  zabo: PropTypes.shape (ZaboType).isRequired,
  zaboId: PropTypes.string.isRequired,
};

ZaboPage.defaultProps = {
};

export default ZaboPage;
