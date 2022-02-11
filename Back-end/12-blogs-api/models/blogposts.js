const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { timestamps: false },
  );

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
    blogPosts.belongsToMany(models.Categories,
      { as: 'categories', through: models.PostsCategories, foreignKey: 'postId' });
  };

  return blogPosts;
};

module.exports = BlogPosts;
