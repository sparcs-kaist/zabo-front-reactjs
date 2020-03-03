import React from 'react';
import { Link } from 'react-router-dom';

import DueDate from 'atoms/DueDate';
import StatBox from 'molecules/StatBox';

import { ZaboType } from 'lib/propTypes';
import { getLabeledTimeDiff, to2Digits } from 'lib/utils';

import ZaboCardW, {
  OverlayW, PosterW, WritingsW,
} from './ZaboCard.styled';

const Poster = ({ zabo }) => {
  const {
    _id, photos, title, owner, createdAt, schedules, views,
    likesCount, isLiked, pinsCount, isPinned,
  } = zabo;
  const schedule = schedules[0];

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
      <DueDate schedule={schedule ? schedule.startAt : null} />
    </PosterW>
  );
};

Poster.propTypes = {
  zabo: ZaboType.isRequired,
};

const Writing = ({ zabo }) => {
  const {
    _id, photos, title, owner, createdAt, schedules, views,
    likesCount, isLiked, pinsCount, isPinned,
  } = zabo;

  const timePast = getLabeledTimeDiff (createdAt, true, true, true, true, false, false);

  return (
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
  );
};
Writing.propTypes = {
  zabo: ZaboType.isRequired,
};

const ZaboCardM = ({ zabo }) => {
  const { _id } = zabo;
  return (
    <ZaboCardW>
      <Link to={`/zabo/${_id}`}>
        <Poster zabo={zabo} />
      </Link>
      <Writing zabo={zabo} />
    </ZaboCardW>
  );
};

ZaboCardM.propTypes = {
  zabo: ZaboType.isRequired,
};

export default ZaboCardM;
