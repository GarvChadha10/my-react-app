import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Subscriptions from './Subscriptions';
import Shorts from './Shorts';
import You from './You';
import History from './History';
import VideoPlayer from './VideoPlayer'; 
import SearchPage from './SearchPage';
import SignInPage from './SignInPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path= "/" element={<Home />} />
        <Route path="/YoutubeHomePage/Subscriptions" element={<Subscriptions />} />
        <Route path="/YoutubeHomePage/Shorts" element={<Shorts />} />
        <Route path="/YoutubeHomePage/You" element={<You />} />
        <Route path="/YoutubeHomePage/History" element={<History />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} /> 
        <Route path="/YoutubeHomePage/SearchPage" element = {<SearchPage />} />
        <Route path="/YoutubeHomePage/SignInPage" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

