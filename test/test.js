'use strict';
const assert = require('assert');
const jpbank = require('../');

describe('総合口座 7桁の番号変換', () => {

    let generalAccount = jpbank.convert({jpbankSignNumber: '11940',jpbankNumber:'12345671'});

    it('振替口座ではないと判定できている', () => {
        assert.equal(generalAccount.isTransferAccount, false);
    });

    it('記号→店番が正常に変換できている', () => {
        assert.equal(generalAccount.branchNumber, "198");
    });

    it('記号→店名（漢字）が正常に変換できている', () => {
        assert.equal(generalAccount.branchName, "一九八");
    });

    it('記号→店名（カタカナ）が正常に変換できている', () => {
        assert.equal(generalAccount.branchNameKatakana, "イチキユウハチ");
    });

    it('番号→口座番号が正常に変換できている', () => {
        assert.equal(generalAccount.accountNumber, "1234567");
    });

    it('番号→口座番号（0埋め）が正常に変換できている', () => {
        assert.equal(generalAccount.accountNumberFilled, "1234567");
    });

});