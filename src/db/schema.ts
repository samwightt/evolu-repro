import * as S from "@effect/schema/Schema";
import { NonEmptyString1000, SqliteBoolean, id, table, database } from "@evolu/react-native";

const TodoId = id("Todo");
type TodoId = typeof TodoId.Type;

const TodoTable = table({
  id: TodoId,
  title: NonEmptyString1000,
  isCompleted: SqliteBoolean,
});
type TodoTable = typeof TodoTable.Type;

export const Database = database({
  todo: TodoTable,
});
export type Database = typeof Database.Type;