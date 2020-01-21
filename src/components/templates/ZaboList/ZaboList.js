import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MasonryZaboList from 'react-masonry-infinite';

import Feedback from 'organisms/Feedback';
import ZaboListWrapper from './ZaboList.styled';

import ZaboCard from '../../organisms/ZaboCard';

import withStackMaster from './withStackMaster';

const sizes = [
  { columns: 2, gutter: 16 },
  { mq: `${752 + 32}px`, columns: 3, gutter: 16 },
  { mq: `${1032 + 32}px`, columns: 4, gutter: 24 },
  { mq: `${1260 + 32}px`, columns: 4, gutter: 24 },
];

const Loader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0 30px 0;
  @keyframes spin { 100% { transform:rotate(360deg); } }
  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 4s linear infinite;  
  }
`;

const rand = Math.floor (Math.random () * 3);
const loader = (
  <Loader>
    <img src={
      rand === 0
        ? 'https://sparcs-kaist-zabo-dev.s3.ap-northeast-2.amazonaws.com/zabo/zabo-1579285702954'
        : rand === 1
          ? 'https://sparcs-kaist-zabo-dev.s3.ap-northeast-2.amazonaws.com/zabo/zabo-1579452331713'
          : 'https://sparcs-kaist-zabo-dev.s3.ap-northeast-2.amazonaws.com/profile/user-1579181150933'
    }
    />
  </Loader>
);

class ZaboList extends PureComponent {
  masonry = React.createRef ()

  state = { hasNext: true }

  componentDidMount () {
    this.fetch ();
  }

  componentDidUpdate (prevProps) {
    const { relatedTo } = this.props;
    if (relatedTo !== prevProps.relatedTo) {
      this.fetch ();
    }
  }

  fetch = next => {
    const {
      type, getZaboList, getPins, relatedTo, zaboList,
    } = this.props;
    const lastSeen = next ? (zaboList[zaboList.length - 1] || {})._id : undefined;
    const fetches = {
      main: () => getZaboList ({ lastSeen }),
      related: () => getZaboList ({ lastSeen, relatedTo }),
      pins: () => getPins ({ lastSeen }),
    };
    return fetches[type] ();
  }

  fetchNext = () => {
    this.fetch (true).then (zaboList => {
      if (zaboList.length === 0) this.setState ({ hasNext: false });
    });
  }

  render () {
    const { zaboList } = this.props;
    const { hasNext } = this.state;
    const { fetchNext } = this;

    return (
      <ZaboListWrapper>
        <MasonryZaboList
          className="masonry"
          initialLoad={false}
          hasMore={hasNext}
          loadMore={fetchNext} // called on useWindow (scrollLister)
          loader={loader}
          ref={this.masonry}
          sizes={sizes}
          threshold={800}
        >
          {zaboList.map (zabo => (
            <ZaboCard key={zabo._id} zabo={zabo} />
          ))}
        </MasonryZaboList>
        {hasNext || <Feedback />}
      </ZaboListWrapper>
    );
  }
}

ZaboList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  zaboList: PropTypes.array.isRequired,
};

ZaboList.defaultProps = {};

export default withStackMaster (ZaboList);
