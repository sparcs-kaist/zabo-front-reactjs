import React, { useEffect } from "react";

const Reload: React.FC = () => {
  useEffect(() => {
    location.reload();
  }, []);

  return <></>;
};

export default Reload;
