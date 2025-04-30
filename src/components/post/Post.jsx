import PropTypes from "prop-types";

const Post = ({ postId, userName, cardName, setName, setNumber, setTotal, setId, cardFrontPicture, wantsImgs }) => {
  console.log("IN POST.JSX");
  console.log(wantsImgs);
  console.log("postId: ", postId)
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
    <a href={"/postDetails/" + postId}>
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

      
      <p className="text-xs">Posted by</p><p className="text-xs font-semibold">{userName}</p>
      <img
        className="mt-2"
        src={cardFrontPicture}
        style={{ width: "150px", height: "205px", objectFit: "cover", borderRadius: "10px" }}
      />
      <p className="font-bold text-base mt-1">{cardName}</p>
      <p className="text-xs">{setName}</p>
      <hr className="mt-2 mb-2"/>
      <div>
        <p className="font-semibold text-xs">Wants: </p>
        <div
          style={{
            display: "flex",
            marginTop: "0.5rem",
            overflowX: "auto",
            width: "100%",
            gap: "1rem", // Adjust the gap size as needed
          }}
        >
          {wantsImgs.map((wantImg, idx) => (
            <img
              key={idx}
              src={wantImg}
              style={{ width: "70px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
            />
          ))}
        </div>
      </div>
    </div>
    </a>
  );
};

Post.propTypes = {
  //onSelectCard: PropTypes.func.isRequired, // Validate onSelectCard as a required function
  postId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  setName: PropTypes.string.isRequired,
  setNumber: PropTypes.string.isRequired,
  setTotal: PropTypes.string.isRequired,
  setId: PropTypes.string.isRequired,
  cardFrontPicture: PropTypes.string.isRequired,
  wantsImgs: PropTypes.array.isRequired,
};

export default Post;
