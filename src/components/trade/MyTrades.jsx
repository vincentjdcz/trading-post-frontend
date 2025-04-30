import { useEffect, useState } from "react";
import Trade from "./Trade";
import { useSelector } from "react-redux";

const MyTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const userName = useSelector((state) => state.auth.userName);
  const isDev = false;

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        console.log("About to fetch trades")
        console.log("username: ", userName)
        setLoading(true);
        const prodURL = `https://trading-post-backend-production.up.railway.app/api/trade/getTradesForUser/${userName}`;
        const devURL = `http://localhost:3000/api/trade/getTradesForUser/${userName}`;

        
        const response = await fetch(isDev ? devURL : prodURL, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            }
        })

        if(!response.ok) {
            throw new Error("Error fetching trades");
        }

        const data = await response.json();
        setTrades(data);
        console.log("TRADES: ", data);
      } catch (error) {
        console.log("Error: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, [userName]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-full h-full mt-2 w-screen">
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Set the flex direction to column
          alignItems: "flex-start", // Optional: aligns children to the start of the container
          justifyContent: "flex-start", // Optional: aligns children at the start vertically
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            width: "100vw",
          }}
        >
          {trades.map((trade, idx) => {

            return (
              <Trade
                key={idx}
                postUserName={trade.postId.userName}
                offerUserName={trade.offerId.userName}
                postImage={trade.postId.cardFrontPicture}
                offerImages={trade.offerId.cardImages}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyTrades;
