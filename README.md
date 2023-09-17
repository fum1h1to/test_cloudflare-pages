# test_cloudflare-pages

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