import { AsyncLogic, AsyncLogicCallback, LogicConfig } from './type';
class AsyncLogicRun<T> {
  func:AsyncLogicCallback<T>; 
  constructor(func: AsyncLogicCallback<T>) {
    this.func = func;
  }

  private isLoginConfig(data: LogicConfig<T>, name:string): boolean {
    const keys = Object.keys(data);
    return keys.length === 1 && keys[0] === name;
  }

  async runConfig(config: LogicConfig<T>): Promise<boolean> {
    if (this.isLoginConfig(config, 'and')) {
      return this.runAnd(config.and!);
    } else if (this.isLoginConfig(config, 'or')) {
      return this.runOr(config.or!);
    } else if (this.isLoginConfig(config, 'not')) {
      return this.runNot(config.not!);
    } else if (this.isLoginConfig(config, 'value')) {
      return this.runValue(config.value!);
    } else {
      return false;
    }
  }

  private async runAnd(and: LogicConfig<T>[]): Promise<boolean> {
    if (and.length === 0) return true;
    const res = await Promise.all(and.map(config => this.runConfig(config)));
    return res.reduce((acc, r) => acc && r, true);
  }

  private async runOr(or: LogicConfig<T>[]): Promise<boolean> {
    if (or.length === 0) return true;
    const res = await Promise.all(or.map(config => this.runConfig(config)));
    return res.reduce((acc, r) => acc || r, false);
  }

  private async runNot(not: LogicConfig<T>): Promise<boolean> {
    const res = await this.runConfig(not);
    return !res;
  }

  private runValue(value:T): Promise<boolean> {
    return this.func(value);
  }
}


const asyncLogic: AsyncLogic = <T>(func: AsyncLogicCallback<T>) => {

  const asyncLogicRun = new AsyncLogicRun(func);

  return (config: LogicConfig<T>) => asyncLogicRun.runConfig(config);
};

export default asyncLogic;