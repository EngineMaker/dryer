# Dryer

## What
EngineMakerにある乾燥機の使用状況を監視する装置

## Usage

URLはもうちょっといい感じにしたい

## 乾燥機の使用状況を取得  
GET `https://em-dryer.deno.dev/{deviceId}`

## 乾燥機の電源ON/OFF
たぶん使わないですが、、せっかくなので作りました

POST `https://em-dryer.deno.dev/`

リクエストデータ
```
{
  "deviceID": "{deviceId}",
  "code": "switch_1",
  "value": {true or false}
}
```

## Development
開発するために適当なスマートプラグと[tuya.com](https://tuya.com) のアカウントが必要です。

スマートプラグは[これ](https://amzn.asia/d/0xS53w4)を買いました。

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
