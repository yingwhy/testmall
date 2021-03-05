// 防抖函数
// 异步和同步，会先执行同步再执行异步
export function debounce(func, delay) {
  let timer = null;
  if (timer) clearTimeout(timer)
  return function (...args) {
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}