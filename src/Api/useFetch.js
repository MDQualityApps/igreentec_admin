import axios from "axios";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";

// thsi function is for get data with and without id from the db

const useFetch = (url, method, id) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const [refreshpage, setrefreshpage] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [emptydata, setemptydata] = useState(false);
  const [data, setData] = useState([]);
 


 
  useEffect(() => {
    if (!navigator.onLine) {
      alert("Your internet is in Offline")
    } else {
      axios({
        method: method,
        url: url,
        data: id,
        signal: signal
      }).then(res => {
        setData(res.data.data);
        setIsloading(true);
        setrefreshpage(false)
      }).catch(err => {
        console.log(err)
      });
    }
    return () => controller.abort();
  }, [refreshpage]);
  return { data, isloading, setrefreshpage, emptydata };
};

export default useFetch;