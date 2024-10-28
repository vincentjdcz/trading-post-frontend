import { useState } from "react";
import Modal from "react-modal";
import ChooseCardModal from "../../src/components/modal/ChooseCardModal";
import CardFillerSkeleton from "../../src/components/skeleton/CardFillerSkeleton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePosts = () => {
  // State to hold form inputs
  const [cardApiId, setCardApiId] = useState("");
  const [cardFrontPicture, setCardFrontPicture] = useState(null);
  const [cardBackPicture, setCardBackPicture] = useState("");
  const [wants, setWants] = useState([]);
  const [wantsImgs, setWantsImgs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [cardApiSmallImage, setCardApiSmallImage] = useState("");
  const [wantsModalIsOpen, setWantsModalIsOpen] = useState(false);
  const [cardWantApiId, setCardWantApiId] = useState("");

  const fetchCardImg = async (cardApiId) => {
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards/${cardApiId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-Api-Key': "process.env.REACT_APP_API_KEY"
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch card data");
      }
      const cardData = await response.json();
      const smallImageUrl = cardData.data.images.small; // Access the small image URL
      console.log("Small Image URL:", smallImageUrl);
      //setCardApiSmallImage(smallImageUrl);
      return smallImageUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const testSetCardApiId = (CardApiId) => {
    console.log("testsetcardapiid");
    setCardApiId(CardApiId);
    console.log("CardApiId: ", cardApiId);
  };

  const handleFileChangeCardFront = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardFrontPicture(reader.result); // Set the Base64 string as the image source
      };
      reader.readAsDataURL(file); // Convert the file to Base64 string
    }
  };

  const handleFileChangeCardBack = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardBackPicture(reader.result); // Set the Base64 string as the image source
      };
      reader.readAsDataURL(file); // Convert the file to Base64 string
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (cardApiId === "") {
        throw new Error("No card selected");
      }

      const postData = {
        cardApiId,
        cardFrontPicture,
        cardBackPicture,
        wants,
      };

      // Convert post data to JSON string
      const jsonString = JSON.stringify(postData);

      // Calculate the size in bytes
      const sizeInBytes = new Blob([jsonString]).size;

      console.log(`Payload size: ${sizeInBytes} bytes`);

      // You can also show a warning if it's too large
      if (sizeInBytes > 16000000) {
        // 16MB limit
        throw new Error("Payload size exceeds MongoDB document limit");
      }

      console.log("ABOUT TO CREATE POST, WANTS IMAGES: ");
      console.log(wantsImgs)

      //trading-post-backend-production.up.railway.app
      //http://localhost:3000
      const response = await fetch(
        "https://trading-post-backend-production.up.railway.app/api/post/createPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardApiId,
            cardFrontPicture,
            cardBackPicture,
            wants,
            wantsImgs
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      if (data) {
        toast.success("Post created successfully!");
        setTimeout(() => {
          navigate("/my-posts");
        }, 3000)
      }
      // Optionally redirect or update state after successful creation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open and close modal functions
  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setCardApiId("");
    setModalIsOpen(false);
    console.log("Selected Card: ", cardApiId);
  };

  const openWantsModal = () => setWantsModalIsOpen(true);
  const closeWantsModal = () => {
    setCardWantApiId("");
    setWantsModalIsOpen(false);
  };

  const selectCard = async () => {
    setModalIsOpen(false);
    const smallImageUrl = await fetchCardImg(cardApiId);
    setCardApiSmallImage(smallImageUrl);
    console.log("Selected Card: ", cardApiId);
  };

  const addToWants = async () => {
    setWants(prevWants => [...prevWants, cardWantApiId]);
    const wantsImg = await fetchCardImg(cardWantApiId);
    console.log("wantsImg ", wantsImg);
    console.log("wantsimgs before");
    console.log(wantsImgs);
    setWantsImgs(prevWantsImgs => [...prevWantsImgs, wantsImg]);
    console.log("wantsimgs after");
    console.log(wantsImgs);
    setWantsModalIsOpen(false);
  };

  return (
    <div className="h-full w-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <p className="text-lg font-semibold">Create Post</p>
      {cardApiSmallImage === "" ? (
        <CardFillerSkeleton />
      ) : (
        <img
          className="mt-4"
          style={{ width: "150px" }}
          src={cardApiSmallImage}
        />
      )}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded h-fit mt-4"
      >
        Choose Card
      </button>

      {/* Modal for choosing a card */}
      <Modal
        isOpen={modalIsOpen}
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
            width: "60%", // Set an explicit width
            borderRadius: "8px", // Optional: rounded corners
          },
        }}
      >
        <ChooseCardModal
          setCardApiId={testSetCardApiId}
          closeModal={closeModal}
          selectCard={selectCard}
        />
      </Modal>

      {/* Modal for choosing a card for wants*/}
      <Modal
        isOpen={wantsModalIsOpen}
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
            width: "60%", // Set an explicit width
            borderRadius: "8px", // Optional: rounded corners
          },
        }}
      >
        WANTS MODAL
        <ChooseCardModal
          setCardApiId={setCardWantApiId}
          closeModal={closeWantsModal}
          selectCard={addToWants}
        />
      </Modal>
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <div className="mt-4" style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="">
              <div>
                <label>Card Front Picture URL:</label>
              </div>
              {cardFrontPicture === null ? (
                <CardFillerSkeleton />
              ) : (
                <div className="w-[150px] max-w-[150px]">
                  <img style={{ width: "150px" }} src={cardFrontPicture} />
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChangeCardFront}
                  required
                  id="upload-button"
                />
              </div>
            </div>
            <div>
              <div>
                <label>Card Back Picture URL:</label>
              </div>
              {cardFrontPicture === null ? (
                <CardFillerSkeleton />
              ) : (
                <div className="w-[150px] max-w-[150px]">
                  <img style={{ width: "150px" }} src={cardBackPicture} />
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChangeCardBack}
                  required
                  id="upload-button"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label>Wants:</label>
            <div style={{ display: "flex", flexWrap: "wrap", width: "475px" }}>
              {wants.length === 0 ? (
                <CardFillerSkeleton />
              ) : (
                wantsImgs.map((wantImg, idx) => {
                  return (
                    <img
                      key={idx}
                      src={wantImg}
                      style={{ width: "150px", margin: "4px" }}
                    />
                  );
                })
              )}
            </div>

            <button
              type="button"
              onClick={openWantsModal}
              className="bg-blue-500 text-white px-4 py-2 rounded h-fit mt-4"
            >
              Add
            </button>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded h-fit mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default CreatePosts;
