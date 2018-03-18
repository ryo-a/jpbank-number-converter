"use strict";
const kansuji = require('./kansuji.json');

exports.convert = function convert(input) {
    var result = new Object();
    //{branchNumber, branchName, branchNameKatakana,accountNumber,accountNumberFilled};

    // ゆうちょ店番末尾の文字列を指定
    let branchNumberSuffix = '8';
    if (input.jpbankSignNumber.slice(0,1) == '1') { //振替口座の場合（記号の先頭が1）
        branchNumberSuffix = '9';
    }

    // ゆうちょ記号から店番・店名を生成
    if (input.jpbankSignNumber && validateNumber(input.jpbankSignNumber, 5)) {
        result.branchNumber = input.jpbankSignNumber.substr(1, 2) + branchNumberSuffix;
        result.branchName = generateBranchName(result.branchNumber);
        result.branchNameKatakana = generateBranchName(result.branchNumber, true);
    } else {
        throw new Error('記号が不正です');
    }

    // ゆうちょ番号から口座番号を生成
    if (input.jpbankSignNumber.slice(0,1) == '1') { //振替口座の場合
        result.accountNumber = input.jpbankNumber; //番号そのまま
    } else { //総合口座・通常口座などの場合
        if (input.jpbankNumber.slice(-1) == '1') {
            result.accountNumber = input.jpbankNumber.slice(0, -1); // 末尾の1を削除
        } else {
            throw new Error(`番号(${input.jpbankNumber})が不正です。 振替口座以外の場合、番号の最後の文字 1 となるはずです。`);
        }
    }

    //7桁未満の場合に口座番号の先頭を0で埋める
    let zeroForFill = '';
    if (result.accountNumber.length < 7) {
        for (var i = 0; i < 7 - result.accountNumber.length; i++) {
            zeroForFill += '0';
        }
    }
    result.accountNumberFilled = zeroForFill + result.accountNumber;

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