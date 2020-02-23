import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { CategoryListW, CategoryW } from 'atoms/Category';

import { ZaboType } from 'lib/propTypes';

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
        paddingLeft: (photos[0].width / photos[0].height) * height,
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
    _id, category, title, owner, createdAt, views,
  } = zabo;

  const createdAtLabel = moment (createdAt).format ('YYYY-MM-DD');
  return (
    <ZaboCardLW>
      <Link to={`/zabo/${_id}`} style={{ maxWidth: '50%', overflow: 'hidden' }}>
        <PosterL zabo={zabo} />
      </Link>
      <WritingsLW>
        <CategoryListW>
          {category.map (cat => <CategoryW># {cat}</CategoryW>)}
        </CategoryListW>
        <Title>{title}</Title>
        <OwnerW>
          <OwnerW.Profile src={owner.profilePhoto} />
          <OwnerW.Name>{owner.name}</OwnerW.Name>
        </OwnerW>
        <MetaInfo>
          {createdAtLabel}
          <MetaInfo.Dot>
            &middot;
          </MetaInfo.Dot>
          조회수 {views.toLocaleString ()}
        </MetaInfo>
      </WritingsLW>
    </ZaboCardLW>
  );
};

ZaboCardL.propTypes = {
  zabo: ZaboType.isRequired,
};

export default ZaboCardL;
