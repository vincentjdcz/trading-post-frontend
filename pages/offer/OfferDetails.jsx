import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const OfferDetails = () => {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [currentPicture, setCurrentPicture] = useState("");
  const [cardFrontPicture, setCardFrontPicture] = useState("");
  const [cardBackPicture, setCardBackPicture] = useState("");
  const loggedInUser = useSelector((state) => state.auth.userId);
  const isDev = false;
  console.log("OfferDetails component is rendering");
  console.log("offerId from useParams:", offerId);
  useEffect(() => {
    console.log("IN USEEFFECT 1");
    console.info("IN USEEFFECT2");
    const fetchOffer = async () => {
      setLoading(true);
      const prodURL = `https://trading-post-backend-production.up.railway.app/api/offer/getOffer/${offerId}`;
      const devURL = `http://localhost:3000/api/offer/getOffer/${offerId}`;
      console.log("IN USE EFFECT");
      //await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds

      try {
        const response = await fetch(isDev ? devURL : prodURL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching offer details");
        }
        const data = await response.json();
        console.log("DATA: ", data);
        //await new Promise(resolve => setTimeout(resolve, 20000)); // 20 seconds
        setOffer(data);
        setCurrentPicture(data.cardImages[0].cardFrontPicture);
        setCardFrontPicture(data.cardImages[0].cardFrontPicture);
        setCardBackPicture(data.cardImages[0].cardBackPicture);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [offerId]);
  console.log("offer: ", offer);

  const handleAcceptOffer = async () => {
    try {
      setTradeLoading(true);
      const postId = offer.postId._id
      const offerId = offer._id
      const users = [offer.postId.userName, offer.userName ]
      const prodURL = `https://trading-post-backend-production.up.railway.app/api/trade/createTrade`;
      const devURL = `http://localhost:3000/api/trade/createTrade`;

      const response = await fetch(isDev ? devURL : prodURL, 
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({postId, offerId, users })
        }
      )
      if(!response.ok) {
        console.log("response: ", response);
        throw new Error("Error processing trade");
      }

      const data = await response.json();
      console.log("Data: ", data);
      toast.success("Signup Successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 4000, // Show for 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    } catch(error) {
      console.log("Error: ", error.message)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    } finally {
      setTradeLoading(false);
    }
  }
  return (
    <div>
      {loading || !offer ? (
        <p>Loading...</p>
      ) : (
        
        <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <img
              src={currentPicture}
              className="h-72 rounded-lg object-contain sm:h-96"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl sm:text-2xl">Offer</p>
            <div className="flex gap-2"><p className="text-xs sm:text-base">Status: </p><p className={`text-xs sm:text-base 
                      ${offer.status === "Pending" && "text-yellow-500"} 
                      ${offer.status === "Accepted" && "text-green-500"} 
                      ${offer.status === "Declined" && "text-red-500"}`}>{offer.status}</p></div>
            <p className="text-xs sm:text-base">From:</p>
            <p className="text-xs sm:text-base font-bold">@{offer.userName}</p>
            <p className="text-xs sm:text-base">Original Post:</p>
            <a className="text-xs sm:text-base font-bold" href={`/postDetails/${offer.postId._id}`}>
              {offer.postId.cardName}
            </a>
            <p className="text-xs sm:text-base">Card Images</p>
            <div className="flex gap-2">
              <img
                onClick={() => setCurrentPicture(cardFrontPicture)}
                src={cardFrontPicture}
                className="h-24 sm:h-36 rounded-sm cursor-pointer"
              />
              <img
                onClick={() => setCurrentPicture(cardBackPicture)}
                src={cardBackPicture}
                className="h-24 sm:h-36 rounded-sm cursor-pointer"
              />
            </div>
          </div>
          
        </div>
        <div className="flex flex-col gap-2">
             <p className="font-xl sm:font-2xl font-bold">Cards: </p>
             <div className="flex gap-2 overflow-x-auto">
                {
                    offer.cardImages.map((card, idx) => {
                        return (
                            <img key={idx} src={card.cardFrontPicture} className="h-28 sm:h-44 rounded-sm cursor-pointer"
                            onClick={() => {
                                setCurrentPicture(card.cardFrontPicture);
                                setCardFrontPicture(card.cardFrontPicture);
                                setCardBackPicture(card.cardBackPicture);
                            }}/>
                        )
                    })
                }
             </div>
          </div>
          {(loggedInUser === offer.postId.userId) && (
            <div className="bg-white sticky bottom-0 z-10 w-screen ">
            <button
                    onClick={() => handleAcceptOffer()}
                    className="w-full mt-2 bg-green-400"
                    style={{
                      
                      color: "white",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    
                  >
                    {tradeLoading ? "Loading..." : "Accept Offer"}
                  </button>
                  <button
                    className="w-full mt-2 bg-red-400"
                    style={{
                      
                      color: "white",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    
                  >
                    Decline Offer
                  </button>
            </div>
          )}
          
          <ToastContainer />

        </div>
      )}
    </div>
  );
};

export default OfferDetails;
