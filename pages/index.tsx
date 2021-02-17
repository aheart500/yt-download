import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import { InfoResponse, CustomFormat, VideoInfo } from "../types";

export default function Home() {
  const [ytLink, setYtLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState();
  const [videoData, setVideoData] = useState<{
    formattedResponse: InfoResponse;
    ytdlResponse: VideoInfo;
  } | null>(null);
  const videoRef = useRef(null);

  const getInfo = () => {
    setLoading(true);
    setVideoData(null);
    if (ytLink) {
      axios
        .get("/api/youtube/meta?videolink=" + ytLink)
        .then(({ data }) => {
          setVideoData(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  };

  const download = (format: CustomFormat) => {
    axios
      .get(`/api/youtube/download?yt_link=${videoData.formattedResponse.url}&itag=${format.itag}`)
      .then((res) => {
        console.log(res.data);
        if (videoRef && res.data) {
          videoRef.current.srcObject = new MediaStream(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Downloader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <video ref={videoRef} controls></video>
      <div>
        <input type="text" value={ytLink} onChange={(e) => setYtLink(e.target.value)} />
        <button onClick={getInfo}>See Info</button>
      </div>
      {loading && <h1>Loading.....</h1>}
      {videoData && videoData.formattedResponse && (
        <div>
          <h1>{videoData.formattedResponse.title}</h1>
          <p>{videoData.formattedResponse.description}</p>
          <h2>Author: {videoData.formattedResponse.author.name}</h2>
          <img
            src={
              videoData.formattedResponse.thumbnails[
                videoData.formattedResponse.thumbnails.length > 0
                  ? videoData.formattedResponse.thumbnails.length - 1
                  : 0
              ]
            }
            alt="thumbnail"
          />
          {videoData.formattedResponse.formats.map((format, index) => {
            return (
              <div key={index}>
                <h3>{format.type}</h3>
                <p>{format.mimeType}</p>
                {format.url && (
                  <div>
                    {format.type === "video" && <video src={format.url} controls />}
                    {format.type === "audio" && <audio src={format.url} controls />}
                  </div>
                )}
                <a
                  href={`/api/youtube/download?yt_link=${videoData.formattedResponse.url}&itag=${format.itag}`}
                  download={`${videoData.formattedResponse.title}.${
                    format.type === "audio" ? "mp3" : "mp4"
                  }`}
                >
                  Download link
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
