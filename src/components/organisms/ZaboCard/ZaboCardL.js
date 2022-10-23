import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import get from "lodash.get";
import moment from "moment";

import { CategoryListW, CategoryW } from "components/atoms/Category";
import SuperTooltip from "components/atoms/SuperTooltip";

import { ZaboType } from "lib/propTypes";
import { isElemWidthOverflown } from "lib/utils";

import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import { MetaInfo, OwnerW, PosterLW, Title, WritingsLW, ZaboCardLW } from "./ZaboCard.styled";

const PosterL = ({ zabo }) => {
  const [height, setHeight] = useState(174);
  const { photos } = zabo;

  return (
    <PosterLW
      ref={(ref) => {
        if (ref) setHeight(ref.clientHeight);
      }}
      style={
        {
          // paddingLeft: (photos[0].width / photos[0].height) * height,
        }
      }
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
  const { _id, category, title, owner, createdAt, views, effectiveViews } = zabo;
  const width = useSelector((state) => get(state, ["app", "windowSize", "width"]));
  const titleRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    setShowTooltip(isElemWidthOverflown(titleRef.current));
  }, [width, titleRef]);
  const createdAtLabel = moment(createdAt).format("YYYY-MM-DD");
  return (
    <ZaboCardLW>
      <div>
        <Link to={`/zabo/${_id}`} style={{ maxWidth: "50%", overflow: "hidden" }}>
          <PosterL zabo={zabo} />
        </Link>
      </div>
      <WritingsLW>
        <CategoryListW>
          {category.slice(0, 3).map((cat) => (
            <CategoryW key={cat}># {cat}</CategoryW>
          ))}
          {category.length > 3 && (
            <Tooltip
              title={
                <CategoryListW>
                  {category.slice(3).map((cat) => (
                    <CategoryW key={cat}># {cat}</CategoryW>
                  ))}
                </CategoryListW>
              }
              placement="top"
              enterTouchDelay={0}
            >
              <CategoryW>&middot;&middot;&middot;</CategoryW>
            </Tooltip>
          )}
        </CategoryListW>
        <SuperTooltip title={title} hide={!showTooltip}>
          <Title ref={titleRef}>{title}</Title>
        </SuperTooltip>
        <Link to={`/${owner.name}`}>
          <OwnerW>
            <OwnerW.Profile src={owner.profilePhoto || groupDefaultProfile} />
            <OwnerW.Name>{owner.name}</OwnerW.Name>
          </OwnerW>
        </Link>
        <MetaInfo>
          {createdAtLabel}
          <MetaInfo.Dot>&middot;</MetaInfo.Dot>
          <Tooltip title={`유효 조회수 ${effectiveViews}`} enterTouchDelay={0}>
            <div>조회수 {views.toLocaleString()}</div>
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
