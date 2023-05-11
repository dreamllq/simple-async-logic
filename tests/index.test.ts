// https://jestjs.io/zh-Hans/docs/api
import asyncLogic from '@/index';

test('base', async () => {
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
});

test('混合', async () => {
  const handle:(option: number) => Promise<boolean> = (option) => new Promise(resolve => {
    setTimeout(() => {
      resolve(option === 1 || option === 2);
    }, 200);
  });

  const asyncLogicHandle = asyncLogic<number>(handle);

  expect(await asyncLogicHandle({
    and: [
      { value: 1 },
      { value: 2 },
      { or: [{ value: 1 }, { value: 4 }] },
      { not: { value: 4 } },
      { not: { and: [{ value: 4 }, { value: 1 }] } }
    ] 
  })).toBe(true);

});