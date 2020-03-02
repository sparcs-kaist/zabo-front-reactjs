import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

import { CategoryListW, CategoryW } from 'atoms/Category';

import { ZaboType } from 'lib/propTypes';
import { isElemWidthOverflown } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import {
  MetaInfo, OwnerW,
  PosterLW, Title,
  WritingsLW, ZaboCardLW,
} from './ZaboCard.styled';

const PosterL = ({ zabo }) => {
  const [height, setHeight] = useState (174);
  const { photos } = zabo;

  return (
    <PosterLW
      ref={ref => { if (ref) setHeight (ref.clientHeight); }}
      style={{
        // paddingLeft: (photos[0].width / photos[0].height) * height,
      }}
    >
      <PosterLW.Image src={photos[0].url} alt="zabo" />
      <PosterLW.Dimmer className="dimmer" />
    </PosterLW>
  );
};

PosterL.propTypes = {
  zabo: ZaboType.isRequired,
};

const ZaboCardL = ({ zabo }) => {
  const {
    _id, category, title, owner, createdAt, views, effectiveViews,
  } = zabo;
  const width = useSelector (state => state.getIn (['app', 'windowSize', 'width']));
  const titleRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  useEffect (() => { setShowTooltip (isElemWidthOverflown (titleRef.current)); }, [width, titleRef]);
  const createdAtLabel = moment (createdAt).format ('YYYY-MM-DD');
  return (
    <ZaboCardLW>
      <div>
        <Link to={`/zabo/${_id}`} style={{ maxWidth: '50%', overflow: 'hidden' }}>
          <PosterL zabo={zabo} />
        </Link>
      </div>
      <WritingsLW>
        <CategoryListW>
          {category.slice (0, 3).map (cat => <CategoryW key={cat}># {cat}</CategoryW>)}
          {category.length > 3
            && (
              <Tooltip
                title={(
                  <CategoryListW>
                    {category.slice (3).map (cat => <CategoryW key={cat}># {cat}</CategoryW>)}
                  </CategoryListW>
                )}
                placement="top"
              >
                <CategoryW>&middot;&middot;&middot;</CategoryW>
              </Tooltip>
            )}
        </CategoryListW>
        {
          showTooltip
            ? (
              <Tooltip title={title}>
                <Title ref={titleRef}>{title}</Title>
              </Tooltip>
            )
            : <Title ref={titleRef}>{title}</Title>
        }
        <Link to={`/${owner.name}`}>
          <OwnerW>
            <OwnerW.Profile src={owner.profilePhoto || groupDefaultProfile} />
            <OwnerW.Name>{owner.name}</OwnerW.Name>
          </OwnerW>
        </Link>
        <MetaInfo>
          {createdAtLabel}
          <MetaInfo.Dot>
            &middot;
          </MetaInfo.Dot>
          <Tooltip title={`유효 조회수 ${effectiveViews}`}>
            <div>조회수 {views.toLocaleString ()}</div>
          </Tooltip>
        </MetaInfo>
      </WritingsLW>
    </ZaboCardLW>
  );
};

ZaboCardL.propTypes = {
  zabo: ZaboType.isRequired,
};

export default ZaboCardL;
