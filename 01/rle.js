/**
 * Напишите функцию rle(input), реализующую примитивное RLE-сжатие входящей строки input.
 * Подробнее об RLE: https://ru.wikipedia.org/wiki/Кодирование_длин_серий
 *
 * Входящая строка сооттветствует regex паттерну /^[A-Z]+$/
 *
 * Пример:
 * rle('AAAB') === 'A3B'
 * rle('BCCDDDEEEE') === 'BC2D3E4'
 *
 * Больше примеров в тестах.
 *
 * @param  {string} input
 * @return {string}
 */
export function rle(input) {
  const obj = input.split('').reduce((a, b) => {
    a[b] = (a[b] || 0) + 1;
    return a;
  }, {});

  return Object.entries(obj).reduce((result, a) => result + a[0] + (a[1] === 1 ? '' : a[1]), '');
}
