import {prop, compose, equals, allPass, not, and, length, values, filter, anyPass, gte, or, gt} from 'ramda';

const equalColor = color => compose(equals(color));
const checkColor = (figure, color) => compose(equalColor(color), prop(figure));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (object) => {
    return allPass([checkColor('star', 'red'), checkColor('square', 'green'),
        checkColor('triangle', 'white'), checkColor('circle', 'white')])(object);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (object) => {
    return gte(length(filter(equals('green'), values(object))), 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (object) => {
    const blue = length(filter(equals('blue'), values(object)));
    const red = length(filter(equals('red'), values(object)));
    return and(equals(blue, red), not(equals(red, 0)));
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (object) => {
    return allPass([
        checkColor('star', 'red'),
        checkColor('square', 'orange'),
        checkColor('circle', 'blue')])(object);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (object) => {
    const red = gte(length(filter(equals('red'), values(object))), 3);
    const blue = gte(length(filter(equals('blue'), values(object))), 3);
    const orange = gte(length(filter(equals('orange'), values(object))), 3);
    const green = gte(length(filter(equals('green'), values(object))), 3);

    return or(green, or(red, or(blue, orange)));
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (object) => {
    const green = anyPass([checkColor('star', 'green'), checkColor('square', 'green'),
        checkColor('circle', 'green')])(object);
    const red = filter(equals('red'), values(object));
    return and(checkColor('triangle', 'green')(object), and(green, gt(length(red), 0)));
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (object) => {
    return equals(length(filter(equals('orange'), values(object))), 4);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (object) => {
    return and(not(checkColor('star', 'white')(object)), not(checkColor('star', 'red')(object)));
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (object) => {
    return equals(length(filter(equals('green'), values(object))), 4);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (object) => {
    const colorTriangle = prop('triangle', object);
    const colorSquare = prop('square', object);

    return and(equals(colorTriangle, colorSquare),
        and(not(equals(colorTriangle, 'white')), not(equals(colorSquare, 'white'))));
};
