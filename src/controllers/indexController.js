const indexController = req => {
  let data = {
    name: "Abdulrahman Yusuf",
    github: "@devYusuf",
    email: "abdulrahmanyusuf125@gmail.com",
    mobile: "08135491935",
    twitter: "@bytedeveloper_"
  };

  return {
    message: "My Rule-Validation API.",
    data
  };
};

module.exports = indexController;
