/**
 * Напишите функцию mergeNumbers(number), складывающую
 * все цифры числа number до тех пор, пока не получится
 * однозначный результат.
 *
 * Пример:
 * mergeNumbers(1) === 1
 * mergeNumbers(10001) === 2
 * mergeNumbers(15334232) === 5
 * mergeNumbers(50349814743854) === 2
 *
 * @param number
 */
export function mergeNumbers(number) {
  if (number < 10) {
    return number;
  }

  const newNumber = number
    .toString()
    .split('')
    .reduce((sum, v) => sum + +v, 0);

  const result = mergeNumbers(newNumber);

  return result;
}
