import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "sparcs-react-airbnb-carousel";
import { Helmet } from "react-helmet";
import Tooltip from "@material-ui/core/Tooltip";
import get from "lodash.get";
import moment from "moment";

import Button from "components/atoms/Button";
import DueDate from "components/atoms/DueDate";
import StatBox from "components/molecules/StatBox";
import StyledQuill from "components/organisms/StyledQuill";
import ZaboList from "components/templates/ZaboList";

import { followProfile, getProfile } from "store/reducers/profile";
import { deleteZabo as deleteZaboAction } from "store/reducers/zabo";
import withZabo from "hoc/withZabo";
import { ZaboType } from "lib/propTypes";
import { getLabeledTimeDiff, isAuthedSelector, to2Digits, withAuth } from "lib/utils";

import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import { alerts } from "../../../lib/variables";
import { PosterW } from "../../organisms/ZaboCard/ZaboCard.styled";
import { CategoryW, ZaboPageWrapper } from "./ZaboPage.styled";

const OwnerInfo = ({ zabo: { owner, isMyZabo, createdBy = {}, _id } }) => {
  const { url } = useRouteMatch();
  const isAuthed = useSelector(isAuthedSelector);
  const history = useHistory();
  const { name, profilePhoto } = owner;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!name) return;
    dispatch(getProfile(name));
  }, [name]);
  const follow = useCallback(() => {
    if (!name) return;
    if (withAuth(history, isAuthed)) dispatch(followProfile({ name }));
  }, [name]);
  const deleteZabo = useCallback(() => {
    dispatch(deleteZaboAction({ zaboId: _id }))
      .then((res) => {
        window.location.href = `/${owner.name}`;
      })
      .catch((error) => {
        alert("Error");
      });
  });
  const following = useSelector((state) => get(state, ["profile", "profiles", name, "following"]));

  return (
    <div className="owner">
      <Link to={`/${name}`} className="owner-link">
        {"profilePhoto" in owner ? (
          <img src={profilePhoto} alt="group profile photo" />
        ) : (
          <img src={groupDefaultProfile} alt="default profile img" />
        )}
        <div className="owner-label">
          <div className="owner-group">{name || "anonymous"}</div>
          {isMyZabo && <div className="owner-creator">게시자 {createdBy.username}</div>}
        </div>
      </Link>
      {typeof following !== "undefined" && (
        <>
          <div className="specialChar">&middot;</div>
          {following ? (
            <p className="unfollow" onClick={follow}>
              팔로우 취소
            </p>
          ) : (
            <p className="follow" onClick={follow}>
              팔로우
            </p>
          )}
        </>
      )}
      {isMyZabo && (
        <Button.Group style={{ marginLeft: "auto" }} gutter={8}>
          <Button to={`${url}/edit`} border="main" type="detail">
            게시물 수정
          </Button>
          <Button
            background="point"
            border="none"
            color="white"
            onClick={() => {
              if (window.confirm(alerts.del)) deleteZabo();
            }}
          >
            게시물 삭제
          </Button>
        </Button.Group>
      )}
    </div>
  );
};

OwnerInfo.propTypes = {
  zabo: ZaboType.isRequired,
};

OwnerInfo.defaultProps = {};

const ZaboDetailPage = (props) => {
  const { zabo, zaboId } = props;
  const {
    title,
    owner = {},
    schedules,
    createdAt,
    description,
    category = [],
    photos = [{}],
    isLiked,
    likesCount,
    isPinned,
    pinsCount,
    isShared,
    sharesCount,
    views,
    effectiveViews,
    isMyZabo,
    createdBy,
  } = zabo;
  const schedule = schedules[0];
  const timePast = getLabeledTimeDiff(createdAt, 60, 60, 6, 0);
  const due = schedule ? moment(schedule.startAt).diff(moment(), "days") : 0;
  const dueFormat = schedule && moment(schedule.startAt).format("MM/DD h:mm");
  const stats = [
    {
      type: "like",
      count: likesCount,
      zaboId,
      active: isLiked,
    },
    {
      type: "pin",
      count: pinsCount,
      zaboId,
      active: isPinned,
    },
    {
      type: "share",
      count: pinsCount,
      zaboId,
      active: isPinned,
    },
  ];

  return (
    <>
      <ZaboPageWrapper.Detail>
        <Helmet>
          <title>{title} - Zabo</title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={photos[0].url} />
        </Helmet>
        <ZaboPageWrapper.TwoCol>
          <ZaboPageWrapper.TitleImage>
            <Carousel
              imageUrls={photos.map(({ url }) => url)}
              ratio={photos[0].width / photos[0].height}
              overlay
            />
          </ZaboPageWrapper.TitleImage>
          <ZaboPageWrapper.Info>
            <ZaboPageWrapper.Info.Header>
              <section>
                <ul className="keyword-result">
                  {category.map((cat) => (
                    <li key={cat}>#{cat}</li>
                  ))}
                </ul>
              </section>
              <section className="zabo-page-header-title-group">
                <div className="zabo-page-header-title">{title}</div>
                <DueDate schedule={schedule ? schedule.startAt : null} large />
              </section>
              <section>
                <div className="details">{timePast}</div>
                <div className="specialChar">&middot;</div>
                <Tooltip title={`유효 조회수 ${effectiveViews}`} enterTouchDelay={0}>
                  <div className="details">조회수 {views.toLocaleString()}</div>
                </Tooltip>
              </section>
              <section className="statSection">
                {stats.map((stat) => (
                  <StatBox key={stat.type} stat={stat} />
                ))}
              </section>
            </ZaboPageWrapper.Info.Header>
            <ZaboPageWrapper.Info.Body>
              <section>
                <div className="borderLine"> </div>
                <OwnerInfo isMyZabo={isMyZabo} zabo={zabo} />
                <div className="borderLine"> </div>
              </section>
              {schedule && (
                <CategoryW>
                  <button>{schedule.eventType}</button>
                  <h3>{schedule.title}</h3>
                  <div className="schedule-date">{dueFormat}</div>
                </CategoryW>
              )}
              <section className="contents">
                <StyledQuill theme="bubble" readOnly value={description} />
              </section>
            </ZaboPageWrapper.Info.Body>
          </ZaboPageWrapper.Info>
        </ZaboPageWrapper.TwoCol>
      </ZaboPageWrapper.Detail>
      <ZaboPageWrapper.Recommend>
        <h1>연관 있는 자보</h1>
        <ZaboList type="related" query={zaboId} key={zaboId} />
      </ZaboPageWrapper.Recommend>
    </>
  );
};

ZaboDetailPage.propTypes = {
  zabo: ZaboType.isRequired,
  zaboId: PropTypes.string.isRequired,
};

export default withZabo(ZaboDetailPage);
