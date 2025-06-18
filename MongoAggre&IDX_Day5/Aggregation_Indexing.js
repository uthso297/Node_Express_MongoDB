db.test2.aggregate([
    // stage-1
    { $match: { gender: 'Male', age: { $lt: 30 } } },
    // stage-2
    { $project: { name: 1, age: 1, gender: 1 } }
])

db.test2.aggregate([
    // stage-1
    { $match: { gender: 'Male' } },
    // stage-2
    { $match: { age: { $lt: 30 } } },
    // stage-3
    { $project: { name: 1, age: 1, gender: 1 } }
])

db.test2.aggregate([
    // stage-1
    { $match: { gender: 'Male' } },
    // stage-2
    { $addFields: { course: "Level-2", platform: "Programming Hero" } },
    // stage-3
    { $project: { gender: 1, course: 1, platform: 1 } }
])

// savr to new collection named course_students
db.test2.aggregate([
    // stage-1
    { $match: { gender: 'Male' } },
    // stage-2
    { $addFields: { course: "Level-2", platform: "Programming Hero" } },
    // stage-3
    // { $project: { gender: 1, course: 1, platform: 1 } },
    // stage-4
    { $out: "course_students" }

])
// to modify original documents
db.test2.aggregate([
    // stage-1
    { $match: { gender: 'Male' } },
    // stage-2
    { $addFields: { course: "Level-2", platform: "Programming Hero" } },
    // stage-3
    // { $project: { gender: 1, course: 1, platform: 1 } },
    // stage-4
    { $merge: "course_students" }

])

db.test2.aggregate([
    { $group: { _id: "$gender", count: { $sum: 1 } } }
])

db.test2.aggregate([
    { $group: { _id: "$address.country", count: { $sum: 1 }, nameDekhi: { $push: '$name' } } }
])

db.test2.aggregate([
    {
        $group: {
            _id: "$address.country",
            count: { $sum: 1 }, keAcheTarDetails: { $push: '$$ROOT' }

        }
    }
])

db.test2.aggregate([

    {
        $group: {
            _id: "$address.country",
            count: { $sum: 1 }, keAcheTarDetails: { $push: '$$ROOT' },
            // stage-2

        }
    },
    {
        $project: {
            "keAcheTarDetails.name": 1,
            "keAcheTarDetails.email": 1,
            "keAcheTarDetails.phone": 1

        }
    }
])

db.test2.aggregate([
    {
        $group: {
            _id: null,
            totalSalary: { $sum: "$salary" },
            maxSalary: { $max: "$salary" },
            minSalary: { $min: "$salary" },
            avgSalary: { $avg: "$salary" },
        }
    },
    {
        $project: {
            totalSalary: 1,
            maxSalary: 1,
            minSalary: 1,
            averageSalary: '$avgSalary',
            rangeBetweenMaxAndMinSalary: { $subtract: ['$maxSalary', '$minSalary'] }
        }
    }
])

db.test2.aggregate([
    {
        $group: { _id: "$friends" }
    }
])

db.test2.aggregate([
    {
        $unwind: "$friends"
    },
    {
        $group: { _id: "$friends", count: { $sum: 1 } }
    }
])

db.test2.aggregate([
    {
        $unwind: "$interests"
    },
    {
        $group: {
            _id: "$age", interestsPerAge: { $push: "$interests" }
        }
    }
])

db.test2.aggregate([
    // stage-1
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 40, 60, 80],
            default: "80 er uporer buragula",
            output: {
                count: { $sum: 1 },
                karakaraAche: { $push: "$name" }
            }
        }
    }

])

db.test2.aggregate([
    // stage-1
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [20, 40, 60, 80],
            default: "80 er uporer buragula",
            output: {
                count: { $sum: 1 },
                karakaraAche: { $push: "$$ROOT" }
            }
        }
    },
    {
        $sort: { count: -1 }
    }

])

db.test2.aggregate([
    {
        $facet: {
            // PIPELINE-1
            "friendsCount": [
                // stage-1
                { $unwind: "$friends" },
                // stage-2
                { $group: { _id: "$friends", count: { $sum: 1 } } }
            ],
            "educationCount": [
                // stage-1
                { $unwind: "$education" },
                // stage-2
                { $group: { _id: "$education", count: { $sum: 1 } } }
            ],
            // pipeline-3
            "skillsCount": [
                // stage-1
                { $unwind: "$skills" },
                // stage-2
                { $group: { _id: "$skills", count: { $sum: 1 } } }
            ]
        }
    }

])











