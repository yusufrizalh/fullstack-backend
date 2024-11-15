module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (model) => {
    //* association 1 user can gives many likes
    Users.hasMany(model.Likes, {
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    //* association 1 user can has many articles
    Users.hasMany(model.Articles, {
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };

  return Users;
};
