import type { MongoSchema } from "./utils/mongo";

export interface Board extends MongoSchema {
  title: string;
  /* For further usage */
  description?: string;
  category?: string;
  isPrivate?: boolean;
  pins?: string[];
}
