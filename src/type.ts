export interface LogicConfig<T> {
  and?: LogicConfig<T>[],
  or?: LogicConfig<T>[],
  not?: LogicConfig<T>,
  value?: T
}

export type AsyncLogicCallback<T> = (arg: T)=>Promise<boolean>;

export type AsyncLogicHandle<T> = (config: LogicConfig<T>)=>Promise<boolean>;

export type AsyncLogic = <T>(callback: AsyncLogicCallback<T>)=>AsyncLogicHandle<T>