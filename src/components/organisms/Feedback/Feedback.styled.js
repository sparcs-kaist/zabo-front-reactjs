import styled from 'styled-components';

/* ============ Feedbacks ============ */
const FeedbackWrapper = styled.div`
  width: 100%;
  margin: 25px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .thankYou {
    margin-top: 10px;
  }
`;
FeedbackWrapper.Feedback = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  div:nth-child(2) {
    width: 100%;
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100%;
    background-color: #f4f4f4;
    border-radius: 4px;
    border: none;
    outline: none;
    padding: 11px 15px;
    font-size: 16px;
  }
  input::placeholder {
    font-size: 16px;
  }

  button {
    width: 80px;
    height: 38px;
    margin-left: 5px;
    border-radius: 4px;
    border-color: #143441;

    color: white;
    background-color: #143441;
    box-shadow: 0px 3px 6px;
    font-size: 14px;
  }
  button:hover {
    opacity: 0.9;
  }

  @media (max-width: 530px) {
    font-size: 14px;

    div:nth-child(2) {
      height: 70px;
      flex-direction: column;
    }

    button {
      width: 100%;
      padding: 8px 0px;
      margin: 6px 0px;
      font-size: 14px;
    }
  }
`;

export default FeedbackWrapper;
