import {readdir} from 'fs/promises';
import {join} from 'path';

// metadata
const videoInfo = {
    "Feeling Good.mp4": {
        title: "Muse, Feeling Good",
        description: `Fish in the sea
You know how I feel
River running free
You know how I feel
Blossom in the trees`,
        duration: "0:05",
        priority: 1
    },
    "By The Way.mp4": {
        title: "Red Hot Chili Peppers, By The Way",
        description: `Standing in line to see the show tonight
And there's a light on, heavy glow
By the way, I tried to say
I'd be there, waiting for`,
        duration: "0:05",
        priority: 2
    },
    "Burn It Down.mp4": {
        title: "Linkin Park, Burn It Down",
        description: `The colors conflicted
As the flames climbed into the clouds
I wanted to fix this
But couldn't stop from tearing it down`,
        duration: "0:05"
    },
    "Dont Go Away.mp4": {
        title: "Oasis, Don’t Go Away",
        description: `Cold and frosty morning, there's not a lot to say
About the things caught in my mind
And as the day was dawning, my plane flew away
With all the things caught in my mind`,
        duration: "0:05"
    },
    "Every Teardrop.mp4": {
        title: "Coldplay, Every Teardrop Is a Waterfall",
        description: `I turn the music up, I got my records on
I shut the world outside until the lights come on
Maybe the streets alight, maybe the trees are gone
I feel my heart start beatin' to my favorite song`,
        duration: "0:05",
        priority: 3
    }
};

export async function getVideos() {
    try {
        const videosDir = join(process.cwd(), 'public', 'videos');
        const files = await readdir(videosDir);

        return files
            .filter(file => file.endsWith('.mp4'))
            .map(filename => {
                const info = videoInfo[filename] || {
                    title: filename.replace('.mp4', '').split('-').map(
                        word => word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' '),
                    description: 'No description available.'
                };

                return {
                    id: filename.replace('.mp4', ''),
                    filename,
                    url: `/videos/${filename}`,
                    ...info
                };
            }).sort((a, b) => (a.priority || 100) - (b.priority || 100));

    } catch (error) {
        console.error('Error reading videos:', error);
        return [];
    }
}