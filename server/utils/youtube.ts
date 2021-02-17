import ytdl from "ytdl-core";
import { InfoResponse } from "../../types";

export const isValidURL = (str: string): boolean => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
};

export const formatVideoData = (data: ytdl.videoInfo) => {
  const { videoDetails, formats } = data;
  let resonseFormatted: InfoResponse = {
    title: videoDetails.title,
    description: videoDetails.description,
    length: videoDetails.lengthSeconds,
    url: videoDetails.video_url,
    author: {
      name: videoDetails.author.name,
      url: videoDetails.ownerProfileUrl || videoDetails.author.user_url,
      thumbnails: videoDetails.author.thumbnails?.map((thumb) => thumb.url),
    },
    viewers: videoDetails.viewCount,
    likes: videoDetails.likes,
    dislikes: videoDetails.dislikes,
    thumbnails: videoDetails.thumbnails.map((thumb) => thumb.url),
    formats: formats.map((format) => {
      const type = format.mimeType
        ? format.mimeType.startsWith("video")
          ? "video"
          : format.mimeType.startsWith("audio")
          ? "audio"
          : undefined
        : undefined;
      return {
        ...format,
        type,
        itag: format.itag,
        hasVidoe: format.hasVideo,
        hasAudio: format.hasAudio,
        mimeType: format.mimeType,
        quality: format.qualityLabel,
        audioQuality: format.audioQuality,
        url: format.url,
      };
    }),
  };
  return resonseFormatted;
};
