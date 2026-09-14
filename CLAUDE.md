# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

**webtest1-app** は、Supabase認証機能付きの不動産管理Webアプリケーションです。
メールアドレス＋パスワードでの会員登録・ログインを行い、ログイン後は自分が登録した物件（物件名・家賃・エリア・間取り）を一覧表示・登録・編集・削除できることを目的としています。

## 技術スタック

- React 18（Vite 5 で構築）
- JavaScript（JSX）
- React Router（`react-router-dom`）でのルーティング
- Supabase（`@supabase/supabase-js`）による認証・データベース連携
- CSS（プレーンCSS、フレームワークやCSS-in-JSは使用しない）
- 状態管理は `useState` / `useEffect` のみ（外部の状態管理ライブラリは導入しない）

## ディレクトリ構成

```
webtest1-app/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env                  # Supabaseの接続情報（Git管理対象外）
├── .env.example
├── supabase/
│   └── schema.sql        # propertiesテーブル作成・RLSポリシー定義
├── src/
│   ├── main.jsx
│   ├── App.jsx           # ルーティング定義
│   ├── AuthContext.jsx   # 認証状態の管理
│   ├── RequireAuth.jsx   # 未ログイン時のリダイレクト
│   ├── supabaseClient.js # Supabaseクライアント初期化
│   ├── index.css
│   └── pages/
│       ├── LoginPage.jsx
│       ├── SignupPage.jsx
│       ├── PropertiesPage.jsx  # 物件一覧・CRUD操作
│       ├── PropertyForm.jsx    # 登録・編集共用フォーム
│       ├── AuthForm.css
│       └── PropertiesPage.css
└── CLAUDE.md
```

## 開発方針

- コンポーネントは役割ごとに分割し、状態管理はシンプルな `useState` を基本とする。
- Supabaseとの接続情報（URL・キー）は `.env` で管理し、コードに直接埋め込まない。
- 物件データへのアクセスはSupabaseのRLS（行レベルセキュリティ）により「自分が登録した物件のみ」に制限する。
- 動作確認は `npm run dev` で開発サーバーを起動して行う。

## コーディング規約

- インデントはスペース2つを基本とする。
- 変数・関数名はキャメルケース（例: `currentUser`）を使用する。
- コメントは「なぜそうしているか」が自明でない箇所にのみ日本語で最小限に記載する。
- 不要な抽象化やライブラリ導入は避け、シンプルな実装を優先する。

## コンポーネント命名規約

- コンポーネント名はパスカルケース（例: `PropertiesPage`）とし、ファイル名もコンポーネント名と一致させる（`PropertiesPage.jsx`）。
- コンポーネントに対応するスタイルシートは同名の `.css` ファイルとする（例: `PropertiesPage.jsx` → `PropertiesPage.css`）。
- イベントハンドラ関数は「動詞 + 対象」の形で命名する（例: `handleCreate`, `handleUpdate`, `handleDelete`）。
- 状態変数はキャメルケースで、内容が分かる名前にする（例: `properties`, `editingProperty`）。
- ページ単位のコンポーネントは `src/pages/` に配置し、それ以外の共通コンポーネントは `src/` 直下にフラットに配置する。

## Git運用ルール

- **コードを変更するたびに、必ず GitHub にプッシュすること。**
- 変更内容ごとに適切な単位でコミットし、コミットメッセージには変更内容が分かるように簡潔に記載する。
- 作業の流れ：
  1. コードを変更する
  2. `git add` で変更をステージングする
  3. `git commit` で変更をコミットする
  4. `git push` で GitHub リポジトリに反映する
- ローカルに変更を残したままにせず、都度リモートリポジトリへ同期する。

## デプロイ（Vercel）

- Vercelにデプロイしている。ビルド設定はVite標準（ビルドコマンド `npm run build`、出力先 `dist`）。
- `vercel.json` でSPAのルーティング（どのURLでも `index.html` を返す）を設定している。
- Supabaseの接続情報（`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`）はVercelダッシュボードの環境変数で設定し、`vercel.json` には含めない。

## デプロイ情報

- 本番URL：https://webtest1-3gxh71h8i-tack0327.vercel.app/
- Supabaseプロジェクト名：realestate-app

## 回答言語

このプロジェクトに関するやり取りでは、**必ず日本語で回答すること**。

## GitHubリポジトリ

https://github.com/Tack0327/webtest1-app.git
