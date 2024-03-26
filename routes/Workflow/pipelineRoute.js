const express = require('express')
const router = express.Router()

const { getPipelines, getPipeline, createPipeline, updatePipeline, deletePipeline} = require('../../controllers/Workflow/pipelineTemplateController')
const { createJobTemplate, getJobTemplate, getJobTemplates, deleteJobTemplate, updateJobTemplate} = require('../../controllers/Workflow/jobTemplateController')
const { createJob, getJobs, getJob, deleteJob, updateJob} = require('../../controllers/Workflow/jobController')
// Import the required schema and models
const pipelinedata= require('../../controllers/Workflow/boardsDataController'); // Assuming 'boardsData.js' is where you defined your 'boardsDataSchema'



//*******************Pipeline START********************* */

//GET all Pipeline 

router.get('/pipeline', getPipelines)

//GET single Pipeline 

router.get('/pipeline/:id', getPipeline)

//POST a new Pipeline

router.post('/pipeline', createPipeline)

//Delete a new Pipeline

router.delete('/pipeline/:id', deletePipeline)

//PATCH UPDATE a Pipeline 

router.patch('/pipeline/:id', updatePipeline)

//*******************Pipeline END********************* */


//*******************job START********************* */

//GET all job 

router.get('/job', getJobs)

//GET single job 

router.get('/job/:id', getJob)

// //GET single job by stageid

// router.get('/job/jobbystageid/:stageid', getJobbystageid)

//POST a new job

router.post('/job', createJob)

//Delete a new job

router.delete('/job/:id', deleteJob)

//PATCH UPDATE a job 

router.patch('/job/:id', updateJob)

//*******************job END********************* */


//*******************job  Template START********************* */

//GET all jobtemplate 

router.get('/jobtemplate', getJobTemplates)

//GET single jobtemplate 

router.get('/jobtemplate/:id', getJobTemplate)

//POST a new jobtemplate

router.post('/jobtemplate', createJobTemplate)

//Delete a new jobtemplate

router.delete('/jobtemplate/:id', deleteJobTemplate)

//PATCH UPDATE a Pipeline 

router.patch('/jobtemplate/:id', updateJobTemplate)

//*******************jobtemplate END********************* */



// Define a route handler
router.get('/pipeline/boardsData/:id', pipelinedata);


module.exports = router
