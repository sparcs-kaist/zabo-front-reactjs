export interface IJwt {
  _id : string;
  sid : string;
  email : string;
  username : string;
  iat : number;
  exp : number;
  iss : string;
}

export interface IZabo {
  _id : string,
  title : string,
  owner : {
    _id : string,
    name : string,
    profilePhoto : string,
    subtitle : string,
  },
  description : string,
  category : string[],
  photos : [{
    height : number,
    width : number,
    url : string,
  }],
  views : number,
  effectiveViews : number,
  createdAt : string,
  schedules : [{
    title : string,
    startAt : string,
    endAt : string,
    type : string,
  }],
  isLiked : boolean,
  isPinned : boolean,
  isMyZabo : boolean,
}

export interface IZaboMap {
  [key : string] : IZabo;
}

export interface IGroup {
  _id : string,
  name : string,
  profilePhoto : string,
  stats : {
    zaboCount : number,
    followerCount : number,
    recentUploadDate : string,
  },
  myRole : 'admin' | 'editor',
}

export interface IGroupMap {
  [key : string] : IGroup;
}

export interface IUser {
  _id : string,
  // eslint-disable-next-line camelcase
  sso_uid ? : string,
  // eslint-disable-next-line camelcase
  sso_sid ? : string,
  gender ? : string,
  email ?: string,
  kaistPersonType ? : string,
  isAdmin ? : boolean,
  flags : string[],
  pendingGroups : IGroup[],
  username : string,
  description ? : string,
  profilePhoto ? : string,
  backgroundPhoto ? : string,
  birthday ? : string,
  lastName ? : string,
  firstName ? : string,
  studentId ? : string,
  koreanName ? : string,
  boards ? : {
    pinsCount : number,
    pins : any[],
  }[],
  currentGroup ? : IGroup | string | null,
  groups : IGroup[],
  stats ? : {
    likesCount : number,
    followingsCount : number,
  },
}

export interface IUserMap {
  [key : string] : IGroup;
}

export type IProfile = IUser | IGroup;

export interface IProfileMap {
  [key : string] : IProfile
}
