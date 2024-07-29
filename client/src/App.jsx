import React from "react";
import Carousel from "./components/Carousel.jsx";
import Section1 from "./components/Section1.jsx";
import Section3 from "./components/Section3.jsx";
import ContactUs from "./components/Footer.jsx";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./components/ScheduleGenerate/Schedule.jsx";
import Newslet from "./components/Newslet/Newslet.jsx";

import FeedPost from "./components/feed/feed_posts/post_cards/FeedPost";
import Hot from "./components/feed/hot/Hot";
import CommunityPage from "./components/feed/community/CommunityPage";
import ProfilePage from "./components/profile/ProfilePage.jsx";

import TopicFeed from "./components/Topics/topics_list/TopicFeed";
import HotTopicsList from "./components/Topics/topics_list/HotTopicsList";
import AllTopics from "./components/Topics/topics_list/AllTopics";

import Lobby from "./screens/Lobby.jsx";
import Room from "./screens/Room.jsx";

import Root from "./routes/Root";
// import Error from "./routes/Error.jsx";
import Home from "./routes/Home";
import Topic from "./routes/Topic";
import Landing from "./components/Landing.jsx";
import Review from "./screens/Review.jsx";

import SlotBooking from "./components/slots/SlotBooking.jsx";
import Signin from "./components/authenticate/Signin.jsx";
import Signup from "./components/authenticate/Signup.jsx";
import Authenticate from "./routes/Authenticate.jsx";
import ConfigureLayout from "./components/Info/ConfigureLayout.jsx";
import CreatePostLayout from "./components/create-post/CreatePostLayout.jsx";
import AddCommunity from "./components/create-community/AddCommunity.jsx";
import CommunityDisplay from "./components/communities/CommunityDisplay.jsx";
import UserSlots from "./components/slots/UserSlots.jsx";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route path="" element={<Section1 />} />
            <Route path="/learn" element={<Carousel />} />
            <Route path="/about" element={<Section3 />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/authenticate" element={<Authenticate />}>
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>

          {currentUser && (
            <>
              <Route
                path="/configure-profile/:profId"
                element={<ConfigureLayout />}
              />
              <Route path="/home" element={<Root />}>
                <Route path="" element={<Home />}>
                  <Route path="" element={<FeedPost />} />
                  <Route path="hot" element={<Hot />} />
                  <Route path="communities" element={<CommunityPage />} />
                </Route>
                <Route path="lobby" element={<Lobby />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="newslet" element={<Newslet />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="user-slots" element={<UserSlots />} />
                <Route
                  path="create-post/:profId"
                  element={<CreatePostLayout />}
                />
                <Route path="create-community" element={<AddCommunity />} />
                <Route path="slot" element={<SlotBooking />} />
                <Route
                  path="community/:id"
                  element={<CommunityDisplay></CommunityDisplay>}
                />
              </Route>

              <Route path="/room/:roomId" element={<Room />} />
              <Route path="/room/review" element={<Review />} />

              <Route path="/topic" element={<Topic />}>
                <Route path="" element={<TopicFeed />} />
                {/* <Route path=":topicId" element={<TopicDetails />} /> */}
              </Route>
              <Route path="/topic/hot-topics" element={<HotTopicsList />} />
              <Route path="/topic/all-topics" element={<AllTopics />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;