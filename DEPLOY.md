# 開発・公開手順

## 1. Gitリポジトリの初期化

```bash
git init
git add .
git commit -m "Initial commit"
```

## 2. GitHubリポジトリの作成と連携

1. GitHubで新しいリポジトリを作成
2. ローカルリポジトリと連携:

```bash
git remote add origin https://github.com/YOUR_USERNAME/vape-coil-calculator.git
git branch -M main
git push -u origin main
```

## 3. GitHub Pagesの設定

1. GitHubリポジトリの「Settings」タブを開く
2. 左メニューから「Pages」を選択
3. Source を「GitHub Actions」に設定
4. 自動デプロイが開始されます

## 4. アクセス

公開URL: `https://YOUR_USERNAME.github.io/vape-coil-calculator/`

## 5. 開発フロー

```bash
# 変更を加える
git add .
git commit -m "Update feature"
git push origin main
# 自動的にGitHub Pagesにデプロイされます
```

## 代替公開方法

### Netlify
1. [Netlify](https://netlify.com)にアカウント作成
2. GitHubリポジトリを連携
3. 自動デプロイ設定

### Vercel
1. [Vercel](https://vercel.com)にアカウント作成
2. GitHubリポジトリをインポート
3. 自動デプロイ設定