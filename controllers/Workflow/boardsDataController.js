const express = require('express')
const mongoose = require('mongoose')

const Pipeline = require('../../controllers/Workflow/pipelineTemplateController')
const PipelineModel = require('../../models/Workflow/pipelineTemplateModel')
const job = require('../../controllers/Workflow/jobController')
const Job = require('../../models/Workflow/jobModel')



// Define the sub-schema for the 'chip' field
const chipSchema = new mongoose.Schema({
    chipName: String,
    backgroundColor: String
  });
  
  // Define the sub-schema for the 'userChip' field
  const userChipSchema = new mongoose.Schema({
    number: String,
    backgroundColor: String
  });

const cardsSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    username: {
        type: String,
    },

    title: {
        type: String,
    },
    days: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    chip : {
        chipSchema
    },
    userchip : {
        userChipSchema
    }

});

const boardsDataSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    cards: [{
        cardsSchema
    }],
});

const pipelinedata = async (req, res) => {

    const { id } = req.params;

    const Pipeline = await PipelineModel.findById(id)
   
    
    const stages = Pipeline.stages.map(stage => ({
        _id: stage._id,
        name: stage.name
    }));

    const { pipeline } = req.params;
    const jobs = await Job.find(pipeline)
    .populate({ path: 'accounts', model: 'account' })
    .populate({ path: 'pipeline', model: 'pipeline' , populate: { path: 'stages', model: 'stage' } })
    .populate({ path: 'jobassignees', model: 'User' })

    const boardsData = stages.map(stage => {

         const stageJobs = jobs.filter(job => job.stageid.toString() === stage._id.toString())

         return {
            id: stage._id,
            title: stage.name,
            cards: stageJobs.map(job => ({
                _id: job._id,
                accounts: job.accounts,
                pipeline: job.pipeline,
                stageid: stage,
                templatename: job.templatename,
                jobname: job.jobname,
                jobassignees: job.jobassignees,
                priority: job.priority,
                description: job.description,
                absolutedates: job.absolutedates,
                startsin: job.startsin,
                startsinduration: job.startsinduration,
                duein: job.duein,
                dueinduration: job.dueinduration,
                comments: job.comments,
            }))
        };
    });


    res.status(200).json({ boardsData });
}

module.exports = pipelinedata;