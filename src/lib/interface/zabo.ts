import type { MongoSchema } from "./utils/mongo";
import type { User, Group, Board } from ".";

export interface Zabo extends MongoSchema {
  createdBy?: User | string;
  owner?: Group | string;
  photos?: {
    url?: string;
    width?: number;
    height?: number;
  }[];
  meta?: {
    w?: number;
    h?: number;
  };
  title: string;
  description: string;
  category?: string[];
  views?: number;
  effectiveViews?: number;
  schedules?: {
    title?: string;
    startAt: string;
    endAt?: string;
    eventType?: "행사" | "신청";
  }[];

  pins?: Board[] | string[];
  likes?: ZaboLike[];
  likesWithTime?: ZaboLike[];
  score?: number;
  scoreMeta: {
    lastLikeCount?: number;
    lastLikeTimeMA?: string;
    lastCountedViewDate?: string;
    lastViewTimeMA?: string;
  };
}

export interface ZaboLike extends MongoSchema {
  user?: User | string;
}
