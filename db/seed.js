const faker = require('faker');
const connection = require('./connection');
const { Types } = require('mongoose');
const { User, Service, Review } = require('./schema');

const users = new Array(5).fill().map(() => ({
  _id: Types.ObjectId(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  password_digest: faker.random.word(),
}));
const reviews = new Array(5).fill().map(() => ({
  _id: Types.ObjectId(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  rating: faker.random.number(),
  comment: faker.lorem.sentences(),
  user_id: users[Math.floor(Math.random() * users.length)]._id,
}));
const services = new Array(5).fill().map(() => ({
  _id: Types.ObjectId(),
  service: faker.random.words(),
  description: faker.lorem.paragraph(),
  image_url: faker.random.image(),
  duration: faker.random.number(),
  price: faker.random.image(),
  rating: faker.random.number(),
  numReviews: faker.address.city(),
  reviews: reviews
    .slice(
      Math.floor(Math.random() * reviews.length),
      Math.floor(Math.random() * reviews.length)
    )
    .map((c) => c._id),
  user_id: users[Math.floor(Math.random() * users.length)]._id,
}));

const seed = async () => {
  await connection.connect;
  await User.insertMany(users);
  await Service.insertMany(services);
  await Review.insertMany(reviews);
  await Booked.insertMany(books);
  await connection.disconnect;
  process.exit();
};

seed();
