# 郭宇 · 个人主页

求职导向个人主页，覆盖食品/化工 + 动漫制作两个方向。

## 本地预览

直接用浏览器打开 `index.html`。

## 部署到 Vercel

1. 将本项目推送到 GitHub 仓库
2. 在 Vercel 中导入该仓库
3. 设置环境变量：
   - `ADMIN_PASSWORD` — 管理后台登录密码
   - `GITHUB_REPO_OWNER` — GitHub 用户名
   - `GITHUB_REPO_NAME` — 仓库名
   - `GITHUB_TOKEN` — GitHub Personal Access Token (repo 权限)
4. 部署完成后，管理后台地址为 `https://你的域名/admin/`

## 自定义域名

在 Vercel 项目设置中添加自定义域名，然后去域名服务商配置 DNS 指向 Vercel。

## 管理后台

访问 `/admin/`，输入密码登录后可管理：
- 创意合集（文字+图片）
- 学习记录（问题+解决方案）

## 待填写内容

- [ ] 教育背景详细信息
- [ ] 技能标签列表
- [ ] 联系方式（邮箱/微信/B站）
- [ ] 头像照片
- [ ] 视频文件上传（建议使用B站嵌入或CDN外链）
