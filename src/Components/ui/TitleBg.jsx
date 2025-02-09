import herbs from "../../assets/herbs.jpg";
import PropTypes from "prop-types";

const TitleBg = ({ title }) => {
  return (
    <div className="relative w-full md:h-[180px] h-[120px]">
      <img className="w-full h-full object-cover" src={herbs} alt="Herbs" />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-green-900 bg-opacity-60 backdrop-blur-lg">
        <h1 className="md:text-4xl text-xl font-semibold text-white clash">
          {title}
        </h1>
      </div>
    </div>
  );
};

TitleBg.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleBg;
