import React from 'react';
import PropTypes from 'prop-types';
import MasonryZaboList from 'react-masonry-infinite';
import styled from 'styled-components';

import Feedback from 'organisms/Feedback';
import ZaboCard from 'organisms/ZaboCard';

import withStackMaster from './withStackMaster';
import ZaboListWrapper from './ZaboList.styled';

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

class ZaboList extends React.Component {
  masonry = React.createRef ()

  state = { hasNext: true }

  componentDidMount () {
    this.fetch ();
  }

  componentDidUpdate (prevProps) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      this.fetch ();
    }
  }

  fetch = next => {
    const {
      type, getZaboList, getPins, query, zaboIdList, getGroupZaboList, getSearchZaboList,
    } = this.props;
    const lastSeen = next ? zaboIdList[zaboIdList.length - 1] : undefined;
    const fetches = {
      main: () => getZaboList ({ lastSeen }),
      related: () => getZaboList ({ lastSeen, relatedTo: query }),
      pins: () => getPins ({ username: query, lastSeen }),
      group: () => getGroupZaboList ({ groupName: query, lastSeen }),
      // search: () => (!lastSeen ? Promise.resolve (zaboIdList) : getSearchZaboList ({ text: query, lastSeen })),
      search: () => Promise.resolve ('search'),
    };
    return fetches[type] ()
      .then (zaboList => {
        if (zaboList.length === 0) this.setState ({ hasNext: false });
      });
  }

  fetchNext = () => {
    this.fetch (true);
  }

  render () {
    const { zaboIdList, type } = this.props;
    const { hasNext } = this.state;
    const { fetchNext } = this;

    return (
      <ZaboListWrapper>
        <MasonryZaboList
          className={`masonry masonry-${type}`}
          initialLoad={false}
          hasMore={hasNext}
          loadMore={fetchNext} // called on useWindow (scrollLister)
          loader={loader}
          ref={this.masonry}
          sizes={sizes}
          threshold={800}
        >
          {zaboIdList.map (zaboId => (
            <ZaboCard key={zaboId} zaboId={zaboId} />
          ))}
        </MasonryZaboList>
        {hasNext || <Feedback />}
      </ZaboListWrapper>
    );
  }
}

ZaboList.propTypes = {
  zaboIdList: PropTypes.arrayOf (PropTypes.string).isRequired,
  type: PropTypes.oneOf (['main', 'related', 'pins', 'group', 'search']).isRequired,
  getZaboList: PropTypes.func.isRequired,
  getPins: PropTypes.func.isRequired,
  getGroupZaboList: PropTypes.func.isRequired,
  getSearchZaboList: PropTypes.func.isRequired,
  query: PropTypes.string,
};

ZaboList.defaultProps = {
  query: '',
};

export default withStackMaster (ZaboList);
