import React, { lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./component/main/main";
import NotFoundPage from "./component/notFoundPage/NotFoundPage";
import LazyLoad from "./component/loader/LazyLoad";
import Context from "./context/context";
import ContextSideBar from "./context/toggleSideBar";
import PlayList from "./component/PlayList/PlayList";
import Register from "./component/auth/register";
import Login from "./component/auth/login";
import ForgetPassword from "./component/auth/forgetPassword";
import ResetPassword from "./component/auth/resetPassword";
import AuthContext from "./context/authContext";
import SearchFeed from "./component/searchfeed/SearchFeed";
import ProtectedRoute from "./component/protected/protectedRoute";
const PlayVideo = lazy(() => import("./component/playVideo/PlayVideo"));
const VideoChannel = lazy(
  () => import("./component/Video channel/VideoChannel")
);
const Saved = lazy(() => import("./component/sideBarVideos/Saved"));

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#151414",
      },
      secondary: {
        main: "#d88507",
      },
    },
  });

  return (
    <>
      <AuthContext>
        <Context>
          <ContextSideBar>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route
                    path="/video/:videoId"
                    element={
                      <Suspense fallback={<LazyLoad />}>
                        <PlayVideo />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/channel/:channelId"
                    element={
                      <Suspense fallback={<LazyLoad />}>
                          <VideoChannel />
                      </Suspense>
                    }
                  />
                  <Route path="/search" element={<SearchFeed />} />
                  <Route
                    path="/saved_videos"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LazyLoad />}>
                          <Saved />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/playList" element={<PlayList />} />
                  <Route path="/auth/register" element={<Register />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route
                    path="/auth/forgot-password"
                    element={<ForgetPassword />}
                  />
                  <Route
                    path="/auth/reset-password/:_id/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </ThemeProvider>
          </ContextSideBar>
        </Context>
      </AuthContext>
    </>
  );
}

export default App;
