/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { allPass, anyPass, equals, prop, filter } from 'ramda';
// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    ({ star }) => star === 'red',
    ({ square }) => square === 'green',
    ({ triangle }) => triangle === 'white',
    ({ circle }) => circle === 'white',
]);
// export const validateFieldN1 = ({star, square, triangle, circle}) => {
//     if (triangle !== 'white' || circle !== 'white') {
//         return false;
//     }
//
//     return star === 'red' && square === 'green';
// };

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) =>
    [star, square, triangle, circle].filter(color => color === 'green').length >= 2;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
    let redColorCount = [star, square, triangle, circle].filter(c => c === 'red').length;
    let blueColorCount = [star, square, triangle, circle].filter(c => c === 'blue').length
    return  redColorCount === blueColorCount
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    ({ star }) => star === 'red',
    ({ square }) => square === 'orange',
    ({ circle }) => circle === 'blue',
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle].filter(c => c !== 'white');
    return ['red', 'green', 'blue', 'orange'].some(
        color => colors.filter(c => c === color).length >= 3
    );
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
    const greenColorCount = [star, square, triangle, circle].filter(c => c === 'green').length;
    const redColorCount = [star, square, triangle, circle].filter(c => c === 'red').length;
    return (
        greenColorCount === 2 &&
        redColorCount === 1 &&
        triangle === 'green'
    );
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) => {
    return [star, square, triangle, circle].filter(c => c === 'orange').length === 4
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (
    ({ star }) => star !== 'red' && star  !== 'white');

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
    ({ star }) => star === 'green',
    ({ square }) => square === 'green',
    ({ triangle }) => triangle === 'green',
    ({ circle }) => circle === 'green',
]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ square, triangle }) =>
    triangle === square && triangle !== 'white';
