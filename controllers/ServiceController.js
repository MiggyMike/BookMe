const { Service, User, Review } = require('../db/schema');

const GetServices = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset =
      page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit));
    const services = await Service.find()
      .limit(parseInt(limit))
      .skip(offset)
      .sort({ popularity_rating: 'desc' });
    res.send(services);
  } catch (error) {
    throw error;
  }
};

const GetServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.service_id).populate([
      {
        model: 'users',
        path: 'user_id',
        select: '_id name',
      },
      {
        path: 'reviews',
        populate: {
          path: 'user_id',
          model: 'users',
          select: '_id name',
        },
      },
    ]);
    res.send(service);
  } catch (error) {
    throw error;
  }
};

const CreateService = async (req, res) => {
  try {
    const newService = new Service({
      ...req.body,
      user_id: req.params.user_id,
    });
    newService.save();
    res.send(newService);
  } catch (error) {
    throw error;
  }
};

const DeleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.service_id);
    await Review.deleteMany({ _id: { $in: service.reviews } });
    await Service.findByIdAndDelete(req.params.service_id);
    res.send({ SERVICE: 'deleted' });
  } catch (error) {
    throw error;
  }
};

const UpdateService = async (req, res) => {
  try {
    await Service.findByIdAndUpdate(
      req.params.service_id,
      {
        ...req.body,
      },
      { new: true, useFindAndModify: false }
    );
    res.send({ SERVICE: 'updated' });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  GetServices,
  GetServiceById,
  CreateService,
  DeleteService,
  UpdateService,
};
