import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
      text: true,
      minLength: [3, 'first_name must between 3 and 30 characters'],
      maxLength: [30, 'first_name must between 3 and 30 characters'],
    },
    last_name: {
      type: String,
      required: [true, 'last name is required'],
      trim: true,
      text: true,
      minLength: [3, 'first_name must between 3 and 30 characters'],
      maxLength: [30, 'first_name must between 3 and 30 characters'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
      text: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^([a-z\d.-]+)@([a-z]{2,12})(\.[a-z]{2,12})?$/.test(v);
        },
        message: (props) => `${props.value} is not a email`,
      },
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    picture: {
      type: String,
      trim: true,
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
