import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { InfoResponse, CustomFormat, VideoInfo } from "../types";

export default function Facebook() {
  const [facebookLink, setFacebookLink] = useState("");
  const [vidData, setVidData] = useState(null);
  const getVideoDate = (e) => {
    e.preventDefault();
    axios
      .get("/api/facebook/meta?videolink=" + facebookLink)
      .then((res) => {
        setVidData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Downloader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={getVideoDate}>
        <input type="text" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />
        <button type="submit">Download Video</button>
      </form>
      {vidData && (
        <>
          <a href={vidData.sdLink} download="vid.mp4">
            Download sd
          </a>
          <a href={vidData.hdLink} download="vid.mp4">
            Download hd
          </a>
          <img src={vidData.picLink} />
          <p>{vidData.duration}</p>
        </>
      )}
    </div>
  );
}
