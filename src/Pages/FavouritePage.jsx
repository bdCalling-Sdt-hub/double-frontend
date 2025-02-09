import productImg1 from "../assets/Frame 1707481877 (3).png";
import ProductCard from "../Components/ui/ProductCard";

const products = [
  {
    id: 1,
    image: productImg1,
    label: "WHOLESALE",
    title: "Bubba Kush",
    description: "THCA Flower Pounds Indica | 22.70% THCa | HP, LB",
    price: "$750 - $1000",
  },
  {
    id: 2,
    image: productImg1,
    label: "PREMIUM",
    title: "Pineapple Express",
    description: "Sativa | 18.90% THCa | HP, LB",
    price: "$650 - $900",
  },
  {
    id: 3,
    image: productImg1,
    label: "WHOLESALE",
    title: "OG Kush",
    description: "Hybrid | 20.50% THCa | HP, LB",
    price: "$800 - $1100",
  },
  {
    id: 4,
    image: productImg1,
    label: "WHOLESALE",
    title: "OG Kush",
    description: "Hybrid | 20.50% THCa | HP, LB",
    price: "$800 - $1100",
  },
  {
    id: 5,
    image: productImg1,
    label: "WHOLESALE",
    title: "OG Kush",
    description: "Hybrid | 20.50% THCa | HP, LB",
    price: "$800 - $1100",
  },
];

const FavouritePage = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl text-center clash">Favorite Products.</h1>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            image={product.image}
            label={product.label}
            title={product.title}
            description={product.description}
            price={product.price}
            favoriteTrue="true"
          />
        ))}
      </div>
    </div>
  );
};

export default FavouritePage;
