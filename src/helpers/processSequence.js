import Api from '../tools/api';
import { __, allPass, andThen, prop, tap, ifElse, modulo, length, gte, lte, compose, otherwise } from 'ramda';

const api = new Api();

const strokeLengthTen = str => lte(str.length, 10);
const strokeLengthTwo = str => gte(str.length, 2);
const validateNumber = str => /^[0-9]+(\.)?[0-9]*$/.test(str);
const validStroke = str => allPass([strokeLengthTen, strokeLengthTwo, validateNumber])(str);

const strokeToInt = str => compose(Math.round, parseFloat)(str);
const getNumberFromApi = number => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number });
const getConvertNumber = num => compose(andThen(prop('result')), getNumberFromApi)(num);
const square = number => number ** 2;

const getAnimalsApi = id => api.get(`https://animals.tech/${id}`, {});
const getAnimals = id => compose(andThen(prop('result')), getAnimalsApi)(id);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
 return compose(
     ifElse(
         validStroke,
         compose(
             otherwise(tap(handleError)),
             andThen(compose(andThen(handleSuccess), getAnimals, tap(writeLog), modulo(__, 3), tap(writeLog), square, tap(writeLog), length, tap(writeLog))),
             getConvertNumber,
             strokeToInt),
         () => handleError('ValidationError'),
     ),
     tap(writeLog)
 )(value);
}
 
export default processSequence;
