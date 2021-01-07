const { User, Service } = require('../db/schema');
const jwt = require('jsonwebtoken');
const {
  checkPassword,
  generatePassword,
} = require('../middleware/PasswordHandler');

const Register = async (req, res) => {
  try {
    const body = req.body;
    const password_digest = await generatePassword(body.password);
    const user = new User({
      name: body.name,
      phone: body.phone,
      email: body.email,
      password_digest,
    });
    user.save();
    res.send(user);
  } catch (error) {
    throw error;
  }
};

const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (
      user &&
      (await checkPassword(req.body.password, user.password_digest))
    ) {
      const payload = {
        _id: user._id,
        name: user.name,
      };
      res.locals.payload = payload;
      return next();
    }
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (error) {
    throw error;
  }
};

const GetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select('_id name');
    console.log(req.body);
    const services = await Service.find({ user_id: req.params.user_id });
    res.send({ user, services });
  } catch (error) {
    throw error;
  }
};

const UpdateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.user_id,
      {
        ...req.body,
      },
      { new: true, useFindAndModify: false }
    );
    res.send(req.body);
  } catch (error) {
    throw error;
  }
};

const RefreshSession = (req, res) => {
  try {
    const token = res.locals.token;
    res.send({ user: jwt.decode(token), token: res.locals.token });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  GetProfile,
  Register,
  Login,
  UpdateUser,
  RefreshSession,
};
