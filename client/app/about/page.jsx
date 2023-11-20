import React from 'react'

export default function About() {
  return (
    <div className="about-container">
      <video src='bgv-s.mp4' autoPlay loop muted className='video' />
      <h4 className="about-header">Derived from the Google Search Engine</h4>
      <p className="about-paragraph">Probe Nexus fetches the Google Search API and provides the search results to the user,</p>
      <p className="about-paragraph">allowing them to save and remove each link with ease.</p>
    </div>
  )
}
