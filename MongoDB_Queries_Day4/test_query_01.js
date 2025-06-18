/*
db.test.insertOne({ name: 'Next Level Web Development' });

db.test.insertMany(
    [
        {
            name: 'Complete Web Development'
        },
        {
            name: 'Full Stack Development'
        }
    ]
)

*/


db.test.find({ _id: ObjectId('6406ad64fc13ae5a40000081') })

db.test.findOne({ name: { firstName: "Ailina", lastName: "Grieg" } })

db.test.find({ gender: 'Male' }, { gender: 1, name: 1, email: 1 })

db.test.find({ gender: 'Male' }).project({ name: 1, gender: 1 })

db.test.find({ gender: { $eq: 'Female' } }, { age: 1 })

db.test.find({ gender: { $ne: 'Female' } })

db.test.find({ age: { $gt: 18 } }).sort({ age: 1 })

db.test.find({ age: { $lt: 18 } })

db.test.find({ age: { $gte: 18 } })

db.test.find({ age: { $lte: 18 } })

// implicit and
db.test.find({ age: { $lt: 30, $gt: 18 } }, { age: 1 }).sort({ age: -1 })

db.test.find({ gender: "Female", age: { $lt: 30, $gt: 18 } }, { age: 1, gender: 1 }).sort({ age: -1 })

db.test.find({ gender: "Male", age: { $in: [18, 20, 22, 24] } }, { age: 1, gender: 1 }).sort({ age: -1 })

db.test.find({ gender: "Male", age: { $nin: [18, 20, 22, 24] } }, { age: 1, gender: 1 }).sort({ age: -1 })

db.test.find(
    {
        gender: "Male",
        age: { $nin: [18, 20, 22, 24] },
        interests: "Cooking"
    }, { age: 1, gender: 1, interests: 1 }).sort({ age: 1 })

db.test.find(
    {
        gender: "Male",
        age: { $nin: [18, 20, 22, 24] },
        interests: { $in: ["Cooking", "Gaming"] }
    }, { age: 1, gender: 1, interests: 1 }).sort({ age: 1 })


// implicit and

db.test.find(
    {
        age: { $ne: 15, $lte: 30 }
    },
    { age: 1 }
)

// explicit and
db.test.find(
    {
        $and: [
            { gender: "Female" },
            { age: { $ne: 15 } },
            { age: { $lte: 30 } }

        ]
    },
    {
        age: 1,
        gender: 1
    }
)

db.test.find(
    {
        $or: [
            { interests: "Travelling" },
            { interests: "Cooking" }

        ]
    },
    {
        age: 1,
        gender: 1,
        interests: 1
    }
)

// Explicit or 

db.test.find(
    {
        $or: [
            {
                "skills.name": "JAVASCRIPT",

            }
            {
                "skills.name": "PYTHON",

            }

        ]
    },
    {
        age: 1,
        gender: 1,
        interests: 1,
        skills: 1
    }
)

db.test.find({ age: { $exists: true } })

db.test.find({ age: { $type: "number" } })

db.test.find({ age: { $type: "string" } })

db.test.find({ friends: { $size: 4 } }).project({
    friends: 1
})

db.test.find({ friends: { $size: 0 } }).project({
    friends: 1
})

db.test.find({ company: { $type: "null" } }).project({
    company: 1
})

db.test.find({ "interests.2": "Cooking" }).project({
    interests: 1
})

db.test.find({ interests: { $all: ["Travelling", "Gaming", "Cooking"] } }).project({
    interests: 1
})

db.test.find(
    {
        skills:
        {
            $elemMatch: {
                name: 'JAVASCRIPT',
                level: 'Intermidiate'
            }

        }

    }
)
    .projection({ skills: 1 })

db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $set:
        {
            age: 21
        }

    })

db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $addToSet:
        {
            interests: "Gaming"
        }

    })

db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $addToSet:
        {
            interests: { $each: ["Cookingi", "Driving"] }
        }

    })

// to keep duplicate value we use push
db.test.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $push:
        {
            interests: { $each: ["Cookingi", "Driving"] }
        }

    })

// remove the field
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $unset: {
            birthday: ""
        }

    })

db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $unset: {
            age: 1
        }

    })

// remove last element
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $pop: {
            friends: 1
        }

    })

// remove first element
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $pop: {
            friends: -1
        }

    })

// remove specific element

db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $pull: {
            friends: "Tanmoy Parvez"
        }

    })

db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $set: {
            "email": "email@email.com",
            "address.street": "123 bitla bishu free"
        }

    })

// update array of object,a specific property value
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065"),
        "education.major": "Communications"
    },
    {
        $set: {
            "education.$.major": "Physics"
        }

    })

// increment
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065")
    },
    {
        $inc: {
            age: 1
        }

    })

db.test.deleteOne({ _id: ObjectId('6406ad63fc13ae5a40000066') })

db.createCollection("posts")
db.posts.insertOne({ title: "testing" })
db.posts.drop({ writeConcern: { w: 1 } })


























