import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router to navigate between pages

interface VideoSidebarProps {
  videos: Array<{ id: number; title: string; thumbnailUrl: string }>;
}

const VideoSidebar: React.FC<VideoSidebarProps> = ({ videos }) => {
  return (
    <div className="w-1/4 p-4 bg-gray-800 text-white">
      <h2 className="text-xl font-semibold mb-4">Video List</h2>
      <div className="space-y-4">
        {videos.map((video) => (
          <Link key={video.id} to={`/video/${video.id}`} className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md">
            <img src={video.thumbnailUrl} alt={video.title} className="w-16 h-16 object-cover rounded-md" />
            <span>{video.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoSidebar;
