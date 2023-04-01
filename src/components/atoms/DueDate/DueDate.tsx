import React from "react";
import styled from "styled-components";
import moment from "moment";

import { to2Digits } from "lib/utils";

const DueDateW = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  font-size: 11px;
  line-height: 18px;
  border-radius: 2px;
  background: ${(props) => props.theme.main};
  font-style: normal;
  font-weight: bold;
  color: ${(props) => props.theme.white};
`;

const DDayW = styled(DueDateW)`
  background: ${(props) => props.theme.red50};
`;

const DueDateLW = styled.div`
  margin-top: 4px;
  display: inline-block;
  height: 26px;
  padding: 4px 10px;
  border-radius: 4px;
  background: #143441;
  color: white;
  font-size: 16px;
  font-weight: bold;
  vertical-align: middle;
  @media (max-width: 640px) {
    margin-top: 5px;
    height: 20px;
    font-size: 12px;
    padding: 3px 4px;
    border-radius: 2px;
  }
`;

const DDayLW = styled(DueDateLW)`
  background: ${(props) => props.theme.red50};
`;

interface Props {
  schedule: string;
  large?: boolean;
}

const DueDate: React.FC<Props> = ({ schedule, large }) => {
  const due = schedule ? moment(schedule).diff(moment(), "days") : -1;
  if (large) {
    if (due > 0) return <DueDateLW>D{to2Digits(-due, true)}</DueDateLW>;
    if (due === 0) return <DDayLW>D-Day</DDayLW>;
  } else {
    if (due > 0) return <DueDateW>D{to2Digits(-due, true)}</DueDateW>;
    if (due === 0) return <DDayW>D-Day</DDayW>;
  }
  return null;
};

export default DueDate;
