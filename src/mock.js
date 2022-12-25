import sha256 from "sha256";
export default async ({ sequelize }) => {
  const user = await sequelize.models.User.findOne();
  if (!user)
    await sequelize.models.User.bulkCreate([
      {
        username: "John",
        password: sha256("secret"),
        email: "john@gmail.com",
      },
      {
        username: "Tom",
        password: sha256("secret"),
        email: "tom@gmail.com",
      },
      {
        username: "Nick",
        password: sha256("secret"),
        email: "nick@gmail.com",
      },
      {
        username: "Julia",
        password: sha256("secret"),
        email: "julia@gmail.com",
      },
    ]);

  const post = await sequelize.models.Post.findOne();
  if (!post)
    await sequelize.models.Post.bulkCreate([
      {
        title: "John",
        content: sha256("secret"),
        author: 1,
      },
      {
        title: "Tom",
        content: sha256("secret"),
        author: 4,
      },
      {
        title: "Nick",
        content: sha256("secret"),
        author: 1,
      },
      {
        title: "Julia",
        content: sha256("secret"),
        author: 2,
      },
    ]);
};
