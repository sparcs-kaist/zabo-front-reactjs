import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ZaboList from 'templates/ZaboList';
import Header from 'templates/Header';
import { ZaboPageWrapper } from './ZaboPage.styled';
import { ZaboType } from '../../../lib/propTypes';
import { to2Digits } from '../../../lib/utils';

import likeImg from '../../../static/images/like.png';
import bookmarkImg from '../../../static/images/bookmark.png';

const statsBox = (num, isBookmark) => {
  // isBookmark : type number ( 0 == falsy )
  const src = isBookmark ? bookmarkImg : likeImg;
  return (
    <ZaboPageWrapper.Info.Box>
      <img src={src} alt="icon image" />
      <div>{num}</div>
    </ZaboPageWrapper.Info.Box>
  );
};

class ZaboPage extends PureComponent {
  render () {
    const liked = 263;
    const booked = 263;
    const statsList = [liked, booked];

    const { zabo, zaboId } = this.props;
    const {
      title, owner, endAt, createdAt, description, category = [], photos = [{}],
    } = zabo;
    const curMoment = moment ();
    const createdAtMoment = moment (createdAt);
    const minDiff = curMoment.diff (createdAtMoment, 'minutes');
    const hourDiff = curMoment.diff (createdAtMoment, 'hours');
    const daysDiff = curMoment.diff (createdAtMoment, 'days');
    const monthDiff = curMoment.diff (createdAtMoment, 'months');
    const due = moment (endAt).diff (curMoment, 'days');

    return (
      <ZaboPageWrapper>
        <Header rightGroup={<Header.AuthButton />} />
        <ZaboPageWrapper.TwoCol>
          <ZaboPageWrapper.TitleImage>
            <div>
              <img src={photos[0].url} alt="title poster" />
            </div>
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
              <section>
                <h1>{title}</h1>
                {due > 0 && <div className="due-date">D{to2Digits (-due, true)}</div>}
              </section>
              <section>
                <div className="after-create">
                  {minDiff < 60 ? `${minDiff} minutes...`
                    : hourDiff < 24 ? `${hourDiff} hours...`
                      : daysDiff < 30 ? `${daysDiff} days ...`
                        : monthDiff}
                </div>
              </section>
              <section>
                {statsList.map ((elem, idx) => statsBox (elem, idx))}
              </section>
            </ZaboPageWrapper.Info.Header>
            <ZaboPageWrapper.Info.Body>
              <section>
                <div className="borderLine"> </div>
                <div className="owner">
                  {owner ? owner.name : 'annoymous'}
                </div>
                <div className="borderLine"> </div>
              </section>
              <section className="contents">
                {description}
              </section>
            </ZaboPageWrapper.Info.Body>
          </ZaboPageWrapper.Info>
        </ZaboPageWrapper.TwoCol>
        <ZaboPageWrapper.Recommend>

        </ZaboPageWrapper.Recommend>
      </ZaboPageWrapper>
      // <ZaboPageWrapper>
      //   <Header rightGroup={<Header.AuthButton />} />
      //   <div className="container">
      //     <Zabo>
      //       <Zabo.Poster meta={photos[0]}>
      //         <img width="100%" src={photos[0].url} alt="poster" />
      //       </Zabo.Poster>
      //       <Zabo.Writings>
      //         <div className="title">{title}</div>
      //         <div className="owner">{owner ? owner.name : 'annoymous'}</div>
      //         <div className="times">
      //           <div className="after-create">
      //             {minDiff < 60 ? `${minDiff} minutes...`
      //               : hourDiff < 24 ? `${hourDiff} hours...`
      //                 : daysDiff < 30 ? `${daysDiff} days ...`
      //                   : monthDiff}
      //           </div>
      //           {due > 0 && <div className="due-date">D{to2Digits (-due, true)}</div>}
      //         </div>
      //         <hr />
      //         <div className="description">{description}</div>
      //         <hr />
      //         <ul className="keyword-result">
      //           {category.map (cat => (
      //             <li key={cat}>#{cat}</li>
      //           ))}
      //         </ul>
      //       </Zabo.Writings>
      //     </Zabo>
      //   </div>
      //   <ZaboList type="related" relatedTo={zaboId} key={zaboId} />
      // </ZaboPageWrapper>
    );
  }
}

ZaboPage.propTypes = {
  zabo: PropTypes.shape (ZaboType).isRequired,
  zaboId: PropTypes.string.isRequired,
};

ZaboPage.defaultProps = {
};

export default ZaboPage;
