import type { MongoSchema } from "./utils/mongo";
import type { User } from ".";

export interface GroupApply extends MongoSchema {
  name: string;
  subtitle?: string;
  description?: string;
  profilePhoto?: string;
  backgroundPhoto?: string;
  category?: string[];
  members: {
    user: User;
    role?: "admin" | "editor";
  }[];
  purpose?: string;
  isBusiness?: boolean;
}

export interface Group extends GroupApply {
  isPreRegistered?: boolean;
  level?: number;
  revisionHistory?: RevisionHistory[];
  recentUpload?: string;
  followers?: User[] | string[];
  score: number;
}

interface RevisionHistory extends MongoSchema {
  prev?: string;
  next?: string;
}
