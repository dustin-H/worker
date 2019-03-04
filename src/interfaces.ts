import { Pool } from "pg";
import { IDebugger } from "debug";

export interface Helpers {
  debug: IDebugger;
  pgPool: Pool;
}

export type Task = (payload: any, helpers: Helpers) => Promise<void>;

export interface TaskList {
  [name: string]: Task;
}

export interface WatchedTaskList {
  tasks: TaskList;
  release: () => void;
}

export interface Job {
  id: number;
  queue_name: string;
  task_identifier: string;
  payload: object;
  priority: number;
  run_at: Date;
  attempts: number;
  last_error: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Worker {
  doNext: () => Promise<null>;
  nudge: () => boolean;
  workerId: string;
}
