# Dryer

## What
EngineMakerにある乾燥機の使用状況を監視する装置

## Usage
まだ使えません…

## Development
開発するために適当なスマートプラグと[tuya.com](https://tuya.com) のアカウントが必要です。

スマートプラグは↓のを買いました。
https://amzn.asia/d/0xS53w4

### Tuya APIの認証情報
TuyaのAPIを呼ぶためにClient IDとSecretが必要です。
[Cloud Developmentの管理画面](https://iot.tuya.com/cloud/)から「Create Cloud Project」ボタンを押して作成したプロジェクトの画面に書いてあります。

### .envファイル
Tuya APIの認証情報を.envファイルに保存します。
`.env.example`をコピーして使ってください。

```
TUYA_CLIENT_ID=xxxxx-your-client-id-xxxxxx
TUYA_CLIENT_SECRET=xxxxxx-your-client-secret-xxxxxx
```
