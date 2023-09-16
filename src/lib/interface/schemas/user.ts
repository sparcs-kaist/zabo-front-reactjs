import type { MongoSchema } from "../utils/mongo";
import type { Board, Group, Zabo } from "./index";

export interface User extends MongoSchema {
  sso_uid?: string;
  sso_sid: string;
  email?: string;
  username: string;
  description?: string;
  profilePhoto?: string;
  backgroundPhoto?: string;
  isAdmin?: boolean;
  /* From SSO */
  gender?: string;
  birthday?: string;
  flags?: string[];
  firstName?: string;
  lastName?: string;
  koreanName?: string;
  kaistId?: string;
  sparcsId?: string;
  facebookId?: string;
  // TODO: check if typo
  tweeterId?: string;
  studentId?: string;
  kaistEmail?: string;
  kaistPersonType?: string;
  kaistInfoTime?: string;
  kaistStatus?: string;
  /* From SSO */
  boards?: Board[] | string[];
  groups?: Group[] | string[];
  currentGroup: Group | string;
  type?: string;
  followings?: (
    | { followee: string | User; onModel: "User" }
    | { followee: string | Group; onModel: "Group" }
  )[];

  followers?: User[] | string[];
  recommends?: Zabo[] | string[];
  interests?: Record<string, number>;
  interestMeta?: {
    lastCountedDate?: string;
  };
}
