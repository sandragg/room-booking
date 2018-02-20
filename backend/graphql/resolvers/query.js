const {models} = require("../../models");
const sequelize = require("sequelize");
const {where, fn, col} = sequelize;

module.exports = {
    event(root, {id}) {
        return models.Event.findById(id);
    },
    events(root, args, context) {
        return models.Event.findAll(args, context);
    },
    eventsByDate(root, args, context) {
        return models.Event.findAll({
            where: where(
                fn('date', col('dateStart')),
                fn('date', args.date)
            )
        }, context);
    },
    user(root, {id}) {
        return models.User.findById(id);
    },
    users(root, args, context) {
        return models.User.findAll(args, context);
    },
    room(root, {id}) {
        return models.Room.findById(id);
    },
    rooms(root, args, context) {
        return models.Room.findAll(args, context);
    }
};
