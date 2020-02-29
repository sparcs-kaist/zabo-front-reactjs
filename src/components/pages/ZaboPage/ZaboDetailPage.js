import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-airbnb-carousel';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import Button from 'atoms/Button';
import StatBox from 'molecules/StatBox';
import StyledQuill from 'organisms/StyledQuill';
import ZaboList from 'templates/ZaboList';

import { followProfile, getProfile } from 'store/reducers/profile';
import { deleteZabo as deleteZaboAction } from 'store/reducers/zabo';
import withZabo from 'hoc/withZabo';
import { ZaboType } from 'lib/propTypes';
import { getLabeledTimeDiff, to2Digits } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import { ZaboPageWrapper } from './ZaboPage.styled';

const OwnerInfo = ({
  zabo: {
    owner, isMyZabo, createdBy = {}, _id,
  },
}) => {
  const { url } = useRouteMatch ();
  const { name, profilePhoto } = owner;
  const dispatch = useDispatch ();
  useEffect (() => {
    if (!name) return;
    dispatch (getProfile (name));
  }, [name]);
  const follow = useCallback (() => {
    if (!name) return;
    dispatch (followProfile ({ name }));
  }, [name]);
  const deleteZabo = useCallback (() => {
    dispatch (deleteZaboAction ({ zaboId: _id }))
      .then (res => {
        window.location.href = `/${owner.name}`;
      })
      .catch (error => {
        alert ('Error');
      });
  });
  const following = useSelector (state => state.getIn (['profile', 'profiles', name, 'following']));

  return (
    <div className="owner">
      <Link to={`/${name}`} className="owner-link">
        {
          ('profilePhoto' in owner)
            ? <img src={profilePhoto} alt="group profile photo" />
            : <img src={groupDefaultProfile} alt="default profile img" />
        }
        <div className="owner-label">
          <div className="owner-group">{name || 'anonymous'}</div>
          {isMyZabo && <div className="owner-creator">게시자 {createdBy.username}</div>}
        </div>
      </Link>
      {
        typeof following !== 'undefined'
          && (
            <>
              <div className="specialChar">&middot;</div>
              {
                following
                  ? <p className="follow" onClick={follow}>팔로우 취소</p>
                  : <p className="follow" onClick={follow}>팔로우</p>
              }
            </>
          )
      }
      {isMyZabo
      && (
        <Button.Group style={{ marginLeft: 'auto' }} gutter={8}>
          <Button to={`${url}/edit`} border="main" type="detail">게시물 수정</Button>
          <Button
            background="point"
            border="none"
            color="white"
            onClick={() => {
              deleteZabo ();
            }}
          >게시물 삭제
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
    title, owner = {}, schedules, createdAt, description, category = [], photos = [{}],
    isLiked, likesCount, isPinned, pinsCount, views = 0, isMyZabo, createdBy,
  } = zabo;
  const schedule = schedules[0];
  const timePast = getLabeledTimeDiff (createdAt, true, true, 6, false, false, false);
  const due = schedule ? moment (schedule.startAt).diff (moment (), 'days') : 0;

  const stats = [{
    type: 'like',
    count: likesCount,
    zaboId,
    active: isLiked,
  }, {
    type: 'pin',
    count: pinsCount,
    zaboId,
    active: isPinned,
  }];

  return (
    <>
      <Helmet>
        <title>{title} - Zabo</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={photos[0].url} />
      </Helmet>
      <ZaboPageWrapper.TwoCol>
        <ZaboPageWrapper.TitleImage>
          <Carousel
            imageUrls={photos.map (({ url }) => url)}
            ratio={photos[0].width / photos[0].height}
            overlay
          />
        </ZaboPageWrapper.TitleImage>
        <ZaboPageWrapper.Info>
          <ZaboPageWrapper.Info.Header>
            <section>
              <ul className="keyword-result">
                {category.map (cat => (
                  <li key={cat}>#{cat}</li>
                ))}
              </ul>
            </section>
            <section className="zabo-page-header-title-group">
              <div className="zabo-page-header-title"><h1>{title}</h1></div>
              {due > 0 && <div className="due-date">D{to2Digits (-due, true)}</div>}
            </section>
            <section>
              <div className="details">
                {timePast}
              </div>
              <div className="specialChar">&middot;</div>
              <div className="details">조회수 {views.toLocaleString ()}</div>
            </section>
            <section className="statSection">
              {stats.map (stat => <StatBox key={stat.type} stat={stat} />)}
            </section>
          </ZaboPageWrapper.Info.Header>
          <ZaboPageWrapper.Info.Body>
            <section>
              <div className="borderLine"> </div>
              <OwnerInfo isMyZabo={isMyZabo} zabo={zabo} />
              <div className="borderLine"> </div>
            </section>
            <section className="contents">
              <StyledQuill
                theme="bubble"
                readOnly
                value={description}
              />
            </section>
          </ZaboPageWrapper.Info.Body>
        </ZaboPageWrapper.Info>
      </ZaboPageWrapper.TwoCol>
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

export default withZabo (ZaboDetailPage);
