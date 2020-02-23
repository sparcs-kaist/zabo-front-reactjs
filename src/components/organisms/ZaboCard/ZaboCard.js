import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import StatBox from 'molecules/StatBox';

import { getLabeledTimeDiff, to2Digits } from 'lib/utils';

import ZaboCardW, {
  DueDateW, OverlayW, PosterW, WritingsW,
} from './ZaboCard.styled';

const ZaboCard = ({ zaboId }) => {
  if (!zaboId) return null;
  const zaboImmutable = useSelector (state => state.getIn (['zabo', 'zabos', zaboId]));
  const zabo = useMemo (() => zaboImmutable.toJS (), [zaboImmutable]);
  const {
    _id, photos, title, owner, createdAt, schedules, views,
    likesCount, isLiked, pinsCount, isPinned,
  } = zabo;
  const schedule = schedules[0];

  const timePast = getLabeledTimeDiff (createdAt, true, true, true, true, false, false);
  const daysLeft = schedule ? moment (schedule.startAt).diff (moment (), 'days') : 0;

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
    <ZaboCardW>
      <Link to={`/zabo/${_id}`}>
        <PosterW
          style={{
            paddingTop: `${(photos[0].height / photos[0].width) * 100}%`,
          }}
        >
          <PosterW.Image width="100%" src={photos[0].url} alt="zabo" />
          <PosterW.Dimmer className="dimmer" />
          <OverlayW className="hover-show">
            <OverlayW.StatLocator>
              {stats.map (stat => (
                <StatBox className="stat-box" key={stat.type} type="text" stat={stat} />
              ))}
            </OverlayW.StatLocator>
          </OverlayW>
          {daysLeft > 0 && <DueDateW>D{to2Digits (-daysLeft, true)}</DueDateW>}

        </PosterW>
      </Link>
      <WritingsW>
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
      </WritingsW>
    </ZaboCardW>
  );
};

ZaboCard.propTypes = {
  zaboId: PropTypes.string.isRequired,
};

export default ZaboCard;
