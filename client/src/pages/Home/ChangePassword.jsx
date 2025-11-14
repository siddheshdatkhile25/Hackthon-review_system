import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { changePassword } from '../../services/users'
import { toast } from 'react-toastify'

function ChangePassword() {
  const { user } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  if (!user) {
    return <div className="container mt-4"><h3>Please log in to change your password.</h3></div>
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match')
      return
    }
    const result = await changePassword(user.email, oldPassword, newPassword)
    if (result.status === 'success') {
      toast.success('Password changed successfully')
      setOldPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } else {
      toast.error(result.error || 'Failed to change password')
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Change Password</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
