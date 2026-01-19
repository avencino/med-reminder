# 💊 お薬リマインダー

薬の飲み忘れを防止するPWAアプリケーション

## 📋 目次

- [概要](#概要)
- [機能](#機能)
- [技術スタック](#技術スタック)
- [必要な環境](#必要な環境)
- [セットアップ](#セットアップ)
- [開発](#開発)
- [デプロイ](#デプロイ)
- [トラブルシューティング](#トラブルシューティング)

---

## 概要

お薬リマインダーは、薬の服用を忘れないようにWeb Push通知でリマインドするPWA（Progressive Web App）です。

### 主な特徴

- ✅ 複数の薬を登録・管理
- ⏰ 時刻指定で自動通知（朝・昼・夕・就寝前）
- 🔄 飲み忘れ時の繰り返し通知
- 📊 服薬記録と統計表示
- 📱 PWAでスマホにインストール可能
- 🔒 ユーザー認証でデータ保護

---

## 機能

### フェーズ1: MVP（開発中）
- ユーザー登録・ログイン
- 薬の登録・編集・削除
- 服薬スケジュール設定
- 手動チェック機能

### フェーズ2: 通知機能（予定）
- Web Push通知
- 繰り返し通知
- PWA化

### フェーズ3: 記録・統計（予定）
- 服薬履歴
- カレンダー表示
- 統計グラフ

---

## 技術スタック

### フロントエンド
- **React** 18.2 - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **Tailwind CSS** - スタイリング
- **React Router** - ルーティング

### バックエンド（サーバーレス）
- **Firebase Authentication** - ユーザー認証
- **Cloud Firestore** - NoSQLデータベース
- **Cloud Functions** - サーバーレス関数
- **Firebase Hosting** - 静的ホスティング
- **Firebase Cloud Messaging** - Web Push通知

### 開発環境
- **Docker** - コンテナ化
- **Docker Compose** - 複数コンテナ管理
- **Firebase Emulators** - ローカル開発環境

---

## 必要な環境

### 開発マシン
- **Node.js** 20以上
- **Docker Desktop** 最新版
- **Git**

### その他
- Googleアカウント（Firebase用）
- モダンブラウザ（Chrome, Firefox, Safari, Edge）

---

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd medicine-reminder
```

### 2. Firebase プロジェクト作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名: `medicine-reminder`
4. Webアプリを追加し、設定情報を取得

### 3. Firebase サービスの有効化

#### Authentication
```
1. Firebase Console → Authentication
2. 「Sign-in method」タブ
3. 「メール/パスワード」を有効化
```

#### Firestore Database
```
1. Firebase Console → Firestore Database
2. 「データベースの作成」
3. モード: Native mode (Standard)
4. ロケーション: asia-northeast1 (東京)
5. セキュリティルール: テストモードで開始
```

#### Cloud Messaging (Web Push)
```
1. プロジェクト設定 → クラウド メッセージング
2. 「鍵ペアを生成」でVAPIDキーを取得
```

### 4. 環境変数の設定

```bash
# .env.developmentを作成
cp .env.development.template .env.development
```

`.env.development`を編集して、Firebaseの設定情報を記入：

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_VAPID_KEY=your-vapid-key

VITE_USE_FIREBASE_EMULATOR=true
VITE_MOCK_NOTIFICATIONS=true
```

### 5. 依存関係のインストール

```bash
# ルートディレクトリの依存関係
npm install

# Functionsの依存関係
cd functions
npm install
cd ..
```

### 6. Firebaseプロジェクト設定

`.firebaserc`を編集して、プロジェクトIDを設定：

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 7. Docker環境のビルドと起動

```bash
# Dockerイメージをビルド
docker-compose build

# コンテナを起動
docker-compose up -d

# ログ確認
docker-compose logs -f
```

### 8. 動作確認

以下のURLにアクセスして確認：

- **フロントエンド:** http://localhost:5173
- **Firebase Emulator UI:** http://localhost:4000
- **Firestore:** http://localhost:8080
- **Authentication:** http://localhost:9099

---

## 開発

### 日常的な開発フロー

```bash
# 1. コンテナ起動
docker-compose up -d

# 2. ログ確認（別ターミナルで）
docker-compose logs -f

# 3. コード編集（ホットリロードで自動反映）
# src/配下のファイルを編集

# 4. 停止
docker-compose down
```

### よく使うコマンド

```bash
# コンテナの状態確認
docker-compose ps

# フロントエンドのログのみ表示
docker-compose logs -f frontend

# Firebase Emulatorのログのみ表示
docker-compose logs -f firebase-emulators

# コンテナに入る
docker-compose exec frontend sh
docker-compose exec firebase-emulators sh

# コンテナ再起動
docker-compose restart

# 完全クリーンアップ
docker-compose down -v
docker system prune -f
```

### エミュレーターデータの管理

```bash
# データをエクスポート（バックアップ）
docker-compose exec firebase-emulators firebase emulators:export /data/backup

# データをインポート（復元）
# docker-compose.ymlで自動的に/data/emulator-dataから読み込まれる
```

### Firestore セキュリティルールのテスト

```bash
# ルールをデプロイ（エミュレーターに反映）
docker-compose restart firebase-emulators
```

---

## デプロイ

### 方法1: 手動デプロイ

#### 準備

```bash
# Firebase CLIをインストール（ホストマシン）
npm install -g firebase-tools

# Firebaseにログイン
firebase login
```

#### 本番ビルド

```bash
# 本番用環境変数を設定
cp .env.production.template .env.production
# .env.productionを編集して本番の設定を記入

# ビルド
npm run build

# Functionsビルド
cd functions
npm run build
cd ..
```

#### デプロイ実行

```bash
# 全体をデプロイ
firebase deploy

# または個別にデプロイ
firebase deploy --only hosting        # フロントエンドのみ
firebase deploy --only functions      # Functionsのみ
firebase deploy --only firestore:rules # Firestoreルールのみ
```

### 方法2: GitHub Actions（自動デプロイ）

#### セットアップ

1. GitHub Secretsを設定：
   - `FIREBASE_TOKEN`: `firebase login:ci`で取得
   - `FIREBASE_PROJECT_ID`: プロジェクトID
   - Firebase設定の各値（APIキーなど）

2. GitHub Actionsワークフローが自動実行：
   - `main`ブランチへのpush → 本番デプロイ
   - `develop`ブランチへのpush → ステージングデプロイ
   - Pull Request作成 → プレビュー環境作成

---

## プロジェクト構造

```
medicine-reminder/
├── docker/                      # Docker設定
│   ├── frontend/Dockerfile      # フロントエンド用
│   ├── firebase/Dockerfile      # Firebase Emulator用
│   └── deploy/Dockerfile        # デプロイ用
├── functions/                   # Cloud Functions
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── src/                         # フロントエンドソース
│   ├── components/              # Reactコンポーネント
│   ├── pages/                   # ページコンポーネント
│   ├── lib/                     # ユーティリティ
│   │   └── firebase.ts          # Firebase初期化
│   ├── contexts/                # Reactコンテキスト
│   ├── App.tsx                  # メインアプリ
│   └── main.tsx                 # エントリーポイント
├── public/                      # 静的ファイル
├── docker-compose.yml           # Docker Compose設定
├── firebase.json                # Firebase設定
├── firestore.rules              # Firestoreセキュリティルール
├── .firebaserc                  # Firebaseプロジェクト設定
├── .env.development             # 開発環境変数
├── .env.production              # 本番環境変数
├── package.json                 # 依存関係
└── README.md                    # このファイル
```

---

## トラブルシューティング

### Docker関連

#### ポートが既に使用されている

```bash
# エラー: port 5000 already in use

# 解決策1: docker-compose.ymlでポート番号を変更
# "5000:5000" → "5002:5000"

# 解決策2: 使用中のプロセスを確認・停止
lsof -i :5000
kill -9 <PID>
```

#### コンテナが起動しない

```bash
# ログを確認
docker-compose logs

# コンテナを再ビルド
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### ファイル変更が反映されない

```bash
# vite.config.tsにpolling設定があるか確認
watch: {
  usePolling: true,
}

# コンテナを再起動
docker-compose restart frontend
```

### Firebase関連

#### Emulatorに接続できない

```bash
# エミュレーターのログを確認
docker-compose logs firebase-emulators

# Javaバージョンの確認（Java 21が必要）
docker-compose exec firebase-emulators java -version

# 再ビルド
docker-compose build --no-cache firebase-emulators
docker-compose up -d
```

#### PERMISSION_DENIED エラー

```
原因: Firestoreセキュリティルールが厳しすぎる

解決策: firestore.rulesを開発用に変更
allow read, write: if true;  // 開発中のみ
```

### ビルド関連

#### npm ci が失敗する

```bash
# package-lock.jsonを再生成
rm -rf node_modules package-lock.json
npm install

# functionsも同様
cd functions
rm -rf node_modules package-lock.json
npm install
cd ..
```

#### TypeScriptエラー

```bash
# 型定義を再インストール
npm install --save-dev @types/react @types/react-dom
```

---

## ライセンス

MIT License

---

## 開発者

開発者情報やコントリビューションガイドをここに記載

---

## 参考リンク

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker Documentation](https://docs.docker.com/)