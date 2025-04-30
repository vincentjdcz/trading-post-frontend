import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardFillerSkeleton from "/src/components/skeleton/CardFillerSkeleton";
import Modal from "react-modal";

const PostDetails = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [isCreateOfferModalOpen, setisCreateOfferModalOpen] = useState(false);
  const [cardFrontPicture, setCardFrontPicture] = useState("");
  const [cardBackPicture, setCardBackPicture] = useState("");
  const [cards, setCards] = useState([]);
  const [offers, setOffers] = useState([]);
  const isDev = false;
  const loggedInUser = useSelector((state) => state.auth.userName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const prodURL = `https://trading-post-backend-production.up.railway.app/api/post/getPost/${postId}`;
        const devURL = `http://localhost:3000/api/post/getPost/${postId}`;

        const response = await fetch(isDev ? devURL : prodURL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching post");
        }

        const data = await response.json();
        console.log("DATA: ", data);
        setPost(data);
        setCurrentImage(data.cardFrontPicture);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchOffers = async() => {
        try {
            const prodURL = `https://trading-post-backend-production.up.railway.app/api/offer/getAllOffersForPost/${postId}`;
            const devURL = `http://localhost:3000/api/offer/getAllOffersForPost/${postId}`;

            const response = await fetch(isDev ? devURL : prodURL, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if(!response.ok) {
                throw new Error("Error fetching offers");
            }
            const data = await response.json();
            setOffers(data);
            
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    fetchOffers();
  }, [])

  const closeModal = () => {
    setisCreateOfferModalOpen(false);
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

  const handleAddCardToOffer = () => {
    console.log("In HandleAddCardToOffer");
    if(cardFrontPicture === "" || cardBackPicture === "") {
     setError("Please upload pictures for both the front and the back of the card.");
      return;
    }
    const card = {cardFrontPicture, cardBackPicture};
    setCards([...cards, card]);
    setCardFrontPicture("");
    setCardBackPicture("");
    setError("");
  }

  const handleCancelOffer = () => {
    setCards([]);
    setCardFrontPicture("");
    setCardBackPicture("");
    closeModal();
  }
  const handleCreateOffer = async () => {
    try {
        setLoading(true);
        const prodURL = `https://trading-post-backend-production.up.railway.app/api/offer/createOffer`;
        const devURL = `http://localhost:3000/api/offer/createOffer`;
        const postId = post._id;
        const response = await fetch(isDev ? devURL : prodURL, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({postId, userName: loggedInUser,  cardImages: cards })
        })

        if(!response.ok) {
            console.log("Response: ", response)
            throw new Error("Error submitting offer");
        }

        const data = await response.json();
        console.log("Data: ", data);
        setCards([]);
    setCardFrontPicture("");
    setCardBackPicture("");
    closeModal();
    window.location.reload();
    } catch(error) {
        console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
    
  }
  return (
    <>
      <div className="w-screen">
        {/* Conditionally render content if post is still null */}
        {!post ? (
          <p>Loading...</p> // Or you can show a loading spinner or any placeholder here
        ) : (
          <>
            <div className="flex items-center mb-2 gap-2">
              
            {post.userId.profilePicture ? <img
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-full"
                src={post.userId.profilePicture}
              /> : 
          <HiUser className="w-10 h-10 sm:w-16 sm:h-16 rounded-full text-white bg-gray-500" />}

              
              
              <p className="font-bold sm:text-xl">@{post.userId.userName}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-20">
              <div className="w-full sm:w-auto sm:max-w-sm">
                <img
                  src={currentImage}
                  className="h-72 rounded-lg object-contain sm:h-96"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
                <p className="sm:text-lg">
                  Card Name: <b>{post.cardName}</b>
                </p>
                <p className="sm:text-lg">
                  Set Name: <b>{post.setName}</b>
                </p>
                <p className="sm:text-lg">
                  Set Id: <b>{post.setId}</b>
                </p>
                <p className="sm:text-lg">
                  Set Number:{" "}
                  <b>
                    {post.setNumber}/{post.setTotal}
                  </b>
                </p>
                <p className="sm:text-lg">Card Images:</p>
                <div className="flex gap-2">
                  <img
                    onClick={() => setCurrentImage(post.cardFrontPicture)}
                    src={post.cardFrontPicture}
                    className="h-48 rounded-sm cursor-pointer"
                  />
                  <img
                    onClick={() => setCurrentImage(post.cardBackPicture)}
                    src={post.cardBackPicture}
                    className="h-48 rounded-sm cursor-pointer"
                  />
                </div>
              </div>

              {/* Horizontal rule on small screens */}
              <div className="block w-full border-t my-4"></div>

              
              <div className="flex flex-col gap-2 h-72 overflow-y-auto flex-grow">
                <p className="font-bold text-lg sm:text-2xl sticky top-0 bg-white z-10">
                  Offers:{" "}
                </p>

                {offers.map((offer, idx) => {
                  return (loggedInUser === post.userId.userName ? 
                    
                    (<a href={`/offerDetails/${offer._id}`}>
                      <div key={idx} className="flex flex-col gap-2 justify-start items-start">
                      <p className="font-bold">@{offer.userName}</p>
                      <div className="flex gap-2"><p>Status: </p><p className={`${offer.status === "Pending" && "text-yellow-500"} 
                      ${offer.status === "Accepted" && "text-green-500"} 
                      ${offer.status === "Declined" && "text-red-500"}`}>{offer.status}</p></div>
                      <div className="flex items-center justify-start gap-2">
                      {offer.cardImages.map((cardImg, idxx) => {
                        return (
                          <img key={idxx} src={cardImg.cardFrontPicture} className="h-20"/>
                        )
                      })}
                      </div>
                      <div className="block w-full border-t my-4 border-dashed"></div>
                    </div>
                      </a>)
                    :
                    (<div key={idx} className="flex flex-col gap-2 justify-start items-start">
                      <p className="font-bold">@{offer.userName}</p>
                      <div className="flex items-center justify-start gap-2">
                      {offer.cardImages.map((cardImg, idxx) => {
                        return (
                          <img key={idxx} src={cardImg.cardFrontPicture} className="h-20"/>
                        )
                      })}
                      </div>
                      <div className="block w-full border-t my-4 border-dashed"></div>
                    </div>)
                  )
                })}
              </div>
            </div>
            {loggedInUser === post.userId.userName ? (
              <div className="flex justify-center items-center fixed bottom-0 bg-white left-1/2 transform -translate-x-1/2 w-screen p-4">
                <button
                  className="w-[90vw] bg-red-400"
                  style={{
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  Delete Post
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center fixed bottom-0 bg-white left-1/2 transform -translate-x-1/2 w-screen p-4">
                <button
                  className="w-[90vw]"
                  style={{
                    backgroundColor: "#3B82F6",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick = {() => {setisCreateOfferModalOpen(true)}}
                >
                  Create Offer
                </button>
              </div>
            )}
          </>
        )}

    <Modal
        isOpen={isCreateOfferModalOpen}
        onRequestClose={closeModal}
        contentLabel="Choose Card Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: semi-transparent background
            zIndex: 50,
          },
          
          content: {
            zIndex: 51, 
            marginTop: "100px", // Add top margin
            top: "40%", // Center vertically
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
        <p className="text-2xl font-bold">Creating Offer</p>
        <div className="mt-4 gap-2" style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="">
              <div>
                <label>Card Front Picture URL:</label>
              </div>
              {cardFrontPicture === "" ? (
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
              {cardFrontPicture === "" ? (
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

         <div className="flex gap-2 overflow-x-auto">
         {
            cards.map((card, idx) => {
                return(
                    <img key={idx} src={card.cardFrontPicture} className="h-40"/>
                )
            } )
         }
         </div>
         {error !== "" && <p className="text-red-500">{error}</p>}
          <button
                  className="w-full mt-2"
                  style={{
                    backgroundColor: "#3B82F6",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick = {() => {handleAddCardToOffer()}}
                >
                  Add Card To Offer
                </button>

            <div className="flex gap-2">
            <button
                  className="flex-grow mt-2 bg-green-400"
                  style={{
                    
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick = {() => {handleCreateOffer()}}
                >
                  {loading ? "Loading..." : "Submit Offer"}
                </button>
                <button
                  className="flex-grow mt-2 bg-red-400"
                  style={{
                    
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick = {() => {handleCancelOffer()}}
                >
                  Cancel
                </button>
            </div>
      </Modal>
      </div>
    </>
  );
};

export default PostDetails;
