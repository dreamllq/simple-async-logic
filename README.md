# simple-async-logic

异步逻辑语法执行

## 安装

```
npm i simple-async-logic
```

## 使用

```ts
import asyncLogic from 'simple-async-logic';

const handle:(option: number) => Promise<boolean> = (option) => new Promise(resolve => {
  setTimeout(() => {
    resolve(option === 1 || option === 2);
  }, 200);
});

const asyncLogicHandle = asyncLogic<number>(handle);

expect(await asyncLogicHandle({ and: [{ value: 1 }, { value: 2 }] })).toBe(true);
expect(await asyncLogicHandle({ and: [{ value: 1 }, { value: 3 }] })).toBe(false);
expect(await asyncLogicHandle({ and: [] })).toBe(true);
expect(await asyncLogicHandle({ or: [{ value: 1 }, { value: 3 }] })).toBe(true);
expect(await asyncLogicHandle({ or: [{ value: 4 }, { value: 3 }] })).toBe(false);
expect(await asyncLogicHandle({ or: [] })).toBe(true);
expect(await asyncLogicHandle({ not: { value: 1 } })).toBe(false);
expect(await asyncLogicHandle({ not: { value: 3 } })).toBe(true);
expect(await asyncLogicHandle({ value: 1 })).toBe(true);
expect(await asyncLogicHandle({ value: 3 })).toBe(false);
expect(await asyncLogicHandle({
  value: 3,
  and: [] 
})).toBe(false);
```

## 逻辑数据类型

```ts
interface LogicConfig<T> {
  and?: LogicConfig<T>[],
  or?: LogicConfig<T>[],
  not?: LogicConfig<T>,
  value?: T
}
```