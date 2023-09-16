import { PenderState } from "redux-pender";

import { IAdminState } from "store/reducers/admin";
import { IAppState } from "store/reducers/app";
import { IAuthState } from "store/reducers/auth";
import { IProfileState } from "store/reducers/profile";
import { IUploadState } from "store/reducers/upload";
import { IZaboState } from "store/reducers/zabo";

export interface IState {
  admin: IAdminState;
  app: IAppState;
  auth: IAuthState;
  profile: IProfileState;
  upload: IUploadState;
  zabo: IZaboState;
  pender: PenderState;
}
