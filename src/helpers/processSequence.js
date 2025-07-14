/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
//  import Api from '../tools/api';
//
//  const api = new Api();
//
//  /**
//   * Я – пример, удали меня
//   */
//  const wait = time => new Promise(resolve => {
//      setTimeout(resolve, time);
//  })
//
//  const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
//      /**
//       * Я – пример, удали меня
//       */
//      writeLog(value);
//
//      api.get('https://api.tech/numbers/base', {from: 2, to: 10, number: '01011010101'}).then(({result}) => {
//          writeLog(result);
//      });
//
//      wait(2500).then(() => {
//          writeLog('SecondLog')
//
//          return wait(1500);
//      }).then(() => {
//          writeLog('ThirdLog');
//
//          return wait(400);
//      }).then(() => {
//          handleSuccess('Done');
//      });
//  }
//
// export default processSequence;
import Api from '../tools/api';
import { allPass, pipe } from 'ramda';
const api = new Api();


const isNumber = str => /^(\d+(\.\d+)?|\.\d+)$/.test(str);
const isLengthValid = str => str.length >= 3 && str.length <= 9;
const isPositive = pipe(Number, n => n > 0);
const isValidInput = allPass([isNumber, isLengthValid, isPositive]);

const getBinary = api.get('https://api.tech/numbers/base');

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const onError = (err) => {
        handleError('ValidationError');
    };

    if (!isValidInput(value)) {
        handleError('ValidationError');
        return;
    }

    writeLog(value);

    const rounded = Math.round(Number(value));
    writeLog(rounded);

    getBinary({ from: 10, to: 2, number: rounded })
        .then((response) => {
            const binary = response.result;
            writeLog(binary);

            const length = binary.length;
            writeLog(length);

            const squared = Math.pow(length, 2);
            writeLog(squared);

            const mod3 = squared % 3;
            writeLog(mod3);

            return api.get(`https://animals.tech/${mod3}`)({});
        })
        .then((response) => {
            const animal = response.result;
            console.log(animal);
            handleSuccess(animal);
        })
        .catch(onError);
};


export default processSequence;

