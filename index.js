"use strict";

const kansuji = require('./kansuji.json');

exports.convert = function convert(input) {
    var result = new Object();
    //{branchNumber, branchName, branchNameKatakana,accountNumber,accountNumberFilled};

    // 店番末尾の文字列を指定
    let branchNumberSuffix = '8';
    if (input.middleNumber && input.middleNumber == '1') { //振替口座の場合
        branchNumberSuffix = '9';
    } else if (input.middleNumber && input.middleNumber != '1') {
        throw new Error(`記号と口座番号の間の数字(${input.middleNumber})が不正です。1か空欄でなければなりません。`);
    }

    //記号
    if (input.signNumber && validateNumber(input.signNumber, 5)) {
        result.branchNumber = input.signNumber.substr(1, 2) + branchNumberSuffix;
        result.branchName = generateBranchName(result.branchNumber);
        result.branchNameKatakana = generateBranchName(result.branchNumber, true);
    } else {
        throw new Error('記号が不正です');
    }

    //口座番号

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

/**
 * 店名の生成
 * @param  {string} arg 生成対象とする番号
 * @param  {Boolean} katakana カタカナにするかどうか（デフォルトはfalse）
 * @return {string}       
 */
function generateBranchName(arg, katakana) {
    let target = arg;
    if (!katakana) {
        katakana = false;
    }

    for (var i = 0; i <= 9; i++) {
        let replacer = kansuji.filter(function (item, index) {
            if (item.number == i.toString()) return true;
        });

        let replaceJa = replacer[0].kanji;
        if (katakana == true) {
            replaceJa = replacer[0].katakana;
        }

        target = target.replace(new RegExp(replacer[0].number, 'g'), replaceJa);

    }

    return target;
}