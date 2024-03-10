const { faker } = require("@faker-js/faker");

function createRandomNews() {
  return {
    id: faker.string.uuid(),
    newsAuthor: faker.internet.userName(),
    newsAuthorFullName: faker.person.fullName(),
    createdDate: faker.date.past(),
    amountOfViews: faker.number.int({ min: 70, max: 1000 }),
    newsContent: faker.lorem.sentences(),
  };
}

const NEWS = faker.helpers.uniqueArray(createRandomNews, 30);

module.exports = [
  {
    id: "get-news", // route id
    url: "/api/news", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: NEWS, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-news-details", // route id
    url: "/api/news/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "onenews", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const newsId = req.params.id;
            const oneNew = NEWS.find(
              (newsData) => newsData.id === Number(newsId)
            );
            if (oneNew) {
              res.status(200);
              res.send(oneNew);
            } else {
              res.status(404);
              res.send({
                message: "News not found",
              });
            }
          },
        },
      },
    ],
  },
];
