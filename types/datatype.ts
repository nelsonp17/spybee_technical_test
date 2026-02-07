import { User } from "./project";

export interface ProjectDataType {
  name: string;
  id: number | string;
  desc: string;
  item: string;
  team?: User[];
  date: string;
  hour: string;
  limitDate: Date;
}
