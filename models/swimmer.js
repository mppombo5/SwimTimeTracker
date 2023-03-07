const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SwimmerSchema = new Schema({
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    trim: true,
    default: null,
  },
  times: {
    len50: {
      fly: {
        type: [String],
        default: () => { return null; }
      },
      back: {
        type: [String],
        default: () => { return null; }
      },
      breast: {
        type: [String],
        default: () => { return null; }
      },
      free: {
        type: [String],
        default: () => { return null; }
      },
    },
    len100: {
      fly: {
        type: [String],
        default: () => { return null; }
      },
      back: {
        type: [String],
        default: () => { return null; }
      },
      breast: {
        type: [String],
        default: () => { return null; }
      },
      free: {
        type: [String],
        default: () => { return null; }
      },
      medley: {
        type: [String],
        default: () => { return null; }
      },
    },
    len200: {
      fly: {
        type: [String],
        default: () => { return null; }
      },
      back: {
        type: [String],
        default: () => { return null; }
      },
      breast: {
        type: [String],
        default: () => { return null; }
      },
      free: {
        type: [String],
        default: () => { return null; }
      },
      medley: {
        type: [String],
        default: () => { return null; }
      },
    },
    len500: {
      free: {
        type: [String],
        default: () => { return null; }
      },
    },
  }
});

SwimmerSchema.virtual("url").get(function() {
  // url endpoint is just their ID
  return `/swimmer/${this._id}`;
});

SwimmerSchema.virtual("fullname").get(function() {
  // lname + (fname ? `, ${fname}` : '')
  let lname = this.lastname,
      fname = this.firstname;
  return lname + (fname ? `, ${fname}` : '');
});

SwimmerSchema.virtual("strokes").get(function () {
  // Return an array of strokes to iterate over within each distance
  return ['fly', 'breast', 'back', 'free', 'medley'];
});
SwimmerSchema.virtual("lengths").get(function () {
  // Return the lengths which are valid
  return ['len50', 'len100', 'len200', 'len500'];
})

module.exports = mongoose.model("Swimmer", SwimmerSchema);
