## URL详解:

​	URL是Uniform Resource Locator的简写，意为统一定位符

​	URL由scheme://host:port/path/?query-string=xxx#anchor这些部分组成，其中：

​	·	scheme: 代表的是访问协议，例如http，https等

​	·	host: 主机名，域名.

​	·	path: 端口号，不写事浏览器默认使用80端口

​	·	query-string:查询字符串

​	·	anchor：锚点，用于前端定位

##### 	反转URL:

​	什么叫反转URL：从视图函数到url的转换叫做反转url
​	反转url的作用：
​	      *在页面重定向的时候，会使用反转url
​          *在模板中，也会使用url反转

## Web：

​	Web服务器:	负责处理http请求，响应静态文件，常见的有Apache，Nginx（请求静态文件时直接返回）

​	应用服务器:	负责处理逻辑的服务器。比如PHP，python的代码是不能直接通过nginx这种Web服务器来处理的，只能通过应用服务器来处理，常见的应用服务器有uwsgi，tomcat等。（发送一个静态资源（css，js）请求时，由应用服务器处理返回）

​	Web应用框架：一般使用某种语言，封装了常用的web功能的框架就是web框架，flask，Django以及Java中的SSH框架都是web应用框架（发送一个逻辑请求时，由Web应用框架处理）



## Debug：

##### 为什么要开启Debug模式：

​	1.开启Debug模式后，可以在浏览器的页面中看到具体的错误信息以及具体的错误代码位置。方便调试。

​	2.开启后，在Python中修改了任何代码，只用按Ctrl + S，flask就会自动的重新加载整个网站

##### 开启Debug模式的方法：

​	1.在app.run()中传递一个参数“debug = True”

​	2.设置"app.config = True"

​	3.通过配置参数的形式来设置Debug模式："app.config.updata(DEBUG = True)"

​	4.通过配置文件的形式来设置Debug模式："app.config.from_object(config)"

​	5.在菜单栏Run中的Edit Configurations中勾选Flask_Debug



## config：

##### 使用“app.config.from_object()”方式加载配置文件：

​	1.导入“import config”，使用“app.config.from_object(config)”

##### 使用“app.config.from_pyfile()”方式加载配置文件：

​	1.使用“app.config.from_pyfile(config.py)”

​	2.不需要导入配置文件，可以使用除py文件以外的文件，例如txt文件，但是得写出文件全名，可以传递“silent=True”，当没有找到这个静态文件时，不会抛出异常。



## URL与视图函数的映射：

##### 传递参数：

传递参数的语法是：’/<参数名>/‘。在视图函数中也要定义相同的函数名

##### 参数的数据类型：

1.如果没有指定的数据类型，那么默认的类型为string类型

2.常见的参数类型还有’int‘,'float'

3.'path'数据类型与’string‘类型相似，都是可以接受任意的字符串，但是’path‘可以接受路径，也就是可以包含斜杠

4.’uuid’数据类型只能接受符合‘uuid’的字符串，‘uuid’是一个全宇宙都唯一的字符串，一般可以用来作为表的主键。

5.‘any’数据类型可以在一个'url'中指定多个路径。例如：

```
@app.route('/< any(blog,article):url_path >/< id >/')
def detail(url_path,id)
​	if url_path == 'blog':
​		return '博客详情：%s' %id
​	else:
​		return '用户详情：%s' %id
```

##### 接受用户传递的参数：

1.第一种：使用path的形式(将参数嵌入到路径中),如上所示

2.第二中：使用查询字符串的方式，就是通过‘?key=value’的形式传递的，例如：

```
@app.route('/d/')
def d():
​	wd = request.args.get('wd')
​	return "您通过查询字符串的方式传递的参数是:	%s"	%wd
```

3.如果页面想要做‘SEO’优化，即被搜索引擎搜索到，建议第一种(path方法)，若不在乎，建议第二种(查询方法)。

## url_for笔记：

##### url_for的基本使用：

​	'url_for'第一个参数，应该是视图函数的名字的字符串，第二个参数就是传递给’url‘的。如果传递的参数之前在’url‘中已经定义了，那么这个参数就会被当成’path‘的形式给’url‘。如果这个参数之前没有在’url‘中定义，那么价格会变成查询字符串的形式放到’url‘中。

##### 为什么需要’url_for'：

​	1.将来如果需要修改‘url’，但没有修改该‘url’对应的函数名，就不用到处去替换‘url’了。

​	2.'url_for'会自动处理那些特殊的字符，不需要手动去处理，提高了代码容错率。

## 自定义URL转换器：

##### 自定义URL转换器的方式：

1.实现一个类，继承自’BaseConverter‘

2.在自定义的类中，重写’regex‘，也就是这个变量的正则表达式

3.将自定义的类，映射到’app.url_map.converters'上，例如:

```
app.url_map.converters['tel'] = TelephoneConverters
```

##### 'to_python'的作用：

​		会将url中的参数经过解析后传递给视图函数。（这个方法的返回值，将会传递到view函数中作为参数。）

##### ‘to_url’的作用：

​		会将‘url_for’反转的url参数放到‘url’中。（这个方法的返回值，将会在调用url_for函数的时候生成符合要求的Url形式。）

## 必会的小细节知识点：

##### 在局域网中让其他电脑访问我的网站：

可以在app.run()中设置host=0.0.0.0

##### 'GET'请求和'POST'请求：

在网络请求中有许多请求方式，例如：GET，POST，DELETE，PUT请求等

(详情：https://www.cnblogs.com/logsharing/p/8448446.html)

1.'GET'请求：只会在服务器上获取资源，不会更改服务器的状态，这种方式推荐使用‘GET‘请求

2.'POST'请求：会给服务器提供一些数据或者文件。一般POST请求是会对服务器的状态产生影响，那么这种推荐	使用POST请求

3.关于参数传递：

​		*‘GET’请求：把参数放到‘url’中，通过‘?xx=xxx'的形式传递，因为会把参数放在url中，所以不太安全。

​		*'POST'请求： 把参数放在'Form Data'中，避免了被偷瞄的风险。但是’POST'请求可以提交一些数据给服务器，比如可以发送一些文件，那么这又增加了很大的风险。所以POST请求，对于有经验的黑客来说，其实更不安全。

4.在‘Flask’中，‘route’方法，默认只能使用‘GET’的方式请求这个‘url’，如果想设置自己的请求方式，就应该传递一	个‘method’参数。

## 重定向笔记：

##### 重定向：

重定向分为永久性重定向和暂时性重定向，在页面上体现的操作就是浏览器会从一个页面自动跳转到另外一个页面。比如用户访问了一个需要权限的页面，但是该用户当前并没有登录，因此我们应该给他重定向到登录页面。

*永久性重定向：http的状态码为‘301‘，多用于旧网址废弃了要转移到一个新的网址确保用户的访问。（京东）

*暂时性重定向：http的状态码为’302‘，表示页面的暂时性跳转，例如登录限制。

##### Flask中的重定向：

’flask‘中通过函数’redirect‘来进行页面重定向，一般搭配url_for来使用

## Response笔记：

##### 视图函数中可以返回哪些值：

1.可以返回字符串：返回的字符串其实底层将这个字符串包装成了一个’Response‘对象。

2.可以返回元组：元组的形式是（响应体，状态码，头部信息），也不一定三个都要写，写两个也是可以的。返回的元组其实在底层也是包装成了一个’Response‘对象

3.可以返回’Response‘及其子类

##### 实现一个自定义的Response对象：

1.继承自’Response‘类

2.实现方法’force_type(cls,rv,environ=None)'.

3.指定'app.response_class为你自定义的Response'对象。

4.如果视图函数返回的数据不是字符串，元组，也不是Response对象，那么就会将返回值传给'force_type'，然后再将'force_type'的返回值返回给前端。

