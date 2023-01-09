import { Schema, model, Document, Model, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  validPassword: (password: string) => boolean;
  exist: (email: string) => any;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      validate: [
        {
          validator: function (email: string) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          },
          message: () => 'Please provide a valid email.',
        },
        {
          validator: async function (email: string) {
            let model = this.constructor as Model<IUser>;
            let user = await model.findOne({ email: email });
            return user == null;
          },
          message: () => 'Provided email has already been registered.',
        },
      ],
      unique: true,
      required: [true, 'Please specify a valid email.'],
    },
    firstName: {
      type: String,
      validate: [
        (firstName: string) => {
          let validationRegex: RegExp = /^[A-Za-z\s]*$/;
          return validationRegex.test(firstName);
        },
        `First name contains invalid characters. Please provide a valid value.`,
      ],
      required: [true, 'Please specify a valid first name.'],
    },
    lastName: {
      type: String,
      validate: [
        (lastName: string) => {
          let validationRegex: RegExp = /^[A-Za-z\s]*$/;
          return validationRegex.test(lastName);
        },
        `Last name contains invalid characters. Please provide a valid value.`,
      ],
      required: [true, 'Please specify a valid last name.'],
    },
    password: {
      type: String,
      validate: [
        (password: string) => {
          // https://www.linkedin.com/pulse/create-strong-password-validation-regex-javascript-mitanshu-kumar/
          let validationRegex: RegExp =
            /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\/_₹]).{8,16}$/;
          return validationRegex.test(password);
        },
        'Please provide a strong password',
      ],
      required: [true, 'Please specify a valid password.']
    },
    avatar: { type: String, default: 'default.png' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    methods: {
      validPassword: function (reqPassword: string) {
        return bcrypt.compareSync(reqPassword, this.password);
      },
    },
  }
);

userSchema
  .virtual('passwordConfirm')
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (value) {
    this._passwordConfirmation = value;
  });

userSchema.pre('validate', function (next) {
  if (this.password !== this.passwordConfirm) {
    this.invalidate('passwordConfirm', 'Password confirmation must match password.');
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    return next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

const UserModel = model<IUser>('user', userSchema);

export default UserModel;
