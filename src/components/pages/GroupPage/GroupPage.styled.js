import styled from 'styled-components';

const GroupPageWrapper = styled.div`
  margin: 0;
  padding: 0 16px;
  animation-duration: 0.3s;
  display: flex;
  flex-direction: column;
  font-family: NanumSquare, sans-serif;

  max-width: 500px;
  color: #143441;

  .page-title {
    font-size: 30px;
    font-weight: bold;
  }

  .warning {
    font-size: 12px;
    margin: 10px 0;
    color: #8f8f8f;
  }

  .groupName {
    font-size: 24px;
    margin: 20px 0;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
      margin-left: 10px;
    }
  }

  .members {
    font-size: 12px;
    color: #8f8f8f;
    display: flex;
    flex-direction: column;
  }

  .member-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #143441;
    font-weight: bold;
  }

  .member-remove {
    cursor: pointer;
    margin-left: 10px;
  }

  .line {
    width: 100%;
    border-top: 1px solid #f4f4f4;
  }
`;

export default GroupPageWrapper;
