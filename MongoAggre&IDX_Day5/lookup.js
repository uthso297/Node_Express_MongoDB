db.orders.aggregate([
    {
        $lookup: {
            from: "test2",
            localField: "userId",
            foreignField: "_id",
            as: "custInfo"
        }
    }
])