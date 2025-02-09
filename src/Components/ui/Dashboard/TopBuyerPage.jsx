import randomImg from "../../../assets/randomProfile2.0.png";
import logo from "../../../assets/logo.png";

const TopBuyersPage = () => {
  const dummyBuyersData = {
    data: [
      {
        name: "Buyer One",
        totalTransaction: 1500,
        profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        name: "Buyer Two",
        totalTransaction: 1250,
        profileImg: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        name: "Buyer Three",
        totalTransaction: 1750,
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      {
        name: "Buyer Four",
        totalTransaction: 900,
        profileImg: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        name: "Buyer Five",
        totalTransaction: 1100,
        profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      {
        name: "Buyer Six",
        totalTransaction: 1300,
        profileImg: "https://randomuser.me/api/portraits/men/6.jpg",
      },
    ],
  };

  const isLoading = false;
  const buyersData = dummyBuyersData;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const buyers = buyersData?.data;

  const totalTransactions = buyers?.reduce(
    (total, buyer) => total + buyer.totalTransaction,
    0
  );

  const topBuyers = [...(buyers || [])]
    .sort((a, b) => b.totalTransaction - a.totalTransaction)
    .slice(0, 5);

  return (
    <div className="md:w-[60%] border h-[290px] bg-white rounded-2xl pb-5 md:flex flex-col justify-center">
      <p className="text-base font-semibold px-10 py-4">Top Buyers</p>
      <div className="md:flex flex-col px-10 gap-4">
        {topBuyers?.slice(0, 4).map((value, index) => {
          const buyingRate = (
            (value.totalTransaction / totalTransactions) *
            100
          ).toFixed(1);
          return (
            <div key={index} className="flex items-center gap-4">
              <img
                className="w-7 h-7 rounded-full"
                src={value?.profileImg || randomImg}
                alt={value?.name}
              />
              <h1 className="text-sm font-medium w-28 truncate">
                {value?.name}
              </h1>
              <div className="flex items-center flex-1">
                <div
                  className="w-full rounded-full h-2.5"
                  style={{ backgroundColor: "#e5e7eb" }}
                >
                  <div
                    style={{
                      backgroundColor: "#173616",
                      width: `${buyingRate}%`,
                      height: "100%",
                      borderRadius: "999px",
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-sm font-medium">{buyingRate}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopBuyersPage;
