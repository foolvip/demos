from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pymysql
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 数据库连接配置
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'port': int(os.environ.get('DB_PORT', 3306)),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', 'password'),
    'db': os.environ.get('DB_NAME', 'fullstack_db'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

# 获取数据库连接
def get_db_connection():
    return pymysql.connect(**DB_CONFIG)

# 初始化数据库
def init_db():
    try:
        connection = pymysql.connect(
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        
        try:
            with connection.cursor() as cursor:
                # 创建数据库
                cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['db']} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
            connection.commit()
            
            # 连接到新创建的数据库
            connection.select_db(DB_CONFIG['db'])
            
            with connection.cursor() as cursor:
                # 创建items表
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS items (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        description TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                ''')
                
                # 插入示例数据
                cursor.execute('SELECT COUNT(*) as count FROM items')
                if cursor.fetchone()['count'] == 0:
                    sample_items = [
                        ('Item 1', 'This is the first item'),
                        ('Item 2', 'This is the second item'),
                        ('Item 3', 'This is the third item')
                    ]
                    cursor.executemany(
                        'INSERT INTO items (name, description) VALUES (%s, %s)',
                        sample_items
                    )
            
            connection.commit()
            print("MySQL数据库初始化成功！")
        
        finally:
            connection.close()
            
    except pymysql.err.OperationalError as e:
        print("\n" + "="*60)
        print("MySQL连接错误！")
        print(f"错误信息: {e}")
        print("="*60)
        print("请检查以下几点:")
        print("1. MySQL服务是否已启动")
        print("2. 数据库连接配置是否正确 (.env 文件)")
        print("3. 数据库用户是否有正确的权限")
        print("4. MySQL端口是否正确 (默认: 3306)")
        print("="*60)
        print("应用将继续运行，但数据库功能将不可用。")
        print("="*60 + "\n")
    except Exception as e:
        print(f"数据库初始化错误: {e}")
        print("应用将继续运行，但数据库功能将不可用。")

# 初始化数据库
try:
    init_db()
except Exception as e:
    print(f"初始化数据库时发生严重错误: {e}")
    print("应用将继续运行，但数据库功能将不可用。")

# 数据库操作的通用错误处理装饰器
from functools import wraps

def db_error_handler(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except pymysql.err.OperationalError as e:
            # 提供更详细的错误信息
            error_msg = f"Database connection error: {str(e)}. "
            error_msg += "Please check if MySQL is running, credentials are correct, and user has proper permissions."
            return jsonify({
                'message': error_msg,
                'success': False,
                'error_type': 'OperationalError',
                'error_code': e.args[0],
                'error_detail': e.args[1]
            }), 500
        except pymysql.err.ProgrammingError as e:
            return jsonify({
                'message': f"Database programming error: {str(e)}",
                'success': False,
                'error_type': 'ProgrammingError',
                'error_code': e.args[0],
                'error_detail': e.args[1]
            }), 500
        except pymysql.err.IntegrityError as e:
            return jsonify({
                'message': f"Database integrity error: {str(e)}",
                'success': False,
                'error_type': 'IntegrityError',
                'error_code': e.args[0],
                'error_detail': e.args[1]
            }), 500
        except Exception as e:
            return jsonify({
                'message': f'Database operation failed: {str(e)}',
                'success': False,
                'error_type': 'GeneralError'
            }), 500
    return decorated_function

@app.route('/api/hello')
def hello():
    return jsonify({
        'message': 'Hello from Python backend with MySQL!',
        'status': 'success'
    })

@app.route('/api/data')
@db_error_handler
def get_data():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM items')
            items = cursor.fetchall()
        return jsonify({
            'items': items,
            'total': len(items)
        })
    finally:
        connection.close()

@app.route('/api/items', methods=['GET'])
@db_error_handler
def get_items():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM items')
            items = cursor.fetchall()
        return jsonify({
            'items': items,
            'success': True
        })
    finally:
        connection.close()

@app.route('/api/items/<int:item_id>', methods=['GET'])
@db_error_handler
def get_item(item_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM items WHERE id = %s', (item_id,))
            item = cursor.fetchone()
        if item:
            return jsonify({
                'item': item,
                'success': True
            })
        else:
            return jsonify({
                'message': 'Item not found',
                'success': False
            }), 404
    finally:
        connection.close()

@app.route('/api/items', methods=['POST'])
@db_error_handler
def create_item():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({
            'message': 'Name is required',
            'success': False
        }), 400
    
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'INSERT INTO items (name, description) VALUES (%s, %s)',
                (data['name'], data.get('description', ''))
            )
            connection.commit()
            item_id = cursor.lastrowid
        
        return jsonify({
            'message': 'Item created successfully',
            'item_id': item_id,
            'success': True
        }), 201
    finally:
        connection.close()

@app.route('/api/items/<int:item_id>', methods=['PUT'])
@db_error_handler
def update_item(item_id):
    data = request.get_json()
    if not data:
        return jsonify({
            'message': 'No data provided',
            'success': False
        }), 400
    
    connection = get_db_connection()
    try:
        # 检查项目是否存在
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM items WHERE id = %s', (item_id,))
            if not cursor.fetchone():
                return jsonify({
                    'message': 'Item not found',
                    'success': False
                }), 404
        
        # 更新项目
        with connection.cursor() as cursor:
            update_fields = []
            update_values = []
            
            if 'name' in data:
                update_fields.append('name = %s')
                update_values.append(data['name'])
            
            if 'description' in data:
                update_fields.append('description = %s')
                update_values.append(data['description'])
            
            update_values.append(item_id)
            
            cursor.execute(
                f'UPDATE items SET {", ".join(update_fields)} WHERE id = %s',
                update_values
            )
            
            connection.commit()
        
        return jsonify({
            'message': 'Item updated successfully',
            'success': True
        })
    finally:
        connection.close()

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
@db_error_handler
def delete_item(item_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # 检查项目是否存在
            cursor.execute('SELECT * FROM items WHERE id = %s', (item_id,))
            if not cursor.fetchone():
                return jsonify({
                    'message': 'Item not found',
                    'success': False
                }), 404
            
            # 删除项目
            cursor.execute('DELETE FROM items WHERE id = %s', (item_id,))
            connection.commit()
        
        return jsonify({
            'message': 'Item deleted successfully',
            'success': True
        })
    finally:
        connection.close()

# Skills API endpoints
@app.route('/api/skills', methods=['GET'])
@db_error_handler
def get_skills():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM skills')
            skills = cursor.fetchall()
        return jsonify({
            'skills': skills,
            'success': True
        })
    finally:
        connection.close()

@app.route('/api/skills/<int:skill_id>', methods=['GET'])
@db_error_handler
def get_skill(skill_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM skills WHERE id = %s', (skill_id,))
            skill = cursor.fetchone()
        if skill:
            return jsonify({
                'skill': skill,
                'success': True
            })
        else:
            return jsonify({
                'message': 'Skill not found',
                'success': False
            }), 404
    finally:
        connection.close()

@app.route('/api/skills', methods=['POST'])
@db_error_handler
def create_skill():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description', '')
    proficiency = data.get('proficiency', 'beginner')
    
    if not name:
        return jsonify({
            'message': 'Skill name is required',
            'success': False
        }), 400
    
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'INSERT INTO skills (name, description, proficiency) VALUES (%s, %s, %s)',
                (name, description, proficiency)
            )
        connection.commit()
        return jsonify({
            'message': 'Skill created successfully',
            'success': True,
            'skill_id': cursor.lastrowid
        }), 201
    finally:
        connection.close()

@app.route('/api/skills/<int:skill_id>', methods=['PUT'])
@db_error_handler
def update_skill(skill_id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    proficiency = data.get('proficiency')
    
    if not name:
        return jsonify({
            'message': 'Skill name is required',
            'success': False
        }), 400
    
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'UPDATE skills SET name = %s, description = %s, proficiency = %s WHERE id = %s',
                (name, description, proficiency, skill_id)
            )
        connection.commit()
        if cursor.rowcount > 0:
            return jsonify({
                'message': 'Skill updated successfully',
                'success': True
            })
        else:
            return jsonify({
                'message': 'Skill not found',
                'success': False
            }), 404
    finally:
        connection.close()

@app.route('/api/skills/<int:skill_id>', methods=['DELETE'])
@db_error_handler
def delete_skill(skill_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute('DELETE FROM skills WHERE id = %s', (skill_id,))
        connection.commit()
        if cursor.rowcount > 0:
            return jsonify({
                'message': 'Skill deleted successfully',
                'success': True
            })
        else:
            return jsonify({
                'message': 'Skill not found',
                'success': False
            }), 404
    finally:
        connection.close()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)