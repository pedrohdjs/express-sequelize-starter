module.exports = (sequelize, DataTypes) => {
    //Definition
    const User = sequelize.define('User',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //Associations
    User.associate = (models) => {
        User.hasMany(models.Post, {
            as: "posts", 
            foreignKey: {
                name: "authorId",
                allowNull: "false"
            }
        });
    }

    return User;
};
