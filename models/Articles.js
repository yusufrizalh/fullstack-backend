module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define("Articles", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articleBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //* association: 1 article can has many comments
  Articles.associate = (model) => {
    Articles.hasMany(model.Comments, {
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };

  return Articles;
};
