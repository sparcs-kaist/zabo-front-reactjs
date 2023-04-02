import type { Group as GroupSchema } from "./schemas";

export interface Group extends GroupSchema {
  zabosCount?: number;
  followersCount?: number;
  isPending?: boolean;
}
