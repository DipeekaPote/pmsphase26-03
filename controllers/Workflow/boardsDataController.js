const express = require('express')
const mongoose = require('mongoose')

const Pipeline = require('../../controllers/Workflow/pipelineTemplateController')
const PipelineModel = require('../../models/Workflow/pipelineTemplateModel')
const job = require('../../controllers/Workflow/jobController')
const Job = require('../../models/Workflow/jobModel')

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
        .populate({ path: 'pipeline', model: 'pipeline', populate: { path: 'stages', model: 'stage' } })
        .populate({ path: 'jobassignees', model: 'User' })
        .populate({ path: 'templatename', model: 'JobTemplate', select: 'templatename' });

    const boardsData = stages.map(stage => {

        const stageJobs = jobs.filter(job => job.stageid.toString() === stage._id.toString())

        return {
            id: stage._id,
            title: stage.name,
            cards: stageJobs.map(job => ({
                _id: job._id,
                accounts: job.accounts.map(account => account.accountName), 
                stageid: stage,
                templatename: job.templatename,
                jobname: job.jobname,
                priority: job.priority,
                Due : job.enddate
            }))
        };
    });


    res.status(200).json({ boardsData });
}

module.exports = pipelinedata;