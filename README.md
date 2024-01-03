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

## 参照運用
Webサイト  
https://dryer.emaker.dev/

### ドメイン
ドメインはGoogle Domain 年単位の自動更新。更新日は1月1日。料金は年1,400円  
whoisを引くとレジストラ「Squarespace Domains」って表示される。業務を移管したらしい。これだからGoogleは……  
https://domains.google.com/registrar/emaker.dev

### サーバー
deno deployで動いている。Freeプラン  
https://dash.deno.com/projects/em-dryer

## 外部サービス
### データベース
SupabaseのFreeプランでPostgreSQLを借りている。無料枠は500MBまで  
さっき見たらプロジェクトが一時停止されていた。なんでや  
https://supabase.com/dashboard/project/xxjeptedxhnjyekdznzq

### IoTプラットフォーム
Tuya
スマートプラグを登録してAPIから電源をON/OFFしたり使用状況を取得したりできるようにしてくれるサービス
https://iot.tuya.com/cloud/basic?id=p167197225117677xpvq&toptab=project

### ジョブ実行
なんか設定した記憶があったけどそんなものはなかった  
設定したい
