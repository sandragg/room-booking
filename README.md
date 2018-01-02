# shri-2018

## Задание "Комплексное"

Проблемы, возникшие при запуске приложения:
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/index.js#L14>
    
    Допущена ошибка в названии пути. Верный вариант:
    ```js
    app.use("/graphql", graphqlRoutes);
    ```
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/models/index.js#L7>
    
    Допущена ошибка в списке передаваемых параметров. В данном случае, согласно документации Sequelize,
    список параметров должен выглядеть следующим образом: 
    ```js
    const sequelize = new Sequelize('database', 'username', 'password', {});
    ```
    
Проблемы, возникшие при выполнении запросов через graphql:
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/graphql/resolvers/index.js#L14>
    
    Методы `users()` и `room()` **должны** возвращать соответствующие данные, полученные из event. В противном случае,
    при запросе на получение данных о каком-либо событии, поля `users` и `room` будут равны `null`.
    ```js
    Event: {
        users(event) {
            return event.getUsers();
        },
        room(event) {
            return event.getRoom();
        }
    }
    ```
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/graphql/resolvers/query.js#L8>
    
    Метод `findAll()` первым параметром принимает объект со свойствами, которые описывают область поиска.
    Следовательно, первым параметров передается объект `args`.
    ```js
    {
    //  ...
        events(root, args, context) {
            return models.Event.findAll(args, context);
        },
        users(root, args, context) {
            return models.User.findAll(args, context);
        }
    //  ...
    }
    ```
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/graphql/resolvers/query.js#L20>
    
    Метод `findAll()` первым параметром принимает объект со свойствами, которые описывают область поиска.
    Так как одним из свойств должен быть `offset: 1`, то в качестве первого параметра передается новый объект,
    который содержит все свойства из объекта `args` плюс свойство `offset: 1`
    ```js
    {
    //  ...
        rooms(root, args, context) {
            return models.Room.findAll(Object.assign(args, { offset: 1 }), context);
        }
    //  ...
    }
    ```
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/graphql/resolvers/mutation.js>
    
    Отсутствует реализация запроса `addUserToEvent()`. Вторым параметром передается объект с обязательными свойствами
    `id` и `userId`, согласно схеме `typeDefs.js`.
    ```js
    addUserToEvent(root, { id, userId }, context) {
        let event;

        return models.Event.findById(id)
            .then(res => {
                event = res;

                return event.addUser(userId);
            })
            .then(() => event);
    }
    ```
*   <https://github.com/yandex-shri-msk-2018/entrance-task-1/blob/master/graphql/resolvers/mutation.js#L39>

    create event
    