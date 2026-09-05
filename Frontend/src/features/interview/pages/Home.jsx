import { useState } from 'react'
import { useNavigate } from 'react-router'
import "../style/home.scss"
import { generateInterviewReport } from "../services/interview.api.js"
import { useAuth } from "../../auth/hooks/useAuth.js"

const Home = () => {
  const navigate = useNavigate()
  const { handleLogout } = useAuth()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resume, setResume] = useState(null)
  const [report, setReport] = useState(null)
  const [error, setError] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const completedDetails = [jobDescription.trim(), resume, selfDescription.trim()]
    .filter(Boolean).length

  async function handleSignOut() {
    await handleLogout()
    navigate("/login")
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (!resume) {
      setError("Please upload your resume first.")
      return
    }

    setIsGenerating(true)
    try {
      const response = await generateInterviewReport({
        resume,
        jobDescription,
        selfDescription,
      })
      setReport(response.interviewReport)
    } catch (requestError) {
      const status = requestError.response?.status
      const serverMessage = requestError.response?.data?.message
      setError(status === 401
        ? "Your session has expired. Please log in again before generating a report."
        : serverMessage || "Unable to generate the interview report.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className='home'>
      <header className='page-heading'>
        <div>
          <p className='eyebrow'>INTERVIEW LAB / AI PREP</p>
          <h1>Turn your resume into a sharper interview plan.</h1>
          <p className='heading-copy'>Share the role, your experience, and let AI map the questions you should prepare for.</p>
        </div>
        <div className='heading-actions'>
          <div className='heading-mark'>{String(completedDetails).padStart(2, "0")}<span>/</span>03</div>
          <button className='logout-button' type='button' onClick={handleSignOut}>Log out</button>
        </div>
      </header>

      <form className='interview-input-group' onSubmit={handleSubmit}>
        <div className='left'>
          <div className='field-heading'>
            <span className='step-number'>01</span>
            <div>
              <label htmlFor='jobDescription'>Target role</label>
              <p>Paste the job description you are preparing for.</p>
            </div>
          </div>
          <textarea name="jobDescription" id="jobDescription" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder='Enter job description here..'></textarea>
        </div>
        <div className='right'>
          <div className='input-group'>
            <div className='field-heading'>
              <span className='step-number'>02</span>
              <div>
                <p className='field-label'>Your profile</p>
                <p>Upload a PDF resume to build your report.</p>
              </div>
            </div>
            <label className='file-label' htmlFor='resume'>
              <span className='upload-icon'>+</span>
              <span>
                <strong>{resume ? resume.name : "Upload your resume"}</strong>
                <small>{resume ? "Resume ready for analysis" : "PDF files only"}</small>
              </span>
            </label>
            <input hidden type="file" name='resume' id='resume' accept='.pdf' onChange={(event) => setResume(event.target.files[0] || null)} />
          </div>
          <div className='input-group'>
            <div className='field-heading'>
              <span className='step-number'>03</span>
              <div>
                <label htmlFor='selfDescription'>Your story</label>
                <p>Add context your resume may not capture.</p>
              </div>
            </div>
            <textarea name="selfDescription" id="selfDescription" value={selfDescription} onChange={(event) => setSelfDescription(event.target.value)} placeholder='Describe your experience and strengths..'></textarea>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button className='button primary-button' type='submit' disabled={isGenerating}>
            {isGenerating ? "Analysing your profile..." : "Generate my interview report"}
            {!isGenerating && <span aria-hidden='true'>-&gt;</span>}
          </button>
        </div>
      </form>

      {report && (
        <section className='report'>
          <div className='report-header'>
            <div>
              <p className='highlight'>AI INTERVIEW REPORT</p>
              <h1>Your preparation roadmap</h1>
            </div>
            <div className='match-score'>
              <strong>{report.matchScore}%</strong>
              <span>Profile match</span>
            </div>
          </div>

          <div className='report-summary'>
            <span><b>{report.technicalQuestions?.length || 0}</b> technical prompts</span>
            <span><b>{report.behavioralQuestions?.length || 0}</b> behavioral prompts</span>
            <span><b>{report.skillGaps?.length || 0}</b> focus areas</span>
          </div>

          <div className='report-grid'>
            <ReportQuestions title='Technical Questions' questions={report.technicalQuestions} />
            <ReportQuestions title='Behavioral Questions' questions={report.behavioralQuestions} />
          </div>

          <div className='report-grid'>
            <div className='report-section'>
              <h2>Skill Gaps</h2>
              {report.skillGaps?.map((gap) => (
                <div className='skill-gap' key={gap.skill}>
                  <span>{gap.skill}</span>
                  <span className={`severity ${gap.severity}`}>{gap.severity}</span>
                </div>
              ))}
            </div>
            <div className='report-section'>
              <h2>Preparation Plan</h2>
              {report.preparationPlan?.map((plan) => (
                <div className='plan-day' key={plan.day}>
                  <strong>Day {plan.day}: {plan.focus}</strong>
                  <ul>{plan.tasks?.map((task) => <li key={task}>{task}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

function ReportQuestions({ title, questions = [] }) {
  return (
    <div className='report-section'>
      <h2>{title}</h2>
      {questions.map((item, index) => (
        <article className='question' key={`${item.question}-${index}`}>
          <h3>{item.question}</h3>
          <p><b>Intent:</b> {item.intention}</p>
          <p><b>Answer approach:</b> {item.answer}</p>
        </article>
      ))}
    </div>
  )
}

export default Home
