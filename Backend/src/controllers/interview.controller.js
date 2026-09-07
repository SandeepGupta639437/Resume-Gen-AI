const pdfParse = require("pdf-parse")
const generateInterviewReport= require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a PDF resume." })
    }

    let stage = "pdf"

    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription?.trim() || !selfDescription?.trim()) {
            return res.status(400).json({ message: "Job description and your story are required." })
        }

        stage = "ai"
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        stage = "database"
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error(`Interview report failed during ${stage}:`, error)
        return res.status(502).json({
            message: stage === "ai"
                ? "The AI report service is unavailable. Check the production Gemini API configuration."
                : "The report service is temporarily unavailable. Please try again.",
            code: `REPORT_${stage.toUpperCase()}_FAILED`,
            detail: process.env.NODE_ENV === "production" ? undefined : error.message
        })
    }

}

module.exports = {generateInterViewReportController}