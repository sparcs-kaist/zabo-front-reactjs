import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash.get";

import { NotFound } from "components/pages";

import { getProfile } from "store/reducers/profile";

const withGroupProfile = <P,>(
  // TODO: add profile types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WrappedComponent: React.FC<P & { profile: any }>,
  isPrivate = false,
) => {
  const ComponentWithGroupProfile: React.FC<P & { groupName: string }> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProfile(props.groupName));
    }, [props.groupName, dispatch]);

    const profile = useSelector((state) => get(state, ["profile", "profiles", props.groupName]));
    if (!profile) return null;
    if (profile.error) return <NotFound />;
    if (isPrivate && !profile.myRole) return <NotFound />;
    return <WrappedComponent {...props} profile={profile} />;
  };

  return ComponentWithGroupProfile;
};

export default withGroupProfile;
