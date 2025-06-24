import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethods } from "../interfaces/user.interface";
import validator from "validator"
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
})

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethod>({

    firstName: {
        type: String,
        required: [true, 'first name deya lagbe vai'],
        trim: true,
        minlength: [3, 'name must be at least three characters'],
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be at least 18, got {VALUE}'],
        max: 60
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: true,
        trim: true,
        lowercase: true,
        // validate: {
        //     validator: function (value) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        //     },
        //     message: function (props) {
        //         return `Email ${props.value} is not valid email`
        //     }
        // }
        validate: [validator.isEmail, "Invalid Email {VALUE}"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        // enum: ['USER', 'ADMIN'],
        enum: {
            values: ['USER', 'ADMIN', 'SUPERADMIN'],
            message: "Role is not valid , got {VALUE} role"
        },
        default: 'USER'
    },
    address: {
        type: addressSchema
    }

},
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })


userSchema.method('hashPassword', async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10)
    // this.password = password
    return password;
})

userSchema.static('hashPassword', async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10)
    // this.password = password
    return password;
})

userSchema.pre('save', async function () {
    console.log('inside pre save hook');
    this.password = await bcrypt.hash(this.password, 10)
    console.log(this);
})

userSchema.pre('find', function (next, doc) {
    console.log(doc)
    next();
})

userSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        console.log(doc);
        await Note.deleteMany({ user: doc._id })
    }
})

userSchema.post('save', function (doc) {
    console.log('inside post save hook');
    console.log('%s has been saved', doc._id);
})

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

export const User = model<IUser, UserStaticMethods>("User", userSchema)
