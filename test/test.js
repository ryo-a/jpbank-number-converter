'use strict';
const assert = require('assert');
const jpbank = require('../');

describe('総合口座 7桁の番号変換', () => {

    let generalAccount7digit = jpbank.convert({ jpbankSignNumber: '11940', jpbankNumber: '12345671' });

    it('振替口座ではないと判定できている', () => {
        assert.equal(generalAccount7digit.isTransferAccount, false);
    });

    it('記号→店番が正常に変換できている', () => {
        assert.equal(generalAccount7digit.branchNumber, "198");
    });

    it('記号→店名（漢字）が正常に変換できている', () => {
        assert.equal(generalAccount7digit.branchName, "一九八");
    });

    it('記号→店名（カタカナ）が正常に変換できている', () => {
        assert.equal(generalAccount7digit.branchNameKatakana, "イチキユウハチ");
    });

    it('番号→口座番号が正常に変換できている', () => {
        assert.equal(generalAccount7digit.accountNumber, "1234567");
    });

    it('番号→口座番号（0埋め）が正常に変換できている', () => {
        assert.equal(generalAccount7digit.accountNumberFilled, "1234567");
    });

});


describe('総合口座 6桁の番号変換', () => {

    let generalAccount6digit = jpbank.convert({ jpbankSignNumber: '11940', jpbankNumber: '1234561' });

    it('振替口座ではないと判定できている', () => {
        assert.equal(generalAccount6digit.isTransferAccount, false);
    });

    it('記号→店番が正常に変換できている', () => {
        assert.equal(generalAccount6digit.branchNumber, "198");
    });

    it('記号→店名（漢字）が正常に変換できている', () => {
        assert.equal(generalAccount6digit.branchName, "一九八");
    });

    it('記号→店名（カタカナ）が正常に変換できている', () => {
        assert.equal(generalAccount6digit.branchNameKatakana, "イチキユウハチ");
    });

    it('番号→口座番号が正常に変換できている', () => {
        assert.equal(generalAccount6digit.accountNumber, "123456");
    });

    it('番号→口座番号（0埋め）が正常に変換できている', () => {
        assert.equal(generalAccount6digit.accountNumberFilled, "0123456");
    });

});

describe('振替口座 6桁の番号変換', () => {

    let transferAccount6digit = jpbank.convert({ jpbankSignNumber: '01940', jpbankMiddleNumber: '1', jpbankNumber: '123456' });

    it('振替口座ではないと判定できている', () => {
        assert.equal(transferAccount6digit.isTransferAccount, true);
    });

    it('記号→店番が正常に変換できている', () => {
        assert.equal(transferAccount6digit.branchNumber, "199");
    });

    it('記号→店名（漢字）が正常に変換できている', () => {
        assert.equal(transferAccount6digit.branchName, "一九九");
    });

    it('記号→店名（カタカナ）が正常に変換できている', () => {
        assert.equal(transferAccount6digit.branchNameKatakana, "イチキユウキユウ");
    });

    it('番号→口座番号が正常に変換できている', () => {
        assert.equal(transferAccount6digit.accountNumber, "123456");
    });

    it('番号→口座番号（0埋め）が正常に変換できている', () => {
        assert.equal(transferAccount6digit.accountNumberFilled, "0123456");
    });

});

describe('振替口座 5桁の番号変換', () => {

    let transferAccount5digit = jpbank.convert({ jpbankSignNumber: '01940', jpbankMiddleNumber: '1', jpbankNumber: '12345' });

    it('振替口座ではないと判定できている', () => {
        assert.equal(transferAccount5digit.isTransferAccount, true);
    });

    it('記号→店番が正常に変換できている', () => {
        assert.equal(transferAccount5digit.branchNumber, "199");
    });

    it('記号→店名（漢字）が正常に変換できている', () => {
        assert.equal(transferAccount5digit.branchName, "一九九");
    });

    it('記号→店名（カタカナ）が正常に変換できている', () => {
        assert.equal(transferAccount5digit.branchNameKatakana, "イチキユウキユウ");
    });

    it('番号→口座番号が正常に変換できている', () => {
        assert.equal(transferAccount5digit.accountNumber, "12345");
    });

    it('番号→口座番号（0埋め）が正常に変換できている', () => {
        assert.equal(transferAccount5digit.accountNumberFilled, "0012345");
    });

});