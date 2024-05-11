import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <RotatingLines
      visible={true}
      //height={96}
      width={'96'}
      strokeColor="cadetblue"
      ariaLabel="rotating-lines-loading"
      //wrapperStyle={{}}
      //wrapperClass=""
    />
  );
}

export default Loader;
