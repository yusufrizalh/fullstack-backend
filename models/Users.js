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
    Users.hasMany(model.Articles, {
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };

  return Users;
};
