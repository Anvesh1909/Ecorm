import React from 'react';
import styles from './UserInfo.module.css';
import pic from '../../assets/searchLogo.png';


const UserInfo = ({userInfo}) => {

    


  return (
    <div className="row mb-4">
      {/* Profile Card */}
      <div className="col-md-3 py-3">
        <div className={`card text-center ${styles.textCenter}`}>
          <img
            src={pic}
            alt="UserProfile"
            className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
          />
          <h5 className="text-uppercase">{userInfo.first_name} {userInfo.last_name}</h5>
          <p className="text-muted">{userInfo.email}</p>
          <button className="btn mt-2" style={{ backgroundColor: '#6050DC', color: 'white' }}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Account Overview */}
      <div className="col-md-9 py-3">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
            <h5>Account Overview</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Full Name:</strong> {userInfo.first_name} {userInfo.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phone}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>City:</strong> {userInfo.city}
                </p>
                <p>
                  <strong>Country:</strong> {userInfo.country}
                </p>
                <p>
                    <strong>Member Since:</strong> {userInfo.date_joined}
                </p>
              </div>
            </div>
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default UserInfo;
