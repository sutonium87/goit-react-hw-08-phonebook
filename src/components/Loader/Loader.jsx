// Import necessary dependencies and components
import React from 'react';
import { Bars } from 'react-loader-spinner';
import style from './Loader.module.css';

// Define the Loader functional component
export function Loader() {
  // JSX structure for the Loader component
  return (
    <div className={style.loader}>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        backgrounColor="transparent"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
