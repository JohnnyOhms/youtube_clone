import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { Avatar, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoSection from "../video section/VideoSection";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { videoAPI } from "../../slice/getAPIslice";
import { RelatedVideoAPI } from "../../slice/getRelatedVideo";
import { videoResult } from "../../utils/types";
import Loader from "../loader/Loader";
import ErrorMssg from "../error/errorMssg";

const VideoChannel = () => {
  const UNCHANGED: string = "UNCHANGED";
  useEffect(() => {
    alert("If page returns Blank, Please fresh to load Content 😪");
  }, [UNCHANGED]);
  const { channelId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(videoAPI(`channels?part=snippet&id=${channelId}`));
    // channel videos
    dispatch(
      RelatedVideoAPI(
        `search?part=snippet,id&channelId=${channelId}&order=date`
      )
    );
  }, [dispatch]);

  const channelDetails: videoResult<null> = useAppSelector(
    (state) => state.video.videoResult
  );
  const loading = useAppSelector((state) => state.video.loading);
  const error = useAppSelector((state) => state.video.erroMssg);

  const channelVideo: videoResult<null> | undefined = useAppSelector(
    (state) => state.relatedVideo.videoResult
  );
  const loadingRelated: Boolean | undefined = useAppSelector(
    (state) => state.relatedVideo.loading
  );
  const errorRelated: Boolean | undefined = useAppSelector(
    (state) => state.relatedVideo.erroMssg
  );

  let channel_Video: videoResult<null> | undefined;
  let error_Related: Boolean | undefined;
  let loading_Related: Boolean | undefined;

  type details = string | undefined;

  type Details = {
    title: details;
    customUrl: details;
    banner: details;
    imgUrl: details;
    viewCount: details;
    subscribers: details;
  };
  const [details, setDetails] = useState<Details>({
    title: "",
    customUrl: "",
    banner: "",
    imgUrl: "",
    viewCount: "",
    subscribers: "",
  });

  let displayChannel: JSX.Element;

  useEffect(() => {
    if (channelDetails !== null && channelDetails.length >= 1) {
      setDetails({
        title:
          channelDetails[0].snippet.localized?.title !== undefined
            ? channelDetails[0].snippet.localized?.title
            : "Title",
        customUrl:
          channelDetails[0].snippet.customUrl !== undefined
            ? channelDetails[0].snippet.customUrl
            : "@name",
        viewCount:
          channelDetails[0].statistics.viewCount !== undefined
            ? channelDetails[0].statistics.viewCount
            : "channel views",
        subscribers:
          channelDetails[0].statistics.subscriberCount !== undefined
            ? channelDetails[0].statistics.subscriberCount
            : "Subscribers",
        // banner: channelDetails[0].brandingSettings.image.bannerExternalUrl,
        banner: "",
        imgUrl:
          channelDetails[0].snippet.thumbnails.high.url !== undefined
            ? channelDetails[0].snippet.thumbnails.high.url
            : "C",
      });
    }
  }, [channelDetails]);

  const { title, customUrl, viewCount, subscribers, banner, imgUrl } = details;
  const ShowChannelDetails: JSX.Element = (
    <Box
      // minHeight="95vh"
      sx={{
        marginTop: "-5vh",
        marginLeft: { sm: 0, md: 0, lg: "30vh" },
      }}
    >
      <Box>
        <div
          style={{
            height: "200px",
            background:
              //  `url(${ banner })`
              " linear-gradient(to right top, #052737, #0e4961, #146f8e, #1697bc, #12c2eb)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </Box>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            margin: { sm: "10px", lg: "20px" },
          }}
        >
          <Avatar src={imgUrl} />
          <Stack sx={{ marginTop: "5px" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              {title} <CheckCircleIcon sx={{ fontSize: 10 }} />
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "13px", cursor: "pointer" }}
            >
              {customUrl}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "13px", cursor: "pointer" }}
            >
              {/* {parseInt(viewCount).toLocaleString("e-US") } */}
              {viewCount} views
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            color: "grey",
            fontSize: "15px",
            margin: { sm: "10px", lg: "1.5rem" },
          }}
        >
          {/* {parseInt(subscribers).toLocaleString("e-US")} */}
          {subscribers} subscribers
        </Typography>
      </Stack>
    </Box>
  );

  if (loading) {
    displayChannel = <Loader />;
  } else {
    if (error) {
      displayChannel = <ErrorMssg />;
    } else {
      displayChannel = ShowChannelDetails;

      channel_Video = channelVideo;
      error_Related = errorRelated;
      loading_Related = loadingRelated;
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <SideBar />
      {displayChannel}
      <VideoSection
        videos={channel_Video}
        error={error_Related}
        loading={loading_Related}
      />
    </React.Fragment>
  );
};

export default VideoChannel;
