import React, { useState, useEffect } from 'react';
import { addMovie, getAllCountries, getAllCategories, getAllPersons } from '../../Utils/api'; // Import hàm addMovie, getAllCountries, getAllCategories, getAllPersons từ file api.js
import './AddMovieForm.css'; // Import CSS cho form

function AddMovie() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        episodes: 0,
        schedule: '',
        countryId: '',
        price: 0,
        episodeList: [],
        categories: [],
        persons: []
    });
    const [countries, setCountries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const countriesData = await getAllCountries();
                setCountries(countriesData);
                const categoriesData = await getAllCategories();
                setCategories(categoriesData);
                const personsData = await getAllPersons();
                setPersons(personsData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                // Xử lý lỗi khi không thể lấy dữ liệu ban đầu
            }
        };

        fetchInitialData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeCategories = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            categories: selectedOptions || [] // Đảm bảo formData.categories luôn là một mảng
        });
    };
    
    
    const handleChangePersons = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            persons: selectedOptions
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Kiểm tra xem countryId có được chọn không
        // if (!formData.countryId) {
        //     alert('Please select a country.');
        //     return;
        // }

        // Chuyển đổi dữ liệu form sang định dạng mong muốn
        const formattedData = {
            name: formData.name,
            movie_content: formData.description,
            episodes: formData.episodes,
            movie_schedule: formData.schedule,
            country_id: formData.countryId,
            star: 0, // Khởi tạo star
            price: formData.price,
            views: 0, // Khởi tạo views
            status: 1, // Mặc định status
            image: '', // Để trống hình ảnh ban đầu
            episodeList: [], // Để trống danh sách tập phim ban đầu
            categories: formData.categories.map(categoryId => ({ categoryId })),
            persons: formData.persons.map(personId => ({ personId }))
        };


        try {
            await addMovie(formattedData);
            alert('Movie added successfully!');
            setFormData({
                name: '',
                description: '',
                episodes: 0,
                schedule: '',
                countryId: '',
                price: 0,
                episodeList: [],
                categories: [],
                persons: []
            });
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Failed to add movie. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit} className="movie-form">
                {/* Các trường nhập thông tin */}
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Episodes:</label>
                    <input type="number" name="episodes" value={formData.episodes} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Schedule:</label>
                    <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <select name="countryId" value={formData.countryId} onChange={handleChange} required>
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>

                    
                    {/* Chọn danh sách thể loại phim */}
                <div className="form-group">
                    <label>Categories:</label>
                    <select multiple name="categories" defaultValue={formData.categories} onChange={handleChangeCategories}>
                        {categories.map(category => (
                            <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Chọn danh sách diễn viên */}
                <div className="form-group">
                    <label>Actors:</label>
                    <select multiple name="persons" defaultValue={formData.persons} onChange={handleChangePersons}>
                        {persons.map(person => (
                            <option key={person.personId} value={person.personId}>{person.name}</option>
                        ))}
                    </select>
                </div>

                {/* Nút submit */}
                <button type="submit" className="btn-submit">Add Movie</button>

            </form>
        </div>
    );
}

export default AddMovie;










// import React, { useState, useEffect } from 'react';
// import { addMovie, getAllCountries, getAllCategories } from '../../Utils/api'; // Import các hàm cần thiết từ file api.js

// function AddMovie() {
//     const [formData, setFormData] = useState({
//         name: '',
//         movieContent: '',
//         episodes: 1,
//         movieSchedule: 12,
//         image: '',
//         countryId: 1,
//         categories: [],
//     });
//     const [countries, setCountries] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const countriesData = await getAllCountries();
//                 setCountries(countriesData);
//             } catch (error) {
//                 console.error('Error fetching countries:', error);
//             }
//         };

//         const fetchCategories = async () => {
//             try {
//                 const categoriesData = await getAllCategories();
//                 setCategories(categoriesData);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCountries();
//         fetchCategories();
//     }, []);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleChangeCategories = (event) => {
//         const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
//         setFormData({ ...formData, categories: selectedOptions });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             await addMovie(formData);
//             alert('Movie added successfully!');
//             setFormData({
//                 name: '',
//                 movieContent: '',
//                 episodes: 1,
//                 movieSchedule: 12,
//                 image: '',
//                 countryId: 1,
//                 categories: [],
//             });
//         } catch (error) {
//             console.error('Error adding movie:', error);
//             alert('Failed to add movie. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Add New Movie</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Các trường nhập thông tin cho bộ phim */}
//                 <div className="form-group">
//                     <label>Name:</label>
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label>Content:</label>
//                     <textarea name="movieContent" value={formData.movieContent} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label>Episodes:</label>
//                     <input type="number" name="episodes" value={formData.episodes} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label>Schedule:</label>
//                     <input type="number" name="movieSchedule" value={formData.movieSchedule} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label>Image:</label>
//                     <input type="text" name="image" value={formData.image} onChange={handleChange} required />
//                 </div>
//                 {/* Hiển thị danh sách các danh mục phim */}
//                 <div className="form-group">
//                     <label>Categories:</label>
//                     <select multiple name="categories" value={formData.categories} onChange={handleChangeCategories}>
//                         {categories.map(category => (
//                             <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {/* Hiển thị danh sách các quốc gia */}
//                 <div className="form-group">
//                     <label>Country:</label>
//                     <select name="countryId" value={formData.countryId} onChange={handleChange}>
//                         {countries.map(country => (
//                             <option key={country.countryId} value={country.countryId}>{country.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <button type="submit">Add Movie</button>
//             </form>
//         </div>
//     );
// }

// export default AddMovie;

