import PropTypes from "prop-types";

const Trade = ({ key, postUserName, offerUserName, postImage, offerImages  }) => {


  return (

    <div
      key={key}
      style={{
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
        padding: "10px", // Padding inside the div
        backgroundColor: "white", // Optional: set background color
        width: "175px",
      }}
    >

      
      <p className="text-xs">Post by</p><p className="text-xs font-semibold">{postUserName}</p>
      <img
        className="mt-2"
        src={postImage}
        style={{ width: "150px", height: "205px", objectFit: "cover", borderRadius: "10px" }}
      />
      

      <hr className="mt-2 mb-2"/>
      <div>
      <p className="text-xs">Offer by</p><p className="text-xs font-semibold">{offerUserName}</p>
        <div
          style={{
            display: "flex",
            marginTop: "0.5rem",
            overflowX: "auto",
            width: "100%",
            gap: "1rem", // Adjust the gap size as needed
          }}
        >
          {offerImages.map((offerImage, idx) => (
            <img
              key={idx}
              src={offerImage.cardFrontPicture}
              style={{ width: "70px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
            />
          ))}
        </div>
      </div>
    </div>

  );
};

Trade.propTypes = {
  //onSelectCard: PropTypes.func.isRequired, // Validate onSelectCard as a required function
  postUserName: PropTypes.string.isRequired,
  offerUserName: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  offerImages: PropTypes.string.isRequired,
  key: PropTypes.any
};

export default Trade;
