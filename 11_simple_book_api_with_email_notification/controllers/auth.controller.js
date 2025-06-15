const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signupValidation, signinValidation } = require('../validation/auth.validation');

exports.signup = async (req, res) => {
    try {
        // Validate request body
        const { error } = signupValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, email, password } = req.body;        // Check if username is taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Username is already taken',
                field: 'username'
            });
        }

        // Check if email is taken
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Email is already registered',
                field: 'email'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        res.status(201).json({ 
            message: 'User created successfully',
            userId: savedUser._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        // Validate request body
        const { error } = signinValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                status: 'error',
                message: error.details[0].message,
                field: error.details[0].path[0]
            });
        }

        const { username, email, password } = req.body;

        if (!username && !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide either username or email',
                field: 'credentials'
            });
        }

        // Find user by username or email
        const user = await User.findOne(
            username ? { username } : { email }
        );

        if (!user) {
            return res.status(401).json({ 
                status: 'error',
                message: username 
                    ? 'No user found with this username' 
                    : 'No user found with this email',
                field: username ? 'username' : 'email'
            });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid password',
                field: 'password'
            });
        }

        // Create and assign token
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
