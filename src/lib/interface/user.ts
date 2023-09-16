import type { GroupApply as GroupApplySchema, User as UserSchema } from "./schemas";

export interface User extends UserSchema {
  pendingGroups?: Pick<GroupApplySchema, "_id" | "name" | "profilePhoto" | "subtitle">[];
}
