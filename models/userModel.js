const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter a name"],
		},
		email: {
			type: String,
			required: [true, "Please enter an email address"],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "Please enter a valid password"],
			minLength: [6, "Please enter a valid password with at least 6 characters"],
			maxLength: [12, "Please enter a valid password less than 12 characters"],
		},
		photo: {
			type: String,
			required: [true, "Please add a photo to your account"],
			default: "https://unsplash.com/photos/2LowviVHZ-E",
		},
		phone: {
			type: String,
			maxLength: [10, "Please enter a valid phone number"],
		},
		bio: {
			type: String,
			maxLength: [250, "Please enter your bio max of 250 characters"],
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
