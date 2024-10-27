import PropTypes from "prop-types";

const Post = ({ postId, cardFrontPicture, wantsImgs }) => {
  console.log("IN POST.JSX");
  console.log(wantsImgs);

  /*
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
*/
  return (
    <div
      key={postId}
      style={{
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
        padding: "10px", // Padding inside the div
        backgroundColor: "white", // Optional: set background color
        width: "175px",
      }}
    >
      <p className="font-semibold text-lg">For Trade</p>
      <img
        className="mt-4"
        src={cardFrontPicture}
        style={{ width: "150px", height: "205px", objectFit: "cover" }}
      />
      <div className="mt-4">
        <p className="font-semibold text-lg">Wants</p>
        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            overflowX: "auto",
            width: "100%",
            gap: "1rem", // Adjust the gap size as needed
          }}
        >
          {wantsImgs.map((wantImg, idx) => (
            <img
              key={idx}
              src={wantImg}
              style={{ width: "70px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  //onSelectCard: PropTypes.func.isRequired, // Validate onSelectCard as a required function
  postId: PropTypes.string.isRequired,
  cardFrontPicture: PropTypes.string.isRequired,
  wantsImgs: PropTypes.array.isRequired,
};

export default Post;
