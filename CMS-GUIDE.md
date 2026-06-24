# PAULILY 国际站 — Sanity CMS 配置指南

## 项目 ID: 6at2dhek | 数据集: production

---

## 第一步：安装依赖

在你的电脑上打开 PowerShell 或 CMD，进入项目目录执行：

```powershell
cd C:\Users\lothar\WorkBuddy\2026-06-16-22-32-41\paulily-intl
npm install --registry=https://registry.npmmirror.com
```

> 如果报错，可以试试不用镜像：
> ```powershell
> npm install
> ```

---

## 第二步：配置 Sanity CORS

在浏览器中打开 Sanity 管理后台：

👉 https://www.sanity.io/manage/project/6at2dhek

1. 进入项目后，点击左侧菜单 **"API"** → **"CORS Origins"**
2. 点击 **"Add CORS Origin"**
3. 添加以下两个地址：
   - `http://localhost:3000`（本地开发）
   - `https://paulily.com`（正式站点）
4. 每个都勾选 **"Allow credentials"** ✅

---

## 第三步：启动本地开发服务器

```powershell
npm run dev
```

然后访问：
- 🌐 网站：http://localhost:3000
- 🎨 CMS 后台：http://localhost:3000/studio

第一次打开 Studio 时，需要登录你的 Sanity 账号。

---

## 第四步：导入初始数据

在项目目录下运行：

```powershell
npx sanity exec src/sanity/seed.ts --with-credentials
```

这会自动将以下数据导入到 Sanity：
- 6 个产品（至尊、幽灵、行者、殿堂、新月、堡垒）
- 4 个产品系列（墨龙、暗影、独行、哥特）
- 3 个工艺步骤
- 3 个品牌数据
- 1 个站点配置

---

## 第五步：在 Studio 中编辑内容

打开 http://localhost:3000/studio 后，你会看到以下内容类型：

| 内容类型 | 说明 | 可编辑字段 |
|---------|------|-----------|
| **Product** | 产品信息 | 名称（中/英）、系列、价格、材质、描述、尺寸、MOQ、图片、特性列表 |
| **Product Series** | 产品系列 | 系列名（中/英）、描述 |
| **Craftsmanship Step** | 工艺步骤 | 编号、标题（中/英）、描述、图片 |
| **Brand Content** | 品牌内容 | 英雄区、品牌故事、价值观等区块的文案 |
| **Heritage Stat** | 品牌数据 | 数字、标签（英/中） |
| **Site Configuration** | 网站配置 | 标题、描述、邮箱、电话、地址、Logo、Catalog PDF |

### 重点操作：

### 添加/修改产品图片
1. 在 Studio 中点击 **"Product"**
2. 选择一个产品（如 "The Sovereign"）
3. 点击 **"Product Image"** 区域
4. 上传你的产品照片（建议用高质量白底图）
5. 可以设置 **hotspot**（热点）来控制图片裁剪焦点
6. 点击 **"Publish"** 发布

### 修改品牌文案
1. 在 Studio 中点击 **"Brand Content"**
2. 选择一个 section（如 "hero"）
3. 修改英文/中文文案
4. 点击 **"Publish"**

### 上传产品手册 PDF
1. 在 Studio 中点击 **"Site Configuration"**
2. 在 **"Product Catalog PDF"** 区域上传你的 PDF 文件
3. 网站首页的 "Download PDF Catalog" 按钮就会自动链接到这个文件

---

## 第六步：部署到 Vercel

修改完内容后，推送到 GitHub 并部署：

```powershell
git add .
git commit -m "Add Sanity CMS integration"
git push origin main
```

Vercel 会自动重新构建部署。

### Vercel 环境变量设置

在 Vercel 项目设置 → Environment Variables 中添加：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `6at2dhek` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

---

## 常见问题

### Q: Studio 打不开？
确保已添加 CORS Origin（第二步），并且 npm install 已成功。

### Q: 数据修改后网站没有更新？
- Sanity 使用 CDN 缓存，更新可能需要几分钟
- 本地开发用 `npm run dev` 可以即时看到变化

### Q: 怎么添加新产品？
在 Studio 中点击 **"Product"** → **"Create new"**，填写所有字段并上传图片，然后 Publish。

### Q: 怎么替换 SVG 占位图？
只需要在 Studio 中上传真实的产品图片，代码会自动使用 Sanity 图片替代 SVG 占位符。

### Q: 免费版够用吗？
Sanity 免费计划：5 用户、10GB 存储、无限 API 请求。对于 B2B 展示站完全够用。

---

## 文件结构说明

```
paulily-intl/
├── sanity.config.ts          ← Sanity Studio 配置
├── sanity.cli.ts              ← Sanity CLI 配置
├── .env.local                 ← 环境变量（Project ID 等）
├── src/
│   ├── sanity/
│   │   ├── schemas.ts         ← 数据模型定义（6种类型）
│   │   └── seed.ts            ← 初始数据导入脚本
│   ├── lib/
│   │   ├── sanity.ts          ← Sanity Client + Image URL Builder
│   │   ├── sanity-fetch.ts    ← 数据获取函数（带本地 fallback）
│   │   └ data.ts              ← 原始本地数据（作为后备）
│   ├── app/
│   │   ├── studio/[[...index]]/ ← Sanity Studio 嵌入路由
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
```

---

**🎉 配置完成后，你再也不需要改代码来修改网站内容了！**
所有文字、图片、PDF 都可以在 Sanity Studio 中直接编辑，网站会自动读取最新内容。
