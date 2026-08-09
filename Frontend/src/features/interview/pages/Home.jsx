import React from 'react'
import "../style/home.scss"

const Home = () => {
  return (
    <main className='home'>
      <div className='interview-input-group'>
        <div className='left'>
          <label htmlFor='jobDescription'>Job Description</label>
            <textarea name="jobDescription" id="jobDescription" placeholder='Enter job description here..'></textarea>
        </div>
        <div className='right'>
            <div className='input-group'>
              <p  className='highlight'>Use Resume and Self Description</p>
                <label className='file-label' htmlFor='resume'>Upload Resume</label>
                <input hidden type="file" name='resume' id='resume' accept='.pdf'></input>
            </div>
            <div className='input-group'>
                <label htmlFor='selfDescription'>Self Description</label>
                <textarea name="selfDescription" id="selfDescription" placeholder='Enter job description here..'></textarea>
            </div>
            <div className='button primary-button'>Generate Interview Report</div>
        </div>
      </div>
    </main>
  )
}

export default Home
