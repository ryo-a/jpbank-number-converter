"use strict";

exports.convert = function convert(input) {
    var result= {branchNumber, branchName, branchNameKatakana,accountNumber,accountNumberFilled};
    //TODO

    return result;
}

/**
 * バリデーション
 * @param  {string} arg バリデーション対象の文字列（口座番号など）
 * @param  {Number} digit 桁数
 * @return {Boolean}       適合していればtrueを返す
 */
function validateNumber(arg, digit) {
    if (typeof (arg) === 'string') {

        if (arg.match(/\D/)) {
            throw new Error(`${arg} には半角数字以外の文字が含まれています`);
        }

        if (digit) {
            if (arg.length != digit) {
                throw new Error(`${arg} は指定された桁数(${digit})と一致しません`);
            }
        }

        return true;

    } else {
        throw new TypeError(`${arg}がstringではありません`);
    }
}