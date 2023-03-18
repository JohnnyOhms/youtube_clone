import { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Axios } from "../../utils/axiosInstance";
import { ContextAPI } from "../../context/context";

const SavedVideo = ({ channel, title, createdAt, _id, thumbnail, videoId }) => {
  const navigate = useNavigate();
  const { singleDel, setSingleDel, savedVideos, setSavedVideos, setDisplay } =
    useContext(ContextAPI);

  const handleClick = () => {
    navigate(`/video/${videoId}`);
  };

  const refreshList = () => {
    setDisplay(false);
    Axios.get("/videos")
      .then((res) => {
        setSavedVideos(res.data.videos);
      })
      .catch((err) => {
        alert("failed to load, refreash page");
        navigate("/");
      });
  };

  const handleDelete = () => {
    Axios.post(`/videos/single-delete`, {
      _id,
    })
      .then((res) => {
        alert(res.data.videos._id + " deleted");
        refreshList();
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="grid-layout-sideBar">
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          height: 240,
          maxHeight: { xs: 170, sm: 300, md: 400 },
          backgroundColor: "inherit",
          display: "flex",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={thumbnail}
          alt="video alt"
          sx={{
            borderRadius: "1rem",
            cursor: "pointer",
            background: "grey",
            width: { xs: "10rem", sm: 700, md: 700 },
            minWidth: "10rem",
          }}
          onClick={handleClick}
        />

        <CardActions disableSpacing sx={{ padding: 0 }}>
          <Stack
            sx={{
              margin: "10px",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontSize: { xs: "10px", sm: "15px", md: "15px" },
                marginTop: "5px",
              }}
            >
              {title}
            </Typography>

            <div style={{ display: "flex" }}>
              <Avatar sx={{ ml: "5px", marginRight: "8px" }} src={thumbnail} />
              <Typography
                variant="body2"
                sx={{
                  color: "grey",
                  fontSize: { xs: "9px", sm: "10px", md: "12px" },
                  py: 1,
                }}
              >
                {channel} <CheckCircleIcon sx={{ fontSize: 10 }} />
              </Typography>
            </div>

            <Typography
              variant="body2"
              sx={{
                color: "grey",
                fontSize: { xs: "9px", sm: "10px", md: "12px" },
                ml: 1,
              }}
            >
              {new Date(createdAt).toDateString()}
            </Typography>

            <Typography
              sx={{
                color: "#df3434",
                ml: 1,
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={handleDelete}
            >
              <DeleteForeverIcon sx={{ fontSize: "34px" }} />
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default SavedVideo;
