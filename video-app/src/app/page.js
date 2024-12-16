import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
    return (
        <main className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Video Player</h2>
                <h4 className="rounded-lg mb-4">
                    Videos generated by Sora.
                    The description shows the lyrics used for the prompt.
                </h4>
                <VideoPlayer/>
            </div>
        </main>
    );
}