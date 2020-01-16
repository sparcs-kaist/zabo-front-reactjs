import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ZaboCardStyle from './ZaboCard.styled';

import { to2Digits } from '../../../lib/utils';
import { ZaboType } from '../../../lib/propTypes';

const ZaboCard = ({ zabo }) => {
  const {
    _id, photos, title, owner, endAt,
  } = zabo;
  const diff = moment (endAt).diff (moment (), 'days');

  return (
    <ZaboCardStyle>
      <Link to={`/zabo/${_id}`}>
        <ZaboCardStyle.Poster
          style={{
            paddingTop: `${(photos[0].height / photos[0].width) * 100}%`,
          }}
        >
          <img width="100%" src={photos[0].url} alt="zabo" />
        </ZaboCardStyle.Poster>
      </Link>
      <ZaboCardStyle.Writings>
        <div className="top">
          <Link to={`/zabo/${_id}`}>
            <div className="title">{title}</div>
          </Link>
          {diff > 0 && <div className="due-date">D{to2Digits (-diff, true)}</div>}
        </div>
        <div>
          <Link to={owner ? `/${owner.name}` : '#'}>
            <span className="author">{owner ? owner.name : 'anonymous'}</span>
          </Link>
        </div>
      </ZaboCardStyle.Writings>
    </ZaboCardStyle>
  );
};

ZaboCard.propTypes = {
  zabo: PropTypes.shape (ZaboType),
};

export default ZaboCard;
