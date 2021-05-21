## 在线查看

https://react-antd-low-code.herokuapp.com/

## 开发

安装docker-compose

```bash
docker-compose up
docker-compose up -d  // 后台启动并运行容器
```

## 同步数据表

```bash
cd server 
npx prisma db push
```

运行

```bash
npm run build
npm start
```

启动开发

```bash
npm run dev:s
npm run dev:c
```

## 部署到heroku

```bash
$heroku login
```

登录你的账号和密码

```bash
$heroku apps
=== user@gmail.com Apps
myaplication
```

连接远程bash

```bash
$heroku run bash --app myaplication 
```

## 同步数据表

```bash
cd server 
npx prisma db push
```