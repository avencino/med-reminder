FROM node:20-alpine

# Java 21とBashをインストール
RUN apk add --no-cache openjdk21-jre bash

# Firebase CLIをグローバルインストール
RUN npm install -g firebase-tools

WORKDIR /app

# Firebase設定ファイルをコピー
COPY firebase.json ./
COPY firestore.rules ./
COPY .firebaserc ./

# Functions用の依存関係インストール
COPY functions/package*.json ./functions/
RUN cd functions && npm install

# Functionsのソースコードをコピー
COPY functions/ ./functions/

# エミュレーターのポート公開
EXPOSE 4000 5000 5001 8080 9099

CMD ["firebase", "emulators:start", "--import=/data/emulator-data", "--export-on-exit=/data/emulator-data"]
