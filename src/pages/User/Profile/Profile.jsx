import React, { useState } from 'react';
import { uploadUserAvatar, updateUserInfo } from '../../../Utils/api';
import defaultAvatar from '../../../assets/img/default-avatar.jpg';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Trạng thái của việc tải ảnh lên
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    name: userInfo.name,
    email: userInfo.email,
    money: userInfo.money
  });
  const [editMode, setEditMode] = useState(false);

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true); // Bắt đầu hiển thị hiệu ứng loading
      const formData = new FormData();
      formData.append('fileUpload', avatarFile);
      formData.append('username', userInfo.username);

      const response = await uploadUserAvatar(formData);
      if (response.success) {
        // Nếu tải ảnh lên thành công, cập nhật lại URL của ảnh
        setUserInfo({ ...userInfo, avatar: response.avatar });
      } else {
        console.error('Error uploading avatar:', response.message);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false); // Kết thúc hiển thị hiệu ứng loading
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value
    });
  };

  const handleUpdateUserInfo = async () => {
    try {
      const response = await updateUserInfo(userInfo.username, updatedUserInfo);
      if (response.success) {
        // Nếu cập nhật thông tin thành công, cập nhật thông tin người dùng
        setUserInfo({
          ...userInfo,
          name: updatedUserInfo.name,
          email: updatedUserInfo.email,
          money: updatedUserInfo.money
        });
        setEditMode(false); // Thoát khỏi chế độ chỉnh sửa
      } else {
        console.error('Error updating user info:', response.message);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className='mainBodyUser'>
      <Header />
      <div className="profile-container">
        <div className="avatar-section">
          {/* Hiển thị hiệu ứng loading nếu đang tải ảnh lên */}
          {uploading && <p>Loading...</p>}
          <img
            src={userInfo && userInfo.avatar ? `${process.env.REACT_APP_UPLOAD_URL}/${userInfo.avatar}` : defaultAvatar}
            alt="Avatar"
            className="avatar"
          />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          <button onClick={handleUpload}>Upload Avatar</button>
        </div>
        <div className="info-section">
          <h2>User Profile</h2>
          <p>Username: {userInfo?.username}</p>
          {editMode ? (
            <>
              <input type="text" name="name" value={updatedUserInfo.name} onChange={handleInputChange} />
              <input type="email" name="email" value={updatedUserInfo.email} onChange={handleInputChange} />
              <input type="number" name="money" value={updatedUserInfo.money} onChange={handleInputChange} />
              <button onClick={handleUpdateUserInfo}>Save</button>
            </>
          ) : (
            <>
              <p>Name: {userInfo?.name}</p>
              <p>Email: {userInfo?.email}</p>
              <p>Money: {userInfo?.money}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
