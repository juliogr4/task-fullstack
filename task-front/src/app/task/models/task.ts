import { IPagination } from "./pagination"

export interface ITask {
  taskItems: ITaskItem[],
  pagination?: IPagination,
}

export interface ITaskItem {
  id?: number,
  name: string,
  status: string
}
