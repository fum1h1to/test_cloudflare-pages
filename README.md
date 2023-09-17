# test_cloudflare-pages

## introduction
cloudflare pagesの検証用

### developブランチ: プレビュー環境（basic認証あり）
    
[プレビュー環境](https://develop.test-cloudflare-pages-2ev.pages.dev/)

※ ページ下部に「プレビュー環境」とあればプレビュー環境です。

| basic認証 | |
| ---- | ---- |
| username | test |
| password | password |

| cloudflareの設定画面から設定できる環境変数 | |
| ---- | ---- |
| PRODUCT_MODE | preview |
| BASIC_USERNAME | test |
| BASIC_PASSWORD | password |
| NODE_VERSION | v18.17.1 |
| YARN_VERSION | v1 |

### mainブランチ: 本番環境
    
[本番環境](https://test-cloudflare-pages-2ev.pages.dev/)

| cloudflareの設定画面から設定できる環境変数 | |
| ---- | ---- |
| PRODUCT_MODE | production |
| NODE_VERSION | v18.17.1 |
| YARN_VERSION | v1 |

## 備考
### デプロイされるタイミング
プレビュー環境はdevelopブランチにプッシュされた時

本番環境はmainブランチにプッシュされた時

### basic認証について
basic認証は、cloudflare pages functionを用いて実装しています。

functionsのリクエスト数を抑えるため、```PRODUCT_MODE```が```preview```であれば、```functions```を生成し、そうでなければ、生成しないという処理を行っています。

具体的には、```cloudflare-config```ディレクトリ内をpreviewの場合はプロジェクトルートにすべてコピーするという処理を行っています。

## 作業手順
### nodeのインストール
開発環境を整えるためにnode.jsが必要になります。

下記からインストールをしてください。

[nodeインストール](https://nodejs.org/ja/download)

versionは18.17.1を想定しています。

### 開発環境の構築
0. nodeのバージョン確認

    ```
    node -v
    ```
    ```v18.17.1```と出れば大丈夫です。

1. ```.env```ファイルの準備

    ```.env.example```を```.env```に変更

1. モジュールのインストール
    ```
    npm install
    ```

    yarn を使用する場合は、
    ```
    yarn install
    ```

1. 開発環境の開始
    ```
    npm run start
    ```

    yarn を使用する場合は、
    ```
    yarn start
    ```

ここまでやると```http://localhost:8080```にサーバが立ち上がるので、アクセスするとサイトを見ることができます。

また、ホットリロードに対応しているため、開発中にコードを保存すると、変更が自動で反映されます。

## ビルド
1. モジュールのインストール
    ```
    npm install
    ```

    yarn を使用する場合は、
    ```
    yarn install
    ```

1. build
    ```
    npm run build
    ```

    yarn を使用する場合は、
    ```
    yarn build
    ```

```build```にコードが生成されます。