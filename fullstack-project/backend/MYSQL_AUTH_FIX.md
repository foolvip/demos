# MySQL认证问题解决方案

根据API返回的错误信息：
```json
{
  "error_code": 1045,
  "error_detail": "Access denied for user 'root'@'localhost' (using password: YES)",
  "error_type": "OperationalError",
  "message": "Database connection error: (1045, \"Access denied for user 'root'@'localhost' (using password: YES)\"). Please check if MySQL is running, credentials are correct, and user has proper permissions."
}
```

**问题：MySQL的root用户密码与配置文件中的密码不匹配。**

## 解决方案

### 方案1：修改MySQL用户密码

如果您知道当前的root密码，或者需要重置密码：

#### Windows系统：

1. 打开命令提示符（管理员权限）
2. 停止MySQL服务：
   ```bash
   net stop MySQL
   ```
3. 以跳过权限检查的方式启动MySQL：
   ```bash
   mysqld --skip-grant-tables
   ```
4. 打开另一个命令提示符窗口，连接到MySQL(登录mysql，不输入密码)：
   ```bash
   mysql -u root -p
   ```
5. 重置root密码：
   ```sql
   FLUSH PRIVILEGES;
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
   ```
6. 重启MySQL服务：
   ```bash
   net start MySQL
   ```

#### macOS/Linux系统：

1. 停止MySQL服务：
   ```bash
   sudo systemctl stop mysql
   # 或
   sudo service mysql stop
   ```
2. 以跳过权限检查的方式启动MySQL：
   ```bash
   sudo mysqld_safe --skip-grant-tables &
   ```
3. 连接到MySQL：
   ```bash
   mysql -u root
   ```
4. 重置root密码：
   ```sql
   FLUSH PRIVILEGES;
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
   ```
5. 重启MySQL服务：
   ```bash
   sudo systemctl restart mysql
   # 或
   sudo service mysql restart
   ```

### 方案2：修改配置文件中的密码

如果您知道正确的root密码，可以修改`.env`文件中的`DB_PASSWORD`值：

```dotenv
DB_PASSWORD=your_actual_root_password
```

### 方案3：创建新的MySQL用户

为应用创建一个新的专用用户（推荐做法）：

1. 连接到MySQL：
   ```bash
   mysql -u root -p
   ```

2. 创建新用户并授予权限：
   ```sql
   -- 创建用户
   CREATE USER 'fullstack_user'@'localhost' IDENTIFIED BY 'secure_password';
   
   -- 创建数据库
   CREATE DATABASE fullstack_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   
   -- 授予权限
   GRANT ALL PRIVILEGES ON fullstack_db.* TO 'fullstack_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. 更新`.env`文件：
   ```dotenv
   DB_USER=fullstack_user
   DB_PASSWORD=secure_password
   DB_NAME=fullstack_db
   ```

## 验证修复

1. 重启后端应用：
   ```bash
   cd fullstack-project/backend
   python app.py
   ```

2. 测试API端点：
   ```bash
   curl http://localhost:5000/api/items
   ```

如果修复成功，您将看到包含示例数据的JSON响应。

## 常见问题

### 错误："Can't connect to MySQL server on 'localhost'"
- MySQL服务未启动
- 解决方案：启动MySQL服务

### 错误："Unknown database 'fullstack_db'"
- 数据库不存在
- 解决方案：创建数据库或修改DB_NAME配置

### 错误："Authentication plugin 'caching_sha2_password' cannot be loaded"
- MySQL 8.0+默认使用caching_sha2_password认证
- 解决方案：使用以下命令切换认证方式：
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
  FLUSH PRIVILEGES;
  ```

如果您仍然遇到问题，请提供详细的错误信息和您的操作系统，以便进一步诊断。