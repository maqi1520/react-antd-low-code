## react-antd-low-code

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **UI**: [Ant Design](http://ant.design/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 开发

安装 docker-compose

```bash
docker-compose up
docker-compose up -d  // 后台启动并运行容器
```

## 同步数据表

```bash
npx prisma db push
```

启动开发

```bash
yarn install
yarn dev
```

## 运行

```bash
yarn build
yarn start
```

## 环境变量

复制 `.env.example` 为 `.env` 文件，并修改相关配置

## 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/maqi1520/react-antd-low-code/blob/next&project-name=react-antd-low-code&repository-name=react-antd-low-code)
