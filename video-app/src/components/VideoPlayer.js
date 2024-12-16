'use client';

import {useState, useEffect} from 'react';
// import {Play, Pause, SkipForward, SkipBack, Clock, User} from 'lucide-react';

export default function VideoPlayer() {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [error, setError] = useState(null);
    const [showingTransition, setShowingTransition] = useState(false);

    useEffect(() => {
        async function loadVideos() {
            try {
                const response = await fetch('/api/videos');
                const data = await response.json();
                setVideos(data);
                if (data.length > 0) {
                    setCurrentVideo(data[0]);
                }
            } catch (err) {
                setError('Failed to load videos');
            }
        }

        loadVideos();
    }, []);

    const handleVideoEnd = () => {
        setShowingTransition(true);
        setTimeout(() => {
            const currentIndex = videos.findIndex(v => v.id === currentVideo.id);
            if (currentIndex < videos.length - 1) {
                setCurrentVideo(videos[currentIndex + 1]);
            }
            setShowingTransition(false);
        }, 2000);
    };

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-6 bg-white rounded-lg shadow-lg">
            {/* Main video section - 2/3 space */}
            <div className="col-span-2">
                {currentVideo && (
                    <>
                        <div className="relative aspect-video bg-black m-6">
                            <video
                                key={currentVideo.url}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                onEnded={handleVideoEnd}
                                src={currentVideo.url}
                            />
                            {showingTransition && (
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="text-white text-xl">Moving to next video...</div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t">
                            <h2 className="text-xl font-semibold mb-2">{currentVideo.title}</h2>
                            <p className="text-gray-600 mb-4 whitespace-pre-line">
                                {currentVideo.description}
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Playlist section - 1/3 space */}
            <div className="border-l">
                <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">Up Next</h3>
                    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto overscroll-contain pr-2">
                        {videos.map((video) => (
                            <button
                                key={video.id}
                                onClick={() => setCurrentVideo(video)}
                                className={`w-full text-left p-4 rounded transition-all duration-200 ${
                                    currentVideo?.id === video.id
                                        ? 'bg-blue-50 border border-blue-200'
                                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <h4 className="font-medium mb-1">{video.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {video.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}