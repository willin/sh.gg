---
title: 模块化开发、容器化开发
category: career
date: 2021-05-22 03:33:50 +8
tags: [career, thought tech, suggestion, product]
toc: true
---

# 使用微服务架构或 Mono Repo 架构中的问题

## 拆包不合理

### 一、类型的定义

（如 Typescript 中的 interface、type，或者请求/响应，参数/返回等 DTO），不应当放置到一个底层的通用包中。这样会导致一处业务修改，联动项目代码、底层包代码需要修改，然后需要发布包、更新依赖版本等，非常麻烦。

同时，大部分的类型定义是不具备复用的可能的。比如数据库 Schema，会有一些多余的不可操作的字段，如 id、时间戳、状态等，所以在 create 方法中，传入的参数，可能是 `Partial<SchemaEntity>`（也可能会有一些生成字段之类的特殊情况）。在接口请求参数中，更是会和数据库 create 方法的参与差异很大，比如说密码，用户输入是明文，存到数据库中是密文 + SALT。等等。返回值亦是如此。

为减少重复代码量和修改，和保证结构的稳定性，可以参考 TypeScript Handbook 中的一些小技巧：

<!-- more -->

- Type Manipulation： 从类型创建类型、泛型、 keyof、 typeof、索引访问、条件类型、映射类型、模板文字类型
- Utility Types： `Partial<Type>`、`Pick<Type, Keys>`、`Omit<Type, Keys>`、 `Exlude<Type, ExludedUnion>`、`Parameters<Type>`、`ReturnType<Type>` 等

### 二、先设计，再封装，后拆分

业务未设计完善时，切忌着急先封装成包。这样一旦发生调整，将会从下往上每一层都得做变更。

人无远虑必有近忧。能在设计过程中解决掉的问题，绝对不要拖到实现过程中迭代。设计中需要遵守的几点原则：

#### MVP 原则

即最简化可实行产品原则，按照以下顺序进行设计和实现：明确需求，满足基本需求，保证稳定性，完善需求，扩展需求，提高性能。

冰冻三尺非一日之寒。一口也吃不成一个胖子。无论多复杂的业务模块，都是拆分成了一个个小的子任务，每一个子任务模块设计完备了，进行扩展和整合。

#### 分治原则

压力下方，分而治之。不要在一个点上去耗费大量的性能和资源。往往在架构设计的时候，只有一到两个数据中心，数据中心将会处理大量的数据和请求，所以会承担很大的性能压力。那么， 能在区域服务器上进行的处理和运算，没有必要扔到数据中心去进行；能在网关上进行的处理和运算，没有必要扔到服务器上去进行；能在客户端上进行的处理和运算，没有必要扔到网关上去运行。

举个简单的例子，一台负载均衡器下的服务器配置可能是双核心，4GB 内存， 这一台服务器，能够承载的并发是 10 万级，而目前的智能终端(比如智能手机)，可能都是 4 核 8 核， 8GB 内存之类的，实际上已经有很强大的运算能力了。足够承担起很大一部分的数据预处理和初筛的工作。所以，可以将服务器的压力逐层进行下放，让下面连接的服务器，网关和终端各自承担一部分运算处理工作，充分利用各个存储运算单元。

## 函数定义不合理

一、 不推荐使用多参数方式定义一个函数。

示例：

```typescript
export functionA(arg1: string, arg2: number, arg3: string, arg4: number): void;

// 或

class ClassA {
  constructor(arg1: string, arg2: number, arg3: string, arg4: number) { }
}
```

推荐的做法为，单一对象参数，或 id + 单一对象参数的方式。

示例：

```typescript
// Class 示例
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

export class BaseDto {
  // eslint-disable-next-line
  constructor(data: any) {
    // 仅当作为基类，不确定输入类型时使用 any
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.assign(this, plainToClass(this.constructor as any, data));
      const errors = validateSync(this, {
        dismissDefaultMessages: true,
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors?.length > 0) {
        throw new Error("Validation Error Occurred");
      }
    }
  }
}
```

```typescript
// 方法示例
import { BaseDto, Validator, Transform, DB } from "@dao/base";
import {
  IsEmail,
  IsMobilePhone,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { UserEntity, UserRole } from "../entity";
import { getUserByUid } from "./get_user_by_uid.dao";
import { checkUserExist } from "./check_user.dao";
import { UserDaoErr } from "../error";

// 定义好单一对象参数的类型
export type UpdateUserDto = Partial<
  Pick<UserEntity, "role" | "username" | "email" | "mobile" | "passwd">
>;

// 如果需要数据校验，可以做一层封装
// 尤其是在接口请求、调用底层方法（如数据库操作）时，非常必要
class Model extends BaseDto implements UpdateUserDto {
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @Transform.ToLowerCase()
  @Validator.IsEnglishName()
  @IsOptional()
  username?: string;

  @IsEmail()
  @Transform.ToLowerCase()
  @IsOptional()
  email?: string;

  @IsMobilePhone("zh-CN")
  @Transform.ToLowerCase()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  @Transform.ToPassHash()
  passwd?: string;
}

/**
 * 修改用户信息
 * @param {string} uid 用户 id
 * @param {UpdateUserDto} data 单一对象参数，定义好类型
 * @returns {boolean}
 */
export async function updateUser(
  id: string,
  data: UpdateUserDto
): Promise<boolean> {
  // 此处为 class-transformer + class-validator 校验
  const item = new Model(data);
  // 如果上一步校验不通过，则会抛出错误
  const user = await getUserByUid(id);
  // 省略校验判断，荣用户名、手机号是否存在
  // ...
  return DB.updateById(id, item, DB.DBTABLE.User);
}
```

二、 做向下兼容。

这就是单一对象变量的好处，删除一个字段和新增一个字段，都会更加方便。

示例：

```typescript
export class CreateUserDto {
  username: string;

  // @deprecated 公司字段已弃用
  company?: string; // 废弃字段，只需要改成 optional 即可。
  // 即便不做向下兼容的操作，直接把该字段删除就可以了

  // 手机号 new in v1.0.1
  mobile?: string; // 如果 Client 没有升级，则不会传这个字段，所以也设置成 optional
}

export function createUser(user: CreateUserDto) {
  if (user.company) {
    // 如果影响业务，则抛出异常
    logger.info("该字段已经废弃，请停止使用，并升级到 v1.0.1");
  }
  if (!user.mobile) {
    // 兼容性操作，如需，下面是乱写的
    // eslint-disable-next-line no-param-reassign
    user.mobile = null;
  }
  // 省略代码
}
```

# 容器化开发

## 本地环境模块化

所有东西都在独立的容器内运行，如果不用，停止状态下只占用磁盘空间，出现了问题也就直接删除重建即可。

以 MySQL 为例，以前都是安装在本地，所有应用程序共用，只有一个版本，并且一旦出了问题，卸载重装也是很麻烦的事情。

现在只需要一个 Docker Compose 文件定义好启动即可，示例：

```yaml
# docker-compose.yml
version: "3"

services:
  mysql:
    image: mysql
    container_name: mysql
    command:
      # MySQL8的密码验证方式默认是 caching_sha2_password，但是很多的连接工具还不支持该方式
      # 就需要手动设置下mysql的密码认证方式为以前的 mysql_native_password 方式
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root # root用户的密码
      # MYSQL_USER: user # 创建新用户
      # MYSQL_PASSWORD: user_password # 新用户的密码
    ports:
      - 3306:3306
    volumes:
      - ./data:/var/lib/mysql
      - ./conf:/etc/mysql/conf.d
      - ./logs:/logs
    network_mode: bridge
```

配置好用户名密码、字符集、设定当前目录下来存放数据、日志和配置文件。

简单的几个命令进行操作：

```bash
# 启动
docker-compose up -d
# 停止
docker-compose down
# 删除所有数据
rm -rf data conf logs
# 重新创建镜像
docker-compose up -d --force-recreate
```

更多实用的容器参考项目： <https://github.com/WhiteMatrixTech/dev-in-docker>

## 模块化运行

以 Node.js 为例。

推荐镜像： `node:16-alpine` （如非特殊情况，使用当前最新的 alpine 版本）

更多镜像参考官方 Hub： https://hub.docker.com/_/node/

### 本地调试

TBD.

### 镜像发布

参考 Node.js 官方文档：[把一个 Node.js 应用程序 Docker 化](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)

写一个 `Dockerfile`：

```dockerfile
FROM node:16-alpine

LABEL maintainer "Willing Wang<i@sh.gg>"

COPY . /app
WORKDIR /app

RUN yarn
RUN yarn build

EXPOSE 3000
CMD [ "node", "dist/server.js" ]

```

```bash
# 打包镜像
docker build . -t <username>/node-app
# 运行镜像
docker run -p 3000:3000 <username>/node-app
```

# 模块化开发

TBD.
