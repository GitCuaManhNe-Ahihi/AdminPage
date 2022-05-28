import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext, useEffect } from "react";
import AdminPage from "./components/AdminPage";
import EditArtileModal from "./components/UI/Modal/ChangeArticle/EditArtileModal";
import DetailArticleModal from "./components/UI/Modal/DetailArticle/DetailArticleModal";
import InformationModal from "./components/UI/Modal/Info/InformationModal";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Allpost from "./components/Allpost/Allpost";
import Post from "./components/Post/Post";
import YourPost from "./components/Yourpost/YourPost";
import Chat from "./components/Chat/Chat";
import Validatepost from "./components/Validatedpost/Validatepost";
import Member from "./components/Member/Member";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMember from "./components/UI/Modal/AddMember/AddMember";
import InforMember from "./components/UI/Modal/Info/InforMember";
import ChangePassword from "./components/UI/Modal/Login/ChangePassword";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<AdminPage></AdminPage>}>
          <Route path="statistical" element={<Home></Home>}></Route>
          <Route path="allpost" element={<Allpost></Allpost>}></Route>
          <Route path="post" element={<Post></Post>}></Route>
          <Route path="yourarticle" element={<YourPost></YourPost>}></Route>
          <Route path="chat" element={<Chat></Chat>}></Route>
          <Route path="member" element={<Member></Member>}></Route>
          <Route
            path="browse_articles"
            element={<Validatepost></Validatepost>}
          ></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <InformationModal />
      <EditArtileModal />
      <DetailArticleModal />
      <AddMember></AddMember>
      <InforMember></InforMember>
      <ChangePassword></ChangePassword>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
