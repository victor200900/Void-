

import React from 'react'

const watching = () => {
  return (
    <>
     {/* Netflix-Style Profile Section */}
    <div className="netflix-profile-page">
      <h1 className="text-center mb-5">Who's watching?</h1>
      <div className="profile-grid">
        <div className="profile-item">
          <img src="src/assets/profile-avatar.png" alt="User Avatar" />
          <p>Victor</p>
        </div>
        <div className="profile-item">
          <img src="src/assets/profile-avatar.png" alt="User Avatar" />
          <p>Alice</p>
        </div>
        <div className="profile-item">
          <img src="src/assets/profile-avatar.png" alt="User Avatar" />
          <p>Guest</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default watching;