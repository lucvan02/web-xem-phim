import React, { useState } from 'react';
import { addPerson } from '../../Utils/api'; // Import hàm addPerson từ file api.js

function AddPersonForm() {
    const [personData, setPersonData] = useState({
        name: '',
        gender: 1,
        dayOfBirth: '',
        image: '',
        describe: '',
        countryId: 1
    });

    // Xử lý sự kiện khi người dùng thay đổi giá trị của các trường dữ liệu
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPersonData({ ...personData, [name]: value });
    };

    // Xử lý sự kiện khi người dùng gửi biểu mẫu
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn trình duyệt gửi yêu cầu mặc định

        try {
            // Gọi hàm addPerson từ file api.js để thêm một đối tượng Person mới
            await addPerson(personData);
            // Nếu thêm thành công, làm sạch trường dữ liệu và hiển thị một thông báo thành công
            setPersonData({
                name: '',
                gender: 1,
                dayOfBirth: '',
                image: '',
                describe: '',
                countryId: 1
            });
            alert('Person created successfully!');
        } catch (error) {
            console.error('Error creating person:', error);
            alert('Failed to create person. Please try again later.');
        }
    };

    return (
        <div className='add-person-form'>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={personData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Gender:
                <input type="number" name="gender" value={personData.gender} onChange={handleChange} />
            </label>
            <br />
            <label>
                Day of Birth:
                <input type="text" name="dayOfBirth" value={personData.dayOfBirth} onChange={handleChange} />
            </label>
            <br />
            <label>
                Image:
                <input type="text" name="image" value={personData.image} onChange={handleChange} />
            </label>
            <br />
            <label>
                Describe:
                <input type="text" name="describe" value={personData.describe} onChange={handleChange} />
            </label>
            <br />
            <label>
                Country ID:
                <input type="number" name="countryId" value={personData.countryId} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Create Person</button>
        </form>
        </div>
    );
}

export default AddPersonForm;
