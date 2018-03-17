# jpbank-number-converter

ゆうちょ銀行（Japan Post Bank）のキャッシュカードや通帳に記載されている番号と口座番号・支店名などを相互に変換するライブラリです。ゆうちょ銀行・日本郵政などとは一切関係ない非公式なものです。

ゆうちょ銀行はその歴史的な経緯から一般的な金融機関と異なる管理番号が使用されていますが、現在は他の金融機関に準じた番号が用意されています。  
しかしながら、利用者の手元にあるキャッシュカードからはそれが分かりづらく、[ゆうちょ銀行のサイト](https://www.jp-bank.japanpost.jp/kojin/sokin/furikomi/kouza/kj_sk_fm_kz_1.html)にて変換をする必要があります。  

このライブラリはゆうちょ銀行のサイトにて示されている[変換の公式](https://www.jp-bank.japanpost.jp/kojin/sokin/koza/kj_sk_kz_furikomi_ksk.html)に基づき、上記公式サイトの変換ページと同等の結果を得るためのシンプルなライブラリです。


## 使用方法

```js
const jpbank = require('jpbank-number-converter');
```


```js
var result = jpbank.convert({signNumber: '12345',number:'12345671'});

console.log(result.branchNumber); //238
console.log(result.branchName); //二三八
console.log(result.branchNameKatakana); //ニサンハチ
console.log(result.accountNumber); //1234567
console.log(result.accountNumberFilled); // 口座番号が7桁未満だった場合、先頭から0で埋めたもの
```

## 免責事項
MIT Licenseの通り、ライブラリの使用によって発生したトラブルに関して作者は一切の責任を負いません。  
実際に金銭の授受が発生するプラットフォームで導入する場合、入念なテストを行った上で使用してください。