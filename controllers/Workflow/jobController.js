const Job = require('../../models/Workflow/jobModel');
const mongoose = require("mongoose");

//get all JobTemplate
const getJobs = async (req, res) => {
    try {
        const job = await Job.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "Job retrieved successfully", job });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

//Get a single JobTemplate
const getJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Job ID" });
    }

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: "No such Job" });
        }

        res.status(200).json({ message: "Job retrieved successfully", job });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message)
    }
};



//POST a new JobTemplate 
const createJob = async (req, res) => {
    const { accounts, pipeline, stageid, templatename, jobname, addShortCode, jobassignees, priority, description, absolutedates, startsin, startsinduration, duein, dueinduration, startdate, enddate, comments, active } = req.body;

    try {
        // Check if a task template with similar properties already exists
        const existingJob = await Job.findOne({
            jobname
        });

        if (existingJob) {
            return res.status(400).json({ error: "Job already exists" });
        }

        // If no existing template is found, create a new one
        const newJob = await Job.create({
            accounts, pipeline, stageid, templatename, jobname, addShortCode, jobassignees, priority, description, absolutedates, startsin, startsinduration, duein, dueinduration, startdate, enddate, comments, active
        });
        return res.status(201).json({ message: "Job created successfully", newJob });
    } catch (error) {
        console.error("Error creating Job:", error);
        return res.status(500).json({ error: "Error creating Job" });
    }
};


//delete a JobTemplate

const deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Job ID" });
    }

    try {
        const deletedJob = await Job.findByIdAndDelete({ _id: id });
        if (!deletedJob) {
            return res.status(404).json({ error: "No such Job" });
        }
        res.status(200).json({ message: "Job deleted successfully", deletedJob });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new tasktemplate 
const updateJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Job ID" });
    }

    try {
        const updatedJob = await Job.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ error: "No such Job" });
        }

        res.status(200).json({ message: "Job Updated successfully", updatedJob });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJob,
    deleteJob,
    updateJob
}