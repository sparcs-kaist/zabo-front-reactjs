import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import Carousel from 'react-airbnb-carousel';
import moment from 'moment';

import Button from 'atoms/Button';
import StatBox from 'molecules/StatBox';
import StyledQuill from 'organisms/StyledQuill';
import ZaboList from 'templates/ZaboList';

import { ZaboType } from 'lib/propTypes';
import { getLabeledTimeDiff, to2Digits } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import withZabo from './withZabo';
import { ZaboPageWrapper } from './ZaboPage.styled';

const ZaboDetailPage = (props) => {
  const { url } = useRouteMatch ();
  const { zabo, zaboId } = props;
  const {
    title, owner = {}, endAt, createdAt, description, category = [], photos = [{}],
    isLiked, likesCount, isPinned, pinsCount, views = 0, isMyZabo, createdBy,
  } = zabo;
  const timePast = getLabeledTimeDiff (createdAt, true, true, 6, false, false, false);
  const due = moment (endAt).diff (moment (), 'days');

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
              <div className="details">조회수 {views}</div>
            </section>
            <section className="statSection">
              {stats.map (stat => <StatBox key={stat.type} stat={stat} />)}
            </section>
          </ZaboPageWrapper.Info.Header>
          <ZaboPageWrapper.Info.Body>
            <section>
              <div className="borderLine"> </div>
              <div className="owner">
                <Link to={`/${owner.name}`} className="owner-link">
                  {
                    ('profilePhoto' in owner)
                      ? <img src={owner.profilePhoto} alt="group profile photo" />
                      : <img src={groupDefaultProfile} alt="default profile img" />
                  }
                  <div className="owner-label">
                    <div className="owner-group">{owner.name || 'anonymous'}</div>
                    {isMyZabo && <div className="owner-creator">게시자 {createdBy.username}</div>}
                  </div>
                </Link>
                {/* <div className="specialChar">&middot;</div> */}
                {/* <p className="follow" /> */}
                {isMyZabo
                && (
                <Button.Group style={{ marginLeft: 'auto' }} gutter={8}>
                  <Button to={`${url}/edit`} border="main">게시물 수정</Button>
                  <Button
                    background="point"
                    border="none"
                    color="white"
                    onClick={() => {
                      alert ('삭제하시겠습니까?');
                    }}
                  >게시물 삭제
                  </Button>
                </Button.Group>
                )}
              </div>
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
