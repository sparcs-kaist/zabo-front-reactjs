import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;
export const SubHeading = styled.div`
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e1e4e8;
`;
SubHeading.Text = styled.h2`
  font-size: 24px;
`;
export const FormGroup = styled.div`
  margin: 15px 0;
`;
export const Label = styled.div`
  font-weight: bold;
  margin: 0 0 6px;
`;
export const Input = styled.input`
  width: 440px;
  max-width: 100%;
  background-color: #fafbfc;
  min-height: 34px;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  outline: none;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
`;
export const Note = styled.div`
  min-height: 17px;
  margin: 4px 0 2px;
  font-size: 12px;
  color: #586069;
`;
export const Button = styled.button`
  position: relative;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-repeat: repeat-x;
  background-position: -1px -1px;
  background-size: 110% 110%;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;
`;
export const Success = styled.div`
  color: green;
`;
export const Error = styled.div`
  color: red;
`;
export const Submit = styled (Button)`
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
`;
export const Hr = styled.hr`
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
`;
