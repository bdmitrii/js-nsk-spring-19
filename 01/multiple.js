/**
 * Напишите функцию multiple(a, b), умножающую число a на число b,
 * не используя оператор "*" или метод Math.imul.
 *
 * Пример:
 * multiple(1, 1) === 1
 * multiple(1, 2) === 2
 * multiple(0, 0) === 0
 *
 * Больше примеров в тестах.
 *
 * @param  {number} a любое целое число
 * @param  {number} b любое целое число
 * @return {number}
 */
export function multiple(a, b) {
  const isNegative = x => x < 0 || Object.is(x, -0);
  const isPositive = x => x > 0 || Object.is(x, 0);

  const sign = (isPositive(a) && isPositive(b)) || (isNegative(a) && isNegative(b)) ? 1 : -1;

  const newB = Math.abs(b);

  let result = 0;

  for (let newA = Math.abs(a); newA; newA--) {
    result += newB;
  }

  return sign < 0 ? -result : result;
}
