module.exports = (sequelize) => {
    const { User, Action } = sequelize.models;
    
    User.hasMany(Action);
    Action.belongsTo(User);    
}