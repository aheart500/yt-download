import ytdl from "ytdl-core";
export interface CustomFormat extends ytdl.videoFormat {
  type: "video" | "audio";
  itag: number;
  hasVidoe: boolean;
  hasAudio: boolean;
  mimeType: string;
  quality:
    | "144p"
    | "144p 15fps"
    | "144p60 HDR"
    | "240p"
    | "240p60 HDR"
    | "270p"
    | "360p"
    | "360p60 HDR"
    | "480p"
    | "480p60 HDR"
    | "720p"
    | "720p60"
    | "720p60 HDR"
    | "1080p"
    | "1080p60"
    | "1080p60 HDR"
    | "1440p"
    | "1440p60"
    | "1440p60 HDR"
    | "2160p"
    | "2160p60"
    | "2160p60 HDR"
    | "4320p"
    | "4320p60";
  audioQuality: "AUDIO_QUALITY_LOW" | "AUDIO_QUALITY_MEDIUM";
  url: string;
}

export interface InfoResponse {
  title: string;
  description: string;
  length: string;
  author: {
    name: string;
    url: string;
    thumbnails: string[];
  };
  viewers: string;
  likes: number;
  dislikes: number;
  thumbnails: string[];
  formats: CustomFormat[];
  url: string;
}
export interface VideoInfo extends ytdl.videoInfo {}
