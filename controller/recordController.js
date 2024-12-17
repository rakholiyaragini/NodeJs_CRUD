const Record = require("../model/record");

exports.getAllRecords = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 10 } = req.query;
        const query = search ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }, { phone: { $regex: search, $options: "i" } }] } : {};

        const [records, total] = await Promise.all([
            Record.find(query).skip((page - 1) * limit).limit(Number(limit)),
            Record.countDocuments(query)
        ]);

        res.render("index", {
            records,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            search,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
exports.addRecord = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const image = req.file ? req.file.path : null;

        const newRecord = new Record({ name, email, phone, image });
        await newRecord.save();

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Get a single record for editing
exports.getRecordById = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) return res.status(404).send("Record not found");

        res.render("edit", { record });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Update a record
exports.updateRecord = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const image = req.file ? req.file.path : null;

        const updatedData = { name, email, phone };
        if (image) updatedData.image = image;

        await Record.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
//delete

exports.deleteRecord = async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};