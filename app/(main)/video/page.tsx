'use client';

import React, { useState } from 'react';

const VideoPage: React.FC = () => {
  const playlistId = "PLYitpHBq-8SXrpjOHu6nU60Uq6QQ6NpIH"; // Example Playlist ID

  // Example YouTube video IDs for the 4 smaller iframes
  const videoIds = [
    "-JhOFyw2WlI", // Video ID 1
    "2uBnkBZTX1E", // Video ID 2
    "EG9x0eevbV4", // Video ID 3
    "8YV8KmfBbBM"  // Video ID 4
  ];

  // State to manage the currently selected video
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Function to handle click on smaller video
  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Main Video (Selected or Playlist) */}
      <div className={`lg:w-3/4 transition-all duration-500 ${selectedVideo ? 'lg:w-1/2' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Watch the Playlist</h1>

        {/* Main Video Content */}
        <div className="aspect-w-16 aspect-h-9 mb-6">
          {/* Display selected video if any, otherwise show playlist */}
          <iframe
            width="100%"
            height="500"
            src={selectedVideo ? `https://www.youtube.com/embed/${selectedVideo}?autoplay=1` : `https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            frameBorder="0"
            allowFullScreen
            title={selectedVideo ? `YouTube Video ${selectedVideo}` : "YouTube Playlist"}
            className="rounded-lg shadow-md transition-all duration-500"
          ></iframe>
        </div>
      </div>

      {/* Side Videos (4 small videos) */}
      <div className={`lg:w-1/4 grid grid-cols-1 gap-6 transition-all duration-500 ${selectedVideo ? 'lg:w-1/2' : ''}`}>
        <h2 className="text-xl font-semibold mb-4">Other Language Videos</h2>
        {videoIds.map((videoId, index) => (
          <div
            key={index}
            className={`aspect-w-16 aspect-h-9 cursor-pointer transition-transform transform hover:scale-105 ${selectedVideo === videoId ? 'opacity-50' : ''}`}
            onClick={() => handleVideoClick(videoId)} // Click to zoom in
          >
            <iframe
              width="100%"
              height="100"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              title={`YouTube Video ${index + 1}`}
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
