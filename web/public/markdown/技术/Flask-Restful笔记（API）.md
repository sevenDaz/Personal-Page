## 基本使用：

1. 从`flask_restful`中导入`API`，来创建一个`api`对象。
2. 写一个继承自`Resource`的视图函数，在这个视图函数中可以使用你想要的请求方法来定义相应的方法
3. 使用`api.add_resource`来添加视图与`url`，示例：

```python
class LoginView(Resource):
    def post(self,username=None):
        return {"username":"zhangsan"}
    
api.add_resource(LoginView,'/login/',endpoint="login")
```

注意事项：

* 如果要返回`json`数据，那么就使用`flask_restful`，如果想渲染模板，那么还是采用`app.route`的方法。
* `url`与之前一样同样可以传递参数并且可以指定多个`url`。
* `endpoint`是用来给`url_for`反转`url`的时候指定的，若不写，则会使用视图函数的小写来作为`endpoint`

## 参数验证：
Flask-Restful插件提供了类似`WTForms`来验证提交的数据是否合法的包，叫做`reqparse`。以下是基本用法：

    ```python
    parser = reqparse.RequestParser()
    parser.add_argument('username',type=str,help='请输入用户名')
    args = parser.parse_args()
    ```

`add_argument`可以指定这个字段的名字，这个字段的数据类型等。以下将对这个方法的一些参数做详细讲解： 

1. `default`：默认值，如果这个参数没有值，那么将使用这个参数指定的值。 
2. `required`：是否必须。默认为False，如果设置为True，那么这个参数就必须提交上来。 
3. type：这个参数的数据类型，如果指定，那么将使用指定的数据类型来强制转换提交上来的值。 
4. `choices`：选项。提交上来的值只有满足这个选项中的值才符合验证通过，否则验证不通过。 
5. `help`：错误信息。如果验证失败后，将会使用这个参数指定的值作为错误信息。 
6. `trim`：是否要去掉前后的空格。

其中的type，可以使用python自带的一些数据类型，也可以使用`flask_restful.inputs`下的一些特定的数据类型来强制转换。比如一些常用的： 
1. `url`：会判断这个参数的值是否是一个`url`，如果不是，那么就会抛出异常。 
2. `regex`：正则表达式。 
3. `date`：将这个字符串转换为`datetime.date`数据类型。如果转换不成功，则会抛出一个异常。

## Flask-restful笔记2：

​	对于一个视图函数，你可以指定好一些字段用于返回。以后可以使用`ORM`模型或者自定义的模型的时候，他会自动的获取模型中的相应的字段，生成`json`数据，然后再返回给客户端。这其中需要导入`flask_restful.marshal_with`装饰器。并且需要写一个字典，来指示需要返回的字段，以及该字段的数据类型。示例代码如下：
```python
class ProfileView(Resource):
    resource_fields = {
        'username': fields.String,
        'age': fields.Integer,
        'school': fields.String
    }

    @marshal_with(resource_fields)
    def get(self,user_id):
        user = User.query.get(user_id)
        return user
```
在get方法中，返回user的时候，flask_restful会自动的读取user模型上的`username`以及age还有school属性。组装成一个`json`格式的字符串返回给客户端。

#### 重命名属性：

很多时候你面向公众的字段名称是不同于内部的属性名。使用 attribute可以配置这种映射。比如现在想要返回`user.school`中的值，但是在返回给外面的时候，想以education返回回去，那么可以这样写：
```python
resource_fields = {
    'education': fields.String(attribute='school')
}
```

#### 默认值：
在返回一些字段的时候，有时候可能没有值，那么这时候可以在指定fields的时候给定一个默认值，示例代码如下：
```python
resource_fields = {
    'age': fields.Integer(default=18)
}
```

#### 复杂结构：
有时候想要在返回的数据格式中，形成比较复杂的结构。那么可以使用一些特殊的字段来实现。比如要在一个字段中放置一个列表，那么可以使用`fields.List`，比如在一个字段下面又是一个字典，那么可以使用`fields.Nested`。
```python
class ArticleView(Resource):

    resource_fields = {
        'aritlce_title':fields.String(attribute='title'),
        'content':fields.String,
        'author': fields.Nested({
            'username': fields.String,
            'email': fields.String
        }),
        'tags': fields.List(fields.Nested({
            'id': fields.Integer,
            'name': fields.String
        })),
        'read_count': fields.Integer(default=80)
    }

    @marshal_with(resource_fields)
    def get(self,article_id):
        article = Article.query.get(article_id)
        return article
```

## Flask-restful注意事项：
1. 在蓝图中，如果使用`flask-restful`，那么在创建`Api`对象的时候，就不要再使用`app`了，而是使用蓝图。
2. 如果在`flask-restful`的视图中想要返回`html`代码，或者是模版，那么就应该使用`api.representation`这个装饰器来定义一个函数，在这个函数中，应该对`html`代码进行一个封装，再返回。示例代码如下：
```python
@api.representation('text/html')
def output_html(data,code,headers):
    print(data)
    # 在representation装饰的函数中，必须返回一个Response对象
    resp = make_response(data)
    return resp

class ListView(Resource):
    def get(self):
        return render_template('index.html')
api.add_resource(ListView,'/list/',endpoint='list')
```































