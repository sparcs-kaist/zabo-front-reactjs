import React from "react";
import get from "lodash.get";

// eslint-disable-next-line react/display-name
export default (WrappedComponent) => (props) => {
  const params = get(props, ["match", "params"]) || {};
  const downProps = {
    ...props,
    ...params,
  };
  return <WrappedComponent {...downProps} />;
};
