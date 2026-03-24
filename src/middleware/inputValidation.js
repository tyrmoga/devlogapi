import Joi from "joi";

// Validation schema for user registration
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(150).required(),
  password: Joi.string().min(6).max(255).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(150).required(),
  password: Joi.string().min(6).max(255).required(),
});

// Middleware for validating request bodies against a Joi schema
export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//middleware to ensure patch does not pass empty body or fields that are not allowed to be updated
export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email().max(150),
}).min(1);

export const validateUpdate = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};