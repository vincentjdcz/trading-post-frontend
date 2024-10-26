import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const ChooseCardModal = ({ setCardApiId, closeModal, selectCard }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null); // State for the selected card

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch card data");
      }
      const data = await response.json();
      setCardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardSelect = (cardId) => {
    console.log("Card selected");
    setCardApiId(cardId); // Call the function passed down from the parent component
    setSelectedCardId(cardId);
  };

  return (
    <>
      <p className="text-lg font-semibold">Search for card</p>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter card name"
          required
          style={{
            flex: 1,
            marginRight: "8px",
            border: "1px solid #ccc", // Always show a light gray border
            borderRadius: "4px", // Optional: Add some border-radius for rounded corners
            padding: "8px", // Optional: Add some padding for better appearance
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {cardData && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "16px",
            maxHeight: "200px", // Set a fixed height for the container
            overflowY: "auto", // Enable vertical scrolling
            border: "1px solid #ccc", // Optional: Add a border for visual clarity
            padding: "8px", // Optional: Add padding for aesthetics
          }}
        >
          {cardData.data.map((card) => (
            <div
              key={card.id}
              style={{ margin: "8px", cursor: "pointer", 
                border: selectedCardId === card.id
                  ? "4px solid blue" // Apply yellow border if card is selected
                  : "none", // No border if not selected 
                  }}
              onClick={() => handleCardSelect(card.id)}
            >
              <img
                src={card.images.small}
                alt={card.name}
                style={{ width: "100px" }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-1 justify-end">
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-fit h-fit"
          style={{ marginTop: "10px" }} // Add top margin directly here
        >
          Close
        </button>

        <button
          onClick={selectCard}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-fit h-fit"
          style={{ marginTop: "10px" }} // Add top margin directly here
        >
          Select
        </button>
      </div>
    </>
  );
};

// Add prop types for the component
ChooseCardModal.propTypes = {
  //onSelectCard: PropTypes.func.isRequired, // Validate onSelectCard as a required function
  setCardApiId: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectCard: PropTypes.func.isRequred,
};
export default ChooseCardModal;
