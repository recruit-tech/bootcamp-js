export function test(testFunc: Function) {
  console.log(`run: ${testFunc.name}`);
  setTimeout(testFunc(), 1);
}
