## sqlalchemy笔记：

##### 使用SQLAlchemy去连接数据库：

​	使用SQLAlchemy去连接数据库需要使用一些配置信息，让后将他们组合成满足条件的字符串，例如：

```python
HostName = '127.0.0.1'
Port = '3306'
Database = 'first_sqlalchemy'
Username = 'root'
Password = '233'
```

​	使用`dialect+driver://username:password@host:port/database`方式连接，例如：

```python
DB_URI = "mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8".format(Username,Password,HostName,Port,Database)
```

​	然后使用`create_engine`来创建一个引擎`engine`，调用该引擎的`connect`方法就可以得到这个对象，这样就可以通过这个对象对数据库进行操作了，例如：

```python
engine = create_engine(DB_URI)
#	判断是否连接成功
conn = engine.connect()
result = conn.execute('select 1')
print(result.fetchone)
```

## ORM笔记：

##### ORM介绍:

​	ORM:	`Object Relationship Mapping(对象模型与数据库表的映射)`

##### 将ORM模型映射到数据库中：

​	1.用`delcarative_base`根据`engine`创建一个ORM基类。

```python
	from sqlalchemy.ext.declarative import declarative_base
	engine = create_engine(DB_URI)
    Base = declarative_base(engine)
```

​	2.用这个`Base`类作为基类来写自己的ORM类。要定义`__tablename__`类属性，来指定这个模型映射到数据库中的表名。例如：

```python
	class Person(Base):
        __tablename__ = 'person'
```

​	3.创建属性来映射到表中的字段，所有需要映射到表中的属性应该都为`Column`(一列)类型，例如：

```python
	class Person(Base):
		__tablename__ = 'Person'
        #	在这个ORM模型中创建一些属性，来跟表中的字段进行一一映射，这些属性必须是sqlalchemy给我们提供好的数据类型
        id = Column(Integer,primaty_key=True,autoincrement=True)
        name = Column(String(50))
        age = Column(Integer)
```

​		4.使用`Base.metadata.create_all()`来将模型映射到数据库中。

​			注：当使用了`Base.metadata.create_all()`后即使改变了模型的字段，也不会重新映射了

## 用session做数据的增删改查操作：

##### 1.构建session对象：

​	所有和数据库的ORM操作都必须通过一个叫做`session`的会话对象来实现，通过以下代码获取会话对象：

```python
	from sqlalchemy.orm import sessionmaker
    
    engine = create_engine(DB_URI)
    session = sessionmaker(engine)
```

##### 2.添加对象：

* 创建对象，也即创建一条数据：

  ```python
  	p = Person(name='龙涌', age=18, country='China')
  ```

* 将这个对象添加到`session`会话对象中：

  ```python
  	session.add(p)
  ```

* 将`session`中的对象做`commit`(提交):

  ```python
  	session.commit()
  ```

* 一次性添加多条数据:

  ```python
  	p1 = Person(name='刘俊', age=18, country='China')
      p2 = Person(name='龙志敏', age=18, country='China')
      session.add_all([p1, p2])
      session.commit()
  ```

##### 3.查找对象：

 ```python
    # 查找某个模型对应的那个表中所有的数据：
    all_person = session.query(Person).all()
    # 使用filter_by来做条件查询
    all_person = session.query(Person).filter_by(name='zhiliao').all()
    # 使用filter来做条件查询
    all_person = session.query(Person).filter(Person.name=='zhiliao').all()
    # 使用get方法查找数据，get方法是根据id来查找的，只会返回一条数据或者None
    person = session.query(Person).get(primary_key)
    # 使用first方法获取结果集中的第一条数据
    person = session.query(Person).first()
    
    # 注：filter与filter_by的区别： 本质区别：他们所接受的参数类型不一样
    #	 filter接受的参数是一个类似于SQL表达式的值
    #    filter_by接受的参数是关键字参数
 ```

##### 4.修改对象：

​	首相从数据库中查找对象，然后将这条数据修改为你想要的数据，最后做commit操作就可修改数据了。

```python
	person = session.query(Person).first()
    person.name = '龙涌帅哥'
    session.commit()
```

##### 5.删除对象：

​	将需要删除的数据从数据库中查找出来，然后使用`sesson.delete`方法将这条数据从`session`删除，最后通过`commit`操作就可以了。

```python
	person = session.query(Person).first()
    session.delete(person)
    session.commit()
```

## Sqlalchemy常用数据类型：

1. Integer：整形，映射到数据库中是int类型。
2. Float：浮点类型，映射到数据库中是float类型。
3. Double：双精度浮点类型，映射到数据库中是double类型。
4. String：可变字符类型，映射到数据库中是varchar类型。
5. Boolean：布尔类型，映射到数据库中是tinyint类型。
6. DECIMAL：定点类型，是专门为了解决浮点类型精度丢失问题的类型，例如（1234.54321）前表示整数位能储存4位数字，小数位能储存5位数字。建议在储存钱相关字段时使用。
7. enum：枚举类型，指定某个字段只能是枚举中指定的几个值，不能为其他值。在ORM模型中，使用Enum来作为枚举，例如：

```python
	class Artical(Base):
        __tablename__ = 'artical'
        id = Column(Integer, primary_key=True, autoincrement=True)
        tag = Column(Enum("python","flask","django"))
```

​		在Python3中，已经内置了enmu这个枚举模块，我们也可以根据这个模块去定义相关的字段。例如：

```python
	class TagEnum(enum.Enum):
        python = 'python'
        flask = 'flask'
        django = 'diango'
        
    class Article(Base):
        __tablename__ = 'artical'
        id = Column(Integer, primary_key=True, autoincrement=True)
        tag = Column(Enum(TagEnum))
        
    artical = Artical(tag=TagEnum.flask)
```

​	8. Date：存储时间，只能存储年月日。映射到数据库中是date类型。在Python代码中，可以使用`datetime.date`来指定，例如：

```python
    class Article(Base):
        __tablename__ = 'artical'
        id = Column(Integer, primary_key=True, autoincrement=True)
        create_time = Column(Date)
        
    artical = Artical(create_time=data(2017,10,10))	
```

9. DateTime：存储时间，可以存储年月日时分秒。映射到数据库中是datetime类型，在Python中可以通过`datetime.datetime`来指定。例如：

```python
    class Article(Base):
        __tablename__ = 'artical'
        id = Column(Integer, primary_key=True, autoincrement=True)
        create_time = Column(DateTime)

    artical = Artical(create_time=datetime(2011,11,11,9,23,12))	
```
10. Time：存储时间，可以存储时分秒。映射到数据库中是time类型，在Python中可以通过`datetime.time`来指定，例如：

```python
    class Article(Base):
        __tablename__ = 'article'
        id = Column(Integer,primary_key=True,autoincrement=True)
        create_time = Column(Time)

    article = Article(create_time=time(hour=11,minute=11,second=11))
```
11. Text：存储长字符串，一般可以存储6W多个字符，如果超过了这个范围，可以使用`LONGTEXT`类型，映射到数据库中就是text类型。
12. LONGTEXT：长文本类型，映射到数据库中是longteext类型。

## Column常用函数：

1. primary_key：设置某个字段为主键。
2. autoincrement：设置这个字段为自动增长。
3. default：设置某个字段的默认值，在发表时间这些字段上面经常用。
4. nullable：指定某个字段的值是否为空。默认值是True，即可为空。
5. unique：指定某个字段的值是否唯一，默认是False。
6. onupdate：在数据更新的时候会调用这个参数指定的值或者参数，在第一次插入这条数据的时候，不会使用onupdate的值，只会使用default的值，常用的就是`update_time`（每次更新数据的时候都要更新的值）。
7. name：指定ORM模型中某个属性映射到表中的字段名，如果不指定，那么会使用这个属性的名字来作为字段名；如果指定了，就会使用指定的这个值作为参数。这个参数也可以当作位置参数，在第一个参数来指定。

```python
	title = Column(String(50), name='title', nullable=False)
    title = Column('my_title', String(50), nullable=False)
```

## query可用参数：

1.模型对象：指定查找这个模型中所有的对象。

2.模型中的属性：可以指定只查找某个模型的其中几个属性。

3.聚合函数：

* `func.count`：统计行的数量。
* `func.avg`：求平均值。
* `func.max/min`：求最大/最小值。
* `func.sum`：求和。

`func`上，其实没有任何聚合函数，但是因为他的底层，只要mysql中有的聚合函数，都可以通过func调用。

## filter过滤条件：

​	过滤数据是数据提取的一个很重要的功能，一下对一些常用的过滤条件进行解释，并且这些过滤条件都是只能通过filter方法实现的。

##### 1.equals：

```python
	articles = session.query(Article).filter(Article.title == 'title0').first()
    print(articles)
```

##### 2.not equals：

```python
	articles = session.query(Article).filter(Article.title != 'title0').first()
    print(articles)
```

##### 3.like & ilike(不分大小写)：

```python
    titles = session.query(Article).filter(Article.title.ilike('title%')).all()
    print(titles)
```

##### 4.in & not in：

```python
	# 用in_的原因：
    # for xxx in xxxx:
    # def _in():
    titles = session.query(Article).filter(Article.title.in_(['title1','title2'])).all()
    print(titles)
    # not in
    titles = session.query(Article).filter(~Article.title.in_(['title1','title2'])).all()
    print(titles)
```

##### 5.is null &is not null：

```python
	# is null
    article = session.query(Article).filter(Article.content==None).all()
    # is not null
    article = session.query(Article).filter(Article.content!=None).all()
```

##### 6.and & or：

```python
	# and
    article = session.query(Article).filter(Article.title=='abc',Article.content=='abc')
    # or
    article = session.query(Article).filter(or_(Article.title=='abc',Article.content=='abc'))
```

​	如果想要查看orm底层转换的sql语句，可以在filter方法后面不要再执行任何方法直接打印就可以看到了。比如：

```python
 	articles = session.query(Article).filter(or_(Article.title=='abc',Article.content=='abc'))
    print(articles)
```
## 外键：

```python
	# 主键：主关键字(primary key)是表中的一个或多个字段，它的值用于唯一的标识表中的某一条记录。在两个表的关系中，主关键字用来在一个表中引用来自于另一个表中的特定记录。主关键字是一种唯一关键字，表定义的一部分。一个表的主键可以由多个关键字共同组成，并且主关键字的列不能包含空值。
	# 外键：如果公共关键字在一个关系中是主关键字，那么这个公共关键字被称为另一个关系的外关键字。由此可见，外关键字表示了两个关系之间的联系。以另一个关系的外关键字作主关键字的表被称为主表，具有此外关键字的表被称为主表的从表。外关键字又称作外键。
```

##### 外键创建：

使用SQLalchemy创建外键非常简单，在表中增加一个字段，指定这个字段外键是哪个表的哪个字段就可以了。从表中外键的字段，必须和父表的主键字段类型保持一致。例如：

```python
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer,primary_key=True,autoincrement=True)
    username = Column(String(50),nullable=False)

class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String(50),nullable=False)
    content = Column(Text,nullable=False)

    uid = Column(Integer,ForeignKey("user.id"))
```

##### 外键约束条件：

1. RESTRICT：父表数据被删除，会阻止删除。默认就是这一项。
2. NO ACTION：在MySQL中，同RESTRICT相同作用。
3. CASCADE：级联删除。
4. SET NULL：父表数据被删除，子表数据会设置为NULL；

## ORM关系：

##### 一对多关系：

```python
#	一对多关系：一对多关系是关系数据库中两个表之间的一种关系，该关系中第一个表中的单个行可以与第二个表中的一个或多个行相关，但第二个表中的一个行只可以与第一个表中的一个行相关。
#	注：一对多不是一个表中的一个列对应另一个表中的多个列，列是不能够一对多的！这里的一对多是是指行的对应！
```

MySQL级别的外键，还不够(ORM)方便，必须拿到一个表的外键，然后再通过这个外键再去另一张表中查找，太过麻烦。SQLalchemy提供了`relationship`，这个类可以定义属性，以后在访问相关联的表的时候就可以直接通过属性访问的方式获得了，例如：

```python
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer,primary_key=True,autoincrement=True)
    username = Column(String(50),nullable=False)

    # articles = relationship("Article")

    def __repr__(self):
        return "<User(username:%s)>" % self.username

class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String(50),nullable=False)
    content = Column(Text,nullable=False)
    uid = Column(Integer,ForeignKey("user.id"))
    

    author = relationship("User",backref="articles")
```

​	注：可以通过`backref`来指定反向访问的属性名称，articles是有多个，它们之间的关系是一个一对多的关系。

##### 多对多关系：

1. 多对多的关系需要通过一张中间表来绑定它们之间的关系。
2. 先把两个需要做多对多的模型定义出来。
3. 使用`Table`定义一个中间表，中间表一般就是包含两个模型的外键字段就可以了，并且让他们两个来作为一个"复合主键"。
4. 在两个需要做多对多关系的模型中随便选择一个模型，定义一个`relationship`属性，来绑定三者之间的关系，在使用`relationship`的时候，需要传入一个secondary中间表。

```python
from sqlalchemy import Table
class Tag(Base):
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)

    # articles = relationship("Article", backref="tags", secondary=article_tag)


article_tag = Table(
    "article_tag",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("article.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tag.id"), primary_key=True)
)


class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(50), nullable=False)

    tags = relationship("Tag", backref="articles", secondary=article_tag)
```

##### ORM层面的删除数据：

​	ORM层面删除数据，会无视Mysql级别的外键约束，会直接将对应的数据删除，然后将表中的那个外键设置为NULL。可在从表中设置`nullable=False`来避免这种情况。

##### relationship方法中的cascade参数：

在SQLAlchemy，只要将一个数据添加到session中，和他相关联的数据都可以一起存入到数据库中了。这些是怎么设置的呢？其实是通过relationship的时候，有一个关键字参数cascade可以设置这些属性： 
1. save-update：默认选项。在添加一条数据的时候，会把其他和他相关联的数据都添加到数据库中。这种行为就是save-update属性影响的。 
2. delete：表示当删除某一个模型中的数据的时候，是否也删掉使用relationship和他关联的数据。
3. delete-orphan：表示当对一个ORM对象解除了父表中的关联对象的时候，自己便会被删除掉。当然如果父表中的数据被删除，自己也会被删除。这个选项只能用在一对多上，不能用在多对多以及多对一上。并且还需要在子模型中的relationship中，增加一个single_parent=True的参数。 
4. merge：默认选项。当在使用session.merge，合并一个对象的时候，会将使用了relationship相关联的对象也进行merge操作。 
5. expunge：移除操作的时候，会将相关联的对象也进行移除。这个操作只是从session中移除，并不会真正的从数据库中删除。 
6. all：是对save-update, merge, refresh-expire, expunge, delete几种的缩写。

##### 排序：

​		1.order_by：可以指定根据这个表中的某个字段进行排序，如果在前面加了一个负号（-）表示是降序排列。

​		2.在模型定义的时候指定默认排序：有些时候，不想每次在查询的时候都指定排序的方式，可以在定义模型的时候就指定排序的方式。例如：

​			*	relationship的order_by参数：在指定relationship对的时候传递order_by参数来指定排序的字段。

​			*	在模型定义中，添加一下代码：	

```python
__mapper_args__ = {
    "order_by" :title
}
```

即可让文章使用标题来进行排序。

​		3.正序排序与倒序排序：默认是是使用正序排序，如果需要使用倒序排序，那么可以使用这个字段的`desc()`方法，或者是在排序的时候在这个字段的字符串名字前面价负号（-）。

## limit、offset和slice切片操作：

1. limit：可以限制每次查询的时候只查询几条数据。

2. offset：可以限制查找数据的时候过滤掉前面多少条。

3. 切片：可以对Query对象使用切片操作，来获取想要的数据，可以使用`slice(start,stop)`方法来做切片操作。也可以使用`[start:stop]`的方式来进行切片操作。一般在实际开发中，中括号的形式是用得比较多的。例如：

   ```python
   article = session.query(Article).order_by(Article.id.desc())[0:10]
   ```

## 懒加载：

​	在一对多，或者多对多的时候，如果想要获取多的这一部分的数据的时候，往往能通过一个属性就可以全部获取了。比如有一个作者，想要获取这个作者的所有文章，那么可以通过`user.article`就可以获取所有的数据。假如只想获取这个作者今天发表的文章，那么可以给`relationship`传递一个`lazy='dynamic'`，以后通过`user.article`获取到的就不是一个列表，而是一个AppenderQuery对象了。这样就可以对这个对象再进行一层过滤和排序等操作。

​	通过`lazy='dynamic'`，获取出来的多的那一部分的数据，就是一个`AppenderQuery`对象了。这种对象及可以添加新数据，也可以跟`Query`一样，再进行一层过滤。

​	总而言之：如果在获取数据的时候，想要对多的那一边的数据再进行一层过滤时就可以考虑使用`lazy='dynamic'`。

##### `lazy`的可用选项：

1. `select`：默认选项，用`user.article`举例。如果你没有访问`user.article`这个属性，那么sqlalchemy就不会从数据库中查找文章，一旦你访问了这个属性，那么sqlalchemy就会立马从数据库中查找所有的文章，并把查找出来的数据组装成一个列表返回，这也是懒加载。
2. `dynamic`：同为懒加载，但是在访问`user.articles`的时候返回来的不是一个列表，而是`AppenderQuery`对象。

## `group_by`、`having`和`join`：

##### group_by:

​	根据某个字段进行分组。比如想要根据年龄进行分组，来统计每个分组分别有多少人，那么可以使用一下代码来完成：

```python
session.query(User.age,func.count(User.id)).group_by(User.age).all()
```

##### having : 

​	having是对查找结果进一步过滤，比如只要想看未成年人的数量，那么可以首先对年龄进行分组统计人数，然后再对分组进行having过滤，例如：

```python
session.query(User.age,func.count(User.id)).group_by(User.age).having(age<18).all()
```

##### join：

1. join分为left（左外连接）和right join（右外连接）以及内连接（等值连接）。

2. 在sqlalchemy中，使用join来完成内连接，在写join的时候，如果不写join的条件，那么默认将使用外键来作为条件链接。

3. query查找出来的数据，不会取决于join后面的东西，而是取决于query方法中传了什么参数，就跟原生sql中的select后面那一个一样。比如，现在要实现一个功能，要查找所有用户并按照发表文章的数量来进行排序，示例代码如下：

   ```python
   result = session.query(User,func.count(Article.id)).join(Article).group_by(User.id).order_by(func.count(Article.id).desc()).all()
   ```


## `Subquery`子查询：

​	子查询可以让多个查询变成一个查询，只用查找一次数据库，性能相对来说更加高效一点。，不需要写多个sql语句就可以实现一些复杂的查询。实现子查询步骤：

1. 将子查询按照传统的方式写好查询代码，然后在`query`对象后面执行`subquery`方法，将此查询方法变为一个子查询。

2. 在子查询中，将以后需要用到的字段通过`label`方法，取个别名。

3. 在夫查询中，如果想要使用子查询的字段，那么可以通过子查询的返回值上的`c`属性拿到。

   示例：

```python
stmt = session.query(User.city.label("city"),User.age.label("age")).filter(User.username == "张三").subquery()
result = session.query(User).filter(User.city==stmt.c.city,User.age==stmt.c.age).all()
```

## `flask_sqlalchemy`笔记：

##### 数据库连接：

1. 与`sqlalchemy`相同，首先定义好数据库连接字符串DB_URI。

2. 将定义好的数据库连接字符串DB_URI，通过`SQLALCHEMY_DATABASE_URI`这个键放到`app.config`中。例如：

   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
   ```

3. 使用`flask_sqlalchemy.SQLAlchemy`这个类定义一个对象，并将`app`传入进去，例如：

   ```python
   db = SQLAlchemy(app)
   ```

##### 创建ORM模型：

1. 定义模型同`sqlalchemy`一样，当时不在使用`delarative_base`来创建一个基类，而是使用`db.Model`来作为基类。

2. 在模型类中，使用`Column`、`String`、`Integer`以及`relationship`等都无需导入了，可以直接使用`db`下面相应的属性名。

3. 在定义模型的时候，不写`__tablename__`时，`flask_sqlalchemy`会默认使用当前模型名字的小写来作为表的名字；并且当这个模型的名字使用了多个单词且使用了驼峰命名法时，那么默认会在多个单词之间是用下划线来连接。例如：

   ```python
   # UserModel --> user_model
   # 注：虽然flask_sqlalchemy为我们提供了这个特性，但是不推荐使用。（明言胜于暗喻）
   ```

##### 使用`session`：

1. `db.drop_all()`
2. `db.create_all()`

##### 查询数据：

​	如果查找数据只是查找一个模型上的数据，那么可以通过`模型.query`的方式进行查找。`query`方法与`sqlalchemy`中相同。例如：

```python
# 注：db.session.query --> User.query
users = User.query.order_by(User.id.desc()).all()
print(users)
```

## alembic笔记：

##### 使用`alembic`的步骤：

1. 定义好自己的模型。

2. 使用alembic创建一个仓库：`alembic init [仓库的名字，推荐使用alembic]`。

3. 修改配置文件：

   * 在`alembic.ini`中，给`sqlalchemy.url`设置数据库连接方式，这个连接方式跟`sqlalchemy`的方式一样。

   * 在`alembic/env.py`中的`target_metadata`设置模型的`Base.metadata`，需要导入`models`且需要将`models`所在的路径添加到这个文件中，例如：

     ```python
     import sys,os
     sys.path.append(os.path.dirname(os.path.dirname(__file__)))
     ```

4. 将ORM模型生成迁移脚本：`alembic revision --autogenerate -m 'message'`。

5. 将生成的脚本映射到数据库中：`alembic upgrade head`。

6. 若是修改了模型，重复4、5步骤。

7. 注：在终端中，若想要使用`alembic`，则需要先进入安装了`alembic`的虚拟环境中。

##### 常用命令：

1. init：创建一个alembic仓库。
2. `revision`：创建一个新的版本文件。
3. `--autogenerate`：自动将当前模型修改，生成迁移脚本。
4. `-m`：本次迁移做了哪些修改，用户可以指定这个参数，方便回顾。
5. `upgrade`：将指定版本的迁移文件映射到数据库中，会执行版本文件中的`upgrade`函数。如果有多个迁移版本没有被映射到数据库中，那么会执行多个迁移脚本。
6. `[head]`：代表最新的迁移脚本的版本号。
7. `downgrade`：会执行指定版本的迁移文件中的`downgrade`函数。
8. `heads`：展示`head`指向的脚本文件版本号。
9. `history`列出所有的迁移版本及其信息。
10. `current`：展示当前数据库中的版本号。

##### 经典错误：

1. `FAILED: Target database is not up to date.`
   * 原因：主要是`heads`和`current`不相同，`current`落后于`heads`的版本。
   * 解决办法：将`current`移动到`head`上。`alembic upgrade head`
2. `FAILED: Can't locate revision identified by '6b24fqw2d'`
   * 原因：数据库中存入的版本号不在迁移脚本文件中
   * 解决办法：删除数据库中的`alembic_version`表中的数据，重新执行`alembic upgrade head`。
3. 执行`upgrade head`时报某个表已经存在的错误：
   * 原因：执行这个命令的时候，会执行所有的迁移脚本，因为数据库中已经存在了这个表，然后迁移版本中又包含了创建表的代码。
   * 解决方法：（1） 删除`versions`中所有的迁移文件。（2）修改迁移脚本中创建表的代码。

## Flask-script笔记：

Flask-script的作用是实现通过命令行的形式来操作flask。例如通过跑一个开发版本的服务器、设置数据库、定时任务等，要使用Flask-script，可以通过`pip install flask-script`来安装。

##### 命令的添加方式：

1. 使用`manage.commad`：此方法用来添加不需要传递参数的命令。示例：

   ```python
   manager = Manager(app)
   manager.add_command("db",db_manager)
   
   @manager.command
   def greet():
       print("你好！")
   ```

2. 使用`manage.option`：此方法用来添加需要传递参数的命令。有几个参数就需要写几个 `option`，示例：

   ```python
   @manager.option("-u","--username",dest="username")
   @manager.option("-e","--email",dest="email")
   def add_user(username,email):
       user = User(username=username,age=age)
       db.session.add(user)
       db.session.commit()
       
   # manager.option("-简写","--全称",dest="函数中的参数名")
   ```

3. 若有一些命令是针对某个功能的，比如有一堆命令是针对ORM与表的映射的，那么可以将这些命令单独放在一个文件夹中方便管理。此方法同样使用`Manager`的对象来添加，然后到主`manager`文件中，通过`manager.add_comand`来添加。示例：

   ```python
   # db.script.py
   from flask_script import Manager
   
   db_manager = Manager()
   @db_manager.command
   def init():
       print("迁移仓库创建完毕！")
       
   @db_manager.command
   def revision():
       print("迁移脚本生成完毕！")
       
   @db_manager.command
   def upgrade():
       print("脚本映射到数据库成功！")
       
   # manager.py
   from db_script import db_manager
   
   manager = Manager(app)
   manager.add_command("db",db_manager)
   ```

   ## Flask-Migrate笔记：
   
   ##### 1. 在`manage.py`中的代码：
   
   ```python
   from flask_script import Manager
   from zhiliao import app
   from exts import db
   from flask_migrate import Migrate,MigrateCommand
   # 需要将模型中的表导入manage.py文件中，不然会出错
   from models import User
   
   manager = Manager()
   #	绑定app和db到flask_migrate
   Migrate(app,db)
   #	添加Migrate的所有子命令到db下
   manager.add_command("db",MigrateCommand)
   
   if __name__ == '__main__':
       manager.run()
   ```
   
   ##### 2.flask_migrate的常用命令：
   
   1. 初始化一个环境（创建一个迁移仓库）：`python manage.py db init`
   2. 自动检测模型，生成迁移脚本文件：`python manage.py db migrate`
   3. 将迁移脚本映射到数据库中：`python manage.py db upgrade`
   4. 更多命令：`python manage.py db --help`































