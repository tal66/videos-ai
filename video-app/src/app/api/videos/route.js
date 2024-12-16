import { getVideos } from '@/data/videos';

export async function GET() {
  try {
    const videos = await getVideos();
    return Response.json(videos);
  } catch (error) {
    return Response.json(
      { error: 'Failed to load videos' },
      { status: 500 }
    );
  }
}