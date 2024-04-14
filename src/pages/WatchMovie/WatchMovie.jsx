import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const WatchMovie = () => {
  const { movieId } = useParams();
  const [selectedEpisode, setSelectedEpisode] = useState(1); // State để lưu số tập đang được chọn

  // Hàm xử lý khi chọn số tập
  const handleEpisodeChange = (event) => {
    setSelectedEpisode(parseInt(event.target.value)); // Chuyển đổi giá trị từ string sang number và lưu vào state
  };

  return (
    <div>
    <div>
        <Header/>
    
      <h2>Watch Movie</h2>
    
      {/* <div>
        <h3>Episode {selectedEpisode}</h3>
     
        <video controls>
          <source src={`url-to-your-video/${selectedEpisode}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
   
      <div>
        <label htmlFor="episode-select">Select Episode:</label>
        <select id="episode-select" value={selectedEpisode} onChange={handleEpisodeChange}>

          {[...Array(numberOfEpisodes).keys()].map(ep => (
            <option key={ep + 1} value={ep + 1}>Episode {ep + 1}</option>
          ))}
        </select>
      </div> */}
      
    </div>

      <Footer/>
    </div>
  );
};

export default WatchMovie;
