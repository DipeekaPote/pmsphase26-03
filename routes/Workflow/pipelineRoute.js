const express = require('express')
const router = express.Router()

const { getPipelines, getPipeline, createPipeline, updatePipeline, deletePipeline, getPipelineTemplateList} = require('../../controllers/Workflow/pipelineTemplateController')
const { createJobTemplate, getJobTemplate, getJobTemplates, deleteJobTemplate, updateJobTemplate, getJobTemplateList} = require('../../controllers/Workflow/jobTemplateController')
const { createJob, getJobs, getJob, deleteJob, updateJob, getJobList} = require('../../controllers/Workflow/jobController')
// Import the required schema and models
const pipelinedata= require('../../controllers/Workflow/boardsDataController'); // Assuming 'boardsData.js' is where you defined your 'boardsDataSchema'
const { getEmailTemplates,createEmailTemplate,getEmailTemplate,deleteEmailTemplate, updateEmailTemplate,getEmailTemplateList } = require('../../controllers/Workflow/emailTemplateController')


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

//GET single Pipeline 

router.get('/pipeline/pipelinelist/:id', getPipelineTemplateList)

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

//GET all job 

router.get('/job/joblist/list', getJobList)

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

//GET single jobtemplate 

router.get('/jobtemplate/jobtemplatelist/:id', getJobTemplateList)

//*******************jobtemplate END********************* */



// Define a route handler
router.get('/pipeline/boardsData/:id', pipelinedata);

//*******************Email emplate Start********************* */

router.get('/emailtemplate', getEmailTemplates)

//GET single emailtemplate 

router.get('/emailtemplate/:id', getEmailTemplate)

router.get('/emailtemplate/emailtemplateList/:id', getEmailTemplateList)

//POST a new emailtemplate

router.post('/emailtemplate', createEmailTemplate)

//Delete a new emailtemplate

router.delete('/emailtemplate/:id', deleteEmailTemplate)

//PATCH UPDATE a emailtemplate 

router.patch('/emailtemplate/:id', updateEmailTemplate)

//*******************Email template END********************* */


module.exports = router
