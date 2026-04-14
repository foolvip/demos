# MySQL数据库设置指南

如果您在启动后端应用时遇到MySQL连接错误，按照以下步骤进行排查和设置：

## 1. 检查MySQL服务是否已启动

### Windows系统：
```bash
# 检查MySQL服务状态
sc query MySQL

# 如果服务未启动，启动服务
sc start MySQL
```

### macOS系统：
```bash
# 检查MySQL服务状态
brew services list | grep mysql

# 如果服务未启动，启动服务
brew services start mysql
```

### Linux系统：
```bash
# 检查MySQL服务状态
systemctl status mysql

# 如果服务未启动，启动服务
sudo systemctl start mysql
```

## 2. 验证MySQL连接配置

检查`.env`文件中的数据库连接配置：

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fullstack_db
```

- 确保`DB_HOST`和`DB_PORT`正确（默认端口为3306）
- 确保`DB_USER`和`DB_PASSWORD`正确
- 确保`DB_NAME`是您有权限创建的数据库名称

## 3. 测试MySQL连接

使用MySQL客户端测试连接：

```bash
mysql -u root -p -h localhost -P 3306
```

输入密码后，如果成功连接，您将看到MySQL提示符。

## 4. 创建数据库和用户（如果需要）

如果您需要创建新的数据库或用户：

```sql
-- 创建数据库
CREATE DATABASE fullstack_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户（可选）
CREATE USER 'fullstack_user'@'localhost' IDENTIFIED BY 'your_password';

-- 授予权限
GRANT ALL PRIVILEGES ON fullstack_db.* TO 'fullstack_user'@'localhost';
FLUSH PRIVILEGES;
```

然后更新`.env`文件中的连接信息。

## 5. 检查防火墙设置

确保防火墙允许MySQL端口（默认3306）的连接。

## 6. 重新启动后端应用

完成上述设置后，重新启动后端应用：

```bash
python app.py
```

## 7. 测试API端点

使用curl或Postman测试API端点：

```bash
# 测试基础API
curl http://localhost:5000/api/hello

# 测试数据库API（需要MySQL连接正常）
curl http://localhost:5000/api/items
```

## 常见问题排查

### 错误：`Can't connect to MySQL server on 'localhost' ([WinError 10061])`
- MySQL服务未启动
- 防火墙阻止连接
- 端口配置错误

### 错误：`Access denied for user 'root'@'localhost' (using password: YES)`
- 用户名或密码错误
- 用户没有本地连接权限

### 错误：`Unknown database 'fullstack_db'`
- 数据库不存在
- 用户没有创建数据库的权限

如果您仍然遇到问题，请检查MySQL日志文件以获取更详细的错误信息。