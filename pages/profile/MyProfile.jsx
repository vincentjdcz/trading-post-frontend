import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import MyPosts from "../../src/components/post/MyPosts";
import Modal from "react-modal";
import { uploadProfilePictureSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import MyTrades from "../../src/components/trade/MyTrades";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userProfilePicture = useSelector((state) => state.auth.profilePicture);
  const userName = useSelector((state) => state.auth.userName);
  const [selected, setSelected] = useState(0); // 0 for "Posts", 1 for "Trades"
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] =
    useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const dev = false; //whether or not in dev mode - for testing
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  console.log("userID: ", userId);
 // Redirect to login if userId is null
 useEffect(() => {
  if (userId === null) {
    navigate("/login");
  }
}, [userId, navigate]);
  const closeModal = () => {
    setIsProfilePictureModalOpen(false);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfilePicture(reader.result); // Set the Base64 string as the image source
        console.log("ProfilePicture: ", reader.result);
        console.log("UserId: ", userId )
        try {
          const response = await fetch(
            dev
          ? "http://localhost:3000/api/user/uploadProfilePicture"
          : "https://trading-post-backend-production.up.railway.app/api/user/uploadProfilePicture",
          {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              userId,
              profilePicture
            })
          }
          )

          const data = await response.json();
          if (!response.ok) {
            const errorData = data;
            console.log(errorData.message);
    
            throw new Error(errorData.message || "Signup failed");
          }
          console.log("data", data);
          //await new Promise(resolve => setTimeout(resolve, 20000));
          
          dispatch(uploadProfilePictureSuccess({ profilePicture: data.user.profilePicture }));
          console.log("new profile pic, ", userProfilePicture )
          //test
          //await new Promise(resolve => setTimeout(resolve, 20000));
        } catch (error) {
          console.error("Upload profile picture error: ", error);
          
        }
        closeModal();
      };
      reader.readAsDataURL(file); // Convert the file to Base64 string
    }
  };

  return (
    <div>
      <div className="md:p-2 flex flex-col items-center sm:flex-row h-fit gap-4">
        <button
          className="bg-transparent p-0"
          onClick={() => setIsProfilePictureModalOpen(true)}
        >
          {userProfilePicture ? <img className="w-16 h-16 rounded-full" src={userProfilePicture} /> : 
          <HiUser className="w-16 h-16 text-white bg-gray-500 rounded-full p-1" />}
        </button>
        <div className="flex flex-col justify-start items-center sm:items-start">
          <p className="font-bold md:text-lg">@{userName}</p>
          <div className="flex justify-start items-center gap-2">
            <div className="flex gap-1">
              <p className="font-semibold">4</p>
              <p>Posts</p>
            </div>

            <div className="flex gap-1">
              <p className="font-semibold">2</p>
              <p>Trades</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-2 w-screen -ml-4" />

      {/*
    <div className="w-full max-w-md mx-auto m-0">
      <Tab.Group className="w-full" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex border-b w-full">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `p-2 mx-2 w-[50vw] text-gray-600 outline-none bg-transparent rounded-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 hover:border-0 active:outline-none ${
                  selected ? "border-b-2 border-b-black " : ""
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab, index) => (
            <Tab.Panel key={index} className="p-4">
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>

*/}

      <div className="flex mb-6">
        <button
          onClick={() => setSelected(0)}
          className={`bg-transparent w-[50vw] rounded-none active:outline-0 hover:outline-0 focus:outline-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
            selected === 0 ? "border-b-2 border-b-black" : ""
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setSelected(1)}
          className={`bg-transparent w-[50vw] rounded-none active:outline-0 hover:outline-0 focus:outline-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
            selected === 1 ? "border-b-2 border-b-black" : ""
          }`}
        >
          Trades
        </button>
      </div>

      {selected === 0 ? <MyPosts /> : <MyTrades />}

      <Modal
        isOpen={isProfilePictureModalOpen}
        onRequestClose={closeModal}
        contentLabel="Choose Card Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: semi-transparent background
          },
          content: {
            marginTop: "100px", // Add top margin
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            right: "auto", // Reset default values
            bottom: "auto",
            transform: "translate(-50%, -50%)", // Adjust for centering
            padding: "20px", // Optional: padding inside modal
            width: "fit-content", // Set an explicit width
            borderRadius: "8px", // Optional: rounded corners
          },
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div>
            <p>New Profile Picture</p>
          </div>
          <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default MyProfile;
