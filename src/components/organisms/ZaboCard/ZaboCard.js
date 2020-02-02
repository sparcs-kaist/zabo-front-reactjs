import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ZaboCardStyle from './ZaboCard.styled';
import StatBox from '../../molecules/StatBox';

import { getLabeledTimeDiff, to2Digits } from '../../../lib/utils';
import { ZaboType } from '../../../lib/propTypes';

const ZaboCard = ({ zabo }) => {
  const {
    _id, photos, title, owner, createdAt, endAt, views,
    likesCount, isLiked, pinsCount, isPinned,
  } = zabo;

  const timePast = getLabeledTimeDiff (createdAt, true, true, true, true, false, false);
  const daysLeft = moment (endAt).diff (moment (), 'days');

  const stats = [{
    type: 'like',
    count: likesCount,
    zaboId: _id,
    active: isLiked,
  }, {
    type: 'pin',
    count: pinsCount,
    zaboId: _id,
    active: isPinned,
  }];

  return (
    <ZaboCardStyle>
      <Link to={`/zabo/${_id}`}>
        <ZaboCardStyle.Poster
          style={{
            paddingTop: `${(photos[0].height / photos[0].width) * 100}%`,
          }}
        >
          <ZaboCardStyle.Poster.Image width="100%" src={photos[0].url} alt="zabo" />
          <ZaboCardStyle.Poster.Dimmer />
          <ZaboCardStyle.Poster.Overlay className="hover-show">
            <ZaboCardStyle.Poster.Overlay.StatLocator>
              {stats.map (stat => (
                <StatBox key={stat.type} type="text" stat={stat} />
              ))}
            </ZaboCardStyle.Poster.Overlay.StatLocator>
          </ZaboCardStyle.Poster.Overlay>
          {daysLeft > 0 && <ZaboCardStyle.DueDate>D{to2Digits (-daysLeft, true)}</ZaboCardStyle.DueDate>}

        </ZaboCardStyle.Poster>
      </Link>
      <ZaboCardStyle.Writings>
        <Link to={`/zabo/${_id}`}>
          <div className="title">
            <span>{title}</span>
          </div>
        </Link>
        <div className="card-meta">
          {timePast} &middot; {`조회수 ${(views || 0).toLocaleString ()}`}
        </div>
        <div className="author">
          <span><Link to={owner ? `/${owner.name}` : '#'}>{owner ? owner.name : 'anonymous'}</Link></span>
        </div>
      </ZaboCardStyle.Writings>
    </ZaboCardStyle>
  );
};

ZaboCard.propTypes = {
  zabo: ZaboType,
};

export default ZaboCard;
