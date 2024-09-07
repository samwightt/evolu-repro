import { createEvolu } from "@evolu/react-native";
import { Database } from "./schema";

export const evolu = createEvolu(Database);