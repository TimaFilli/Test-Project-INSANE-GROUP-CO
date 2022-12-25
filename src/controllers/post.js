const GET_POSTS = async (req, res, next) => {
  try {
    const page = req.query.page;

    if (!page) {
      const posts = await req.models.Post.findAll();
      const users = await req.models.User.findAll();

      for (let post of posts)
        for (let user of users)
          if (post.author == user.userId) post.author = user;

      return res.status(200).send(posts);
    }

    const limit = process.env.PAGINATION_LIMIT;
    const offset = 0 + (page - 1) * limit;

    const posts = await req.models.Post.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    return res.status(200).send(posts.rows);
  } catch (error) {
    next(error);
  }
};

const POST_POST = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const record = await req.models.Post.create(
      {
        title,
        content,
        author: req.userId,
      },
      {
        returning: true,
      }
    );

    return res.status(200).json({
      status: 200,
      message: "The post successfully added!",
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

const GET_POST = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await req.models.Post.findOne({
      where: {
        postId,
      },
    });

    if (!post) {
      throw new NotFoundError("there is no such post!");
    }

    post.author = await req.models.User.findOne({
      where: {
        userId: post.author,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const DELETE_POST = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await req.models.Post.findOne({
      where: { postId },
    });

    if (!post) {
      throw new NotFoundError("there is no such post!");
    }

    await req.models.Post.destroy({ where: { postId } });

    return res.status(200).json({
      status: 200,
      message: "The post deleted!",
      body: post,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  POST_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
};
