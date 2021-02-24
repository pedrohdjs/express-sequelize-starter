module.exports = (sequelize, DataTypes) => {
    //Definition
    const Post = sequelize.define('Post',{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    //Associations
    Post.associate = (models) => {
        Post.belongsTo(models.User,{
            as: "author",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Post;
};
