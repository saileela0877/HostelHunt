const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostelSchema = new Schema({
  hostelName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  // fees: [
  //   {
  //     roomType: String,
  //     fee: Number,
  //   },
  // ],
  fees: [
    {
      roomType: {
        type: String,
        required: true,
      },
      fee: {
        type: Number,
        required: true,
      },
    },
  ],

  weeklyMenu: {
    type: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        breakfast: {
          type: String,
          required: true,
        },
        lunch: {
          type: String,
          required: true,
        },
        dinner: {
          type: String,
          required: true,
        },
      },
    ],
    validate: {
      validator: function (value) {
        return value.length === 7; // Ensure exactly 7 items for each day of the week
      },
      message: "A menu for each day of the week is required.",
    },
    required: true,
  },

  facilities: {
    type: [String],
    required: true,
  },

  DisplayPic: {
    type: String,
  },

  photos: {
    type: [String], // Array of URLs for hostel photos
  },

  description: {
    type: String,
  },

  contact: {
    type: Number,
  },

  reviews: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

const Hostel = mongoose.model("Hostel", hostelSchema);
module.exports = Hostel;
