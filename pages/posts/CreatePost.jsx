import { useState } from "react";
import Modal from "react-modal";
import ChooseCardModal from "../../src/components/modal/ChooseCardModal";

const CreatePosts = () => {
  // State to hold form inputs
  const [cardApiId, setCardApiId] = useState("");
  const [cardFrontPicture, setCardFrontPicture] = useState("");
  const [cardBackPicture, setCardBackPicture] = useState("");
  const [wants, setWants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [cardApiSmallImage, setCardApiSmallImage] = useState("");

  const fetchCardImg = async (cardApiId) => {
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards/${cardApiId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch card data");
      }
      const cardData = await response.json();
      const smallImageUrl = cardData.data.images.small; // Access the small image URL
      console.log("Small Image URL:", smallImageUrl);
      setCardApiSmallImage(smallImageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const testSetCardApiId = (CardApiId) => {
    console.log("testsetcardapiid");
    setCardApiId(CardApiId);
    console.log("CardApiId: ", cardApiId);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/post/createPost",
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created:", data);
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
  const selectCard = () => {
    setModalIsOpen(false);
    fetchCardImg(cardApiId);
    console.log("Selected Card: ", cardApiId);
  };

  return (
    <div className="h-full w-full">
      <p className="text-lg font-semibold">Create Post</p>
      {cardApiSmallImage === "" ? null : (
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Card API ID:
            <input
              type="text"
              value={cardApiId}
              onChange={(e) => setCardApiId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Card Front Picture URL:
          

          </label>
          <input
              type="file"
              accept="image/*"
              onChange={(e) => setCardFrontPicture(e.target.files[0])}
              required
              className="hidden" // Hide the file input
              id="upload-button"
            />
        </div>
        <div>
          <label>
            Card Back Picture URL:
            <input
              type="text"
              value={cardBackPicture}
              onChange={(e) => setCardBackPicture(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Wants (comma-separated):
            <input
              type="text"
              onChange={(e) => setWants(e.target.value.split(","))}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default CreatePosts;
