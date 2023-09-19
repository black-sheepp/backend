const asyncHnadler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "2d",
	});
};

module.exports.registerUser = asyncHnadler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please fill in all required fields");
	}

	if (password.length < 6) {
		res.status(400);
		throw new Error("Password must be at least 6 characters");
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("Email already exists");
	}

	// creaet new user
	const user = await User.create({
		name: name,
		email: email,
		password: password,
	});

	// generate token
	const token = generateToken(user._id);

	// send httpOnly cookies
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400 * 2),
		sameSite: "none",
		secure: true,
	});

	if (user) {
		const { _id, name, email, photo, phone, bio } = user;
		res.status(201).json({
			_id,
			name,
			email,
			photo,
			phone,
			bio,
			token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

module.exports.loginUser = asyncHnadler(async function (req, res) {
	const { email, password } = req.body;

	// validate request
	if (!email || !password) {
		res.status(400);
		throw new Error("Enter email or password");
	}

	// user exists or not
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error("User not found, please register");
	}

	// password entered is correct or not
	const verifyPassword = await bcrypt.compare(password, user.password);

	// generate token
	const token = generateToken(user._id);

	// send httpOnly cookies
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400 * 2),
		sameSite: "none",
		secure: true,
	});

	if (user && verifyPassword) {
		const { _id, name, email, photo, phone, bio } = user;
		res.status(200).json({
			_id,
			name,
			email,
			photo,
			phone,
			bio,
			token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

module.exports.logoutUser = asyncHnadler(async function (req, res) {
	// delete httpOnly cookies
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	});
	return res.status(200).json({
		message: "User logged out successfully",
	});
});

module.exports.getUser = asyncHnadler(async function (req, res) {
	const user = await User.findById(req.user.id);

	if (user) {
		const { _id, name, email, photo, phone, bio } = user;
		res.status(200).json({
			_id,
			name,
			email,
			photo,
			phone,
			bio,
		});
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

module.exports.session = asyncHnadler(async function (req, res) {
	const token = req.cookies.token;
	if (!token) {
		res.json(false);
	}

	// verify token
	const verified = jwt.verify(token, process.env.JWT_SECRET);

	if (verified) {
		res.json(true);
	}
	res.json(false);
});

module.exports.updateUser = asyncHnadler(async function (req, res) {
	const user = await User.findById(req.user._id);

	if (user) {
		const { name, email, photo, phone, bio } = user;
		user.email = email;
		user.name = req.body.name || name;
		user.phone = req.body.phone || phone;
		user.bio = req.body.bio || bio;
		user.photo = req.body.photo || photo;

		const updatedUser = await user.save();

		res.status(200).json({
			name: updatedUser.name,
			email: updatedUser.email,
			photo: updatedUser.photo,
			phone: updatedUser.phone,
			bio: updatedUser.bio,
		});
	}else{
		res.status(404);
		throw new Error("User not found");
	}
});


module.exports.changePassword = asyncHnadler(async function(req,res){
	const user = await User.findById(req.user._id);
	const {oldPassword,password} = req.body;

	if(!user){
		res.status(404);
		throw new Error("User not found, pleease signup");
	}

	// validate passwords
	if(!oldPassword || !password){
		res.status(404);
		throw new Error("Please add old and new password");
	}

	// check if old password matches password in db
	const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

	// save new password
	if(user && passwordIsCorrect) {
		user.password = password;
		await user.save();
		res.status(200).send({message: 'Password changed successfully'});
	}else{
		res.status(404);
		throw new Error("Old password is incorrect");
	}
})