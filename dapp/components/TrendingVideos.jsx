import React, { useState, useCallback, useEffect } from "react";
import { useAccount, useContractRead, useProvider, useSigner } from 'wagmi';

import styles from "../styles/TrendingVideos.module.css";

import {
  DeTOK_ABI,
  DeTok_Contract_Address
} from '../constants/constants';


export const TrendingVideos = () => {
  const [status, setstatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [videoIds, setVideoIds] = useState([]);
  const [error, setError] = useState("");

    const { refetch } = useContractRead(
      {
        address: DeTok_Contract_Address,
        abi:DeTOK_ABI,
        functionName: 'getAllTrendingCid',
      },
    )
    
    const handleClick = async () => {
      const res = await refetch();
      const { status, data} = res;
      if(res.status == "success"){
        setVideoIds(data);
      }
    }

    return (
      <div className="pt-2">
          <div className={styles.title}>
              <span className={`${styles.title.description}`}>
                Trending Videos
              </span>
          </div>
          <div>
              {videoIds}
          </div>
      </div>
    )
}