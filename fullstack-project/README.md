# 全栈项目示例

这是一个全栈项目示例，前端使用React技术体系，后端使用Python技术体系。

## 项目结构

```
fullstack-project/
├── frontend/          # React前端
│   ├── src/
│   │   ├── App.jsx    # 主应用组件
│   │   ├── main.jsx   # React入口
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/           # Python后端
│   ├── app.py         # Flask应用
│   ├── requirements.txt
│   └── .env           # 环境变量配置（数据库连接信息）
└── README.md
```

## 运行项目

### 前端（React）

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

前端应用将在 http://localhost:3000 运行。

### 后端（Python + MySQL）

1. 进入后端目录：
```bash
cd backend
```

2. 创建虚拟环境（可选但推荐）：
```bash
python -m venv venv
```

3. 激活虚拟环境：
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. 安装依赖：
```bash
pip install -r requirements.txt
```

5. 配置数据库连接：
   - 编辑 `.env` 文件，修改数据库连接信息：
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=fullstack_db
     ```
   - 确保MySQL服务已启动
   - 确保具有创建数据库的权限

6. 启动Flask应用：
```bash
python app.py
```

应用将自动：
- 创建数据库（如果不存在）
- 创建表结构
- 插入示例数据

后端API将在 http://localhost:5000 运行。

## API端点

### 基础API
- GET `/api/hello`：返回欢迎消息
- GET `/api/data`：返回所有数据

### Items API（完整CRUD操作）
- GET `/api/items`：获取所有项目
- GET `/api/items/<id>`：获取单个项目详情
- POST `/api/items`：创建新项目
  - 请求体：`{"name": "项目名称", "description": "项目描述"}`
- PUT `/api/items/<id>`：更新项目
  - 请求体：`{"name": "新名称", "description": "新描述"}`（可选字段）
- DELETE `/api/items/<id>`：删除项目

## 技术栈

### 前端
- React 18
- Vite
- JavaScript

### 后端
- Python 3
- Flask
- Flask-CORS
- PyMySQL（MySQL数据库驱动）
- python-dotenv（环境变量管理）

## 功能说明

前端应用会从后端获取数据并显示在页面上，展示了前后端之间的通信。