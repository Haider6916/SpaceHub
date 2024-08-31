import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetchGet = (
  url,
  shouldStartLoading = false,
  // id = '',
  // uuid = '',
  data = {},
  authToken = '',
  limit,
  skip,
) => {
  // console.log(id,uuid);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetch = async () => {
      if (shouldStartLoading) {
        setLoading(true);
        setResponse(null);
        setError(null);
        axios({
          url,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
            Accept: 'application/json',
            // storeId: id,
            // uuid: uuid,
            'x-pagination-skip':skip,
          }, 'x-pagination-limit':limit,
          params: data,
        })
          .then(resp => {
            // console.log(resp,'resp');
            // console.log('====================================');
            // console.log(data);
            // console.log('====================================');
            const definedObj = {
              status: resp.status,
              data: resp.data,
              pageInfo: resp.data.page_info,
            };
            // console.log(definedObj,'definedObj');
            setResponse(definedObj);
            // if (definedObj.code !== 1000) {
            // setError(true);
            // }
          })
          .catch(err => {
            // console.log(err,'err');
            setError(true);
            const definedObj = {
              status: err.response.status,
              data: err.response.data,
              pageInfo: err?.data?.page_info,
            };

            setResponse(definedObj);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    fetch();

    return () => {
      source.cancel();
    };
  }, [url, shouldStartLoading]);

  return {response, loading, error};
};

export default useFetchGet;
