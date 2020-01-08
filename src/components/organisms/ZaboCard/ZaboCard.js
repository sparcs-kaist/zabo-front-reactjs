/* eslint-disable */
import React from 'react';

import { Link } from 'react-router-dom';
import ZaboCard from './ZaboCard.styled';

export default ({ zabo }) => (
  <ZaboCard>
    <Link to={`/zabo/${zabo._id}`}>
      <ZaboCard.Poster
        style={{
            paddingTop: `${(zabo.photos[0].height / zabo.photos[0].width) * 100}%`,
        }}
      >
        <img width="100%" src={zabo.photos[0].url} alt="zabo" />
      </ZaboCard.Poster>
    </Link>
    <ZaboCard.Writings>
      <Link to={`/zabo/${zabo._id}`}>
        <div className="title">{zabo.title}</div>
      </Link>
      <Link to="/zabo/upload">
        <div className="author">{zabo.owner === undefined ? 'anonymous' : zabo.owner.name}</div>
      </Link>
    </ZaboCard.Writings>
  </ZaboCard>
);
