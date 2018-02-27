const {models} = require("../../models");

module.exports = {
    // User
    createUser(root, {input}, context) {
        return models.User.create(input);
    },

    updateUser(root, {id, input}, context) {
        return models.User.findById(id)
            .then(user => user.update(input));
    },

    removeUser(root, {id}, context) {
        return models.User.findById(id)
            .then(user => user.destroy());
    },
    // Room
    createRoom(root, {input}, context) {
        return models.Room.create(input);
    },

    updateRoom(root, {id, input}, context) {
        return models.Room.findById(id)
            .then(room => room.update(input));
    },

    removeRoom(root, {id}, context) {
        return models.Room.findById(id)
            .then(room => room.destroy());
    },
    // Event
    createEvent(root, {input, usersIds, roomId}, context) {
        let event;

        return models.Event.create(input)
            .then(res => {
                event = res;

                return Promise.all([
                    event.setRoom(roomId),
                    event.setUsers(usersIds)
                ]);
            })
            .then(() => event);

        // return models.Event.create(input)
        //     .then(event => {
        //         event.setRoom(roomId);
        //         event.setUsers(usersIds);
        //         return event;
        //     });

        // let id;
        //
        // return models.Event.create(input)
        //     .then(event => {
        //         id = event.dataValues.id;
        //
        //         return Promise.all([
        //             event.setRoom(roomId),
        //             event.setUsers(usersIds)
        //         ]);
        //     })
        //     .then(() => models.Event.findById(id))
    },

    updateEvent(root, {id, input, roomId, usersIds}, context) {
        let event;

        return models.Event.findById(id)
            .then(res => {
                event = res;

                return Promise.all([
                    event.update(input),
                    event.setRoom(roomId),
                    event.setUsers(usersIds)
                ]);
            })
            .then(() => event)
            .catch(err => console.error(err))
    },

    removeUserFromEvent(root, {id, userId}, context) {
        // let event;
        //
        // return models.Event.findById(id)
        //     .then(res => {
        //         event = res;
        //
        //         return event.removeUser(userId);
        //     })
        //     .then(() => event);
        return models.Event.findById(id)
            .then(event => {
                event.removeUser(userId);
                return event;
            });
    },

    addUserToEvent(root, {id, userId}, context) {
        let event;

        return models.Event.findById(id)
            .then(res => {
                event = res;

                return event.addUser(userId);
            })
            .then(() => event);
    },

    changeEventRoom(root, {id, roomId}, context) {
        return models.Event.findById(id)
            .then(event => event.setRoom(roomId));
    },

    removeEvent(root, {id}, context) {
        return models.Event.findById(id)
            .then(event => event.destroy());
    }
};
