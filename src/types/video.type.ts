export default interface Video {
  // Define the structure of video data here if known
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: string;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
}
