export function test(testFunc) {
  console.log(`run: ${testFunc.name}`);
  setTimeout(testFunc(), 1);
}
