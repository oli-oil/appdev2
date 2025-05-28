const {
  signInSchema,
  signUpSchema,
} = require("../middlewares/auth-validator.middleware");
const { generateAccessToken } = require("../middlewares/jwt-token.middleware");
const { doHash, doHashValidation } = require("../utils/hashing.util");
const users = [
  {
    id: 1,
    email: "tester@test.com",
    password: "$2b$10$epZ3Vq/slePleoF3KJKGiOi56EMX8FeVTPRpMCNwDEmq.grS3GPzG", // secret123
  },
];

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const { error } = signInSchema.validate({ email, password });

  if (error) {
    return res.status(401).json({
      status: false,
      message: error.details[0].message,
    });
  }

  const userExist = users.find((user) => user.email === email);

  if (userExist) {
    const matchPassword = await doHashValidation(password, userExist.password);

    if (matchPassword) {
      const token = generateAccessToken(userExist.email);
      return res.status(200).json({
        status: true,
        token: token,
        message: "You are logged in",
      });
    }

    res.status(401).json({
      status: false,
      message: "Invalid password",
    });
  }

  res.status(401).json({
    status: false,
    message: "Invalid credentials",
  });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const { error } = signUpSchema.validate({ email, password });

  if (error) {
    return res.status(401).json({
      status: false,
      message: error.details[0].message,
    });
  }

  const emailExist = users.find((user) => user.email === email);

  if (emailExist) {
    return res.status(200).json({
      status: true,
      message: "Email exists",
    });
  }

  const hashedPassword = await doHash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  return res.status(201).json({
    status: true,
    message: "Account has been created!",
  });
};

const getUsers = (req, res) => {
  res.json(users);
};

module.exports = {
  signIn,
  signUp,
  getUsers,
};