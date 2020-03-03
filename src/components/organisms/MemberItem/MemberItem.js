import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import SimpleSelect from 'molecules/SimpleSelect';

import useSetState from 'hooks/useSetState';
import { colors } from 'lib/theme';

import cross from 'static/images/cross.svg';
import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

const GroupMember = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E9E9E9;
  &:last-child {
    border-bottom: none;
  }
  width: 582px;
  height: 102px;
  @media (max-width: 640px) {
    width: 100%;
    height: 84px;
  }
`;

GroupMember.Profile = styled.div`
  display: flex;
  align-items: center;
`;

GroupMember.ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 16px;
  border-radius: 50%;
  @media (max-width: 640px) {
    width: 60px;
    height: 60px;
    margin-right: 12px;
  }
`;

GroupMember.ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

GroupMember.Name = styled.div`
  margin: 0 0 8px 0;
  display: flex;
  font-size: 18px;
  color: #143441;
  font-weight: 800;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

GroupMember.Role = styled.div`
  height: 16px;
  font-size: 14px;  
  color: #202020;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

GroupMember.Edit = styled.div`
  display: flex;
  >* {
    margin-right: 8px;
  }
`;


const gray3 = css`
  background-color: ${colors.gray3};
  color: ${colors.gray50};
`;

const gray3Border = css`
  background-color: ${colors.gray3};
  color: ${colors.main};
  font-weight: bold;
  border: 1.5px solid ${colors.main};
`;

const main = css`
  background-color: ${colors.main};
  font-weight: bold;
  color: ${colors.white};
`;

const themes = { gray3, main, gray3Border };

GroupMember.Button = styled.button`
  border-radius: 15px;
  height: 30px;
  ${props => themes[props.colorTheme]};
  &:last-child {
    margin-right: 0;
  }
`;

const roleOptions = [
  { value: 'editor', label: '편집자' },
  { value: 'admin', label: '관리자' },
];

const MemberItem = ({
  member, updateMember, removeMember, ...props
}) => {
  const {
    _id, username, name, koreanName, profilePhoto, role,
  } = member;
  const [state, setState] = useSetState ({
    edit: false,
    roleOption: roleOptions[0],
  });
  const { edit, roleOption } = state;

  return (
    <GroupMember {...props}>
      <GroupMember.Profile>
        <GroupMember.ProfileImage
          src={profilePhoto || groupDefaultProfile}
          alt={profilePhoto ? 'profile photo' : 'default profile photo'}
        />
        <GroupMember.ProfileText>
          <GroupMember.Name>{username}</GroupMember.Name>
          <GroupMember.Role>{role}</GroupMember.Role>
        </GroupMember.ProfileText>
      </GroupMember.Profile>
      <GroupMember.Edit>
        {
          !edit
            ? <GroupMember.Button colorTheme="gray3Border" onClick={() => setState ({ edit: true })}>수정하기</GroupMember.Button>
            : (
              <>
                <SimpleSelect
                  value={roleOption}
                  options={roleOptions}
                  onChange={newOption => setState ({ roleOption: newOption })}
                  isClearable={false}
                  width={73}
                  size="small"
                />
                <GroupMember.Button
                  style={{
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                  }}
                  colorTheme="gray3"
                  onClick={() => removeMember (_id)}
                >
                  <img src={cross} alt="delete user" />
                </GroupMember.Button>
                <GroupMember.Button
                  colorTheme="main"
                  onClick={() => {
                    updateMember (_id, roleOption.value);
                    setState ({ edit: false });
                  }}
                >완료
                </GroupMember.Button>
              </>
            )
        }
      </GroupMember.Edit>
    </GroupMember>
  );
};

MemberItem.propTypes = {
  member: PropTypes.shape ({
    _id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    koreanName: PropTypes.string,
    profilePhoto: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  updateMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

export default MemberItem;
