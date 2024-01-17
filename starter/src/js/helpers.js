import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout
       after ${s} seconds`));
      }, s * 10000);
    });
  };

  export const AJAX = async function(url, uploadData = undefined) {
    try {
      console.log("In AJAX");
      console.log("url: ", url);
      console.log("uploadData: ", uploadData);

      const fetchPromise = uploadData ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData),
      })
      : fetch(url);

      // console.log("fetchPromise: ", fetchPromise);

      const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
      console.log("res: ", res);

      const data = await res.json();
  
      if(!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
      } catch(err) {
        throw err; 
      }           
  };

/*
export const getJSON = async function(url) {
    try {
    const fetchPromise = fetch(url);
    const res = await Promise.race([(fetchPromise, timeout(TIMEOUT_SEC))]);
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
    } catch(err) {
      throw err; 
    }           
};

export const sendJSON = async function(url, uploadData) {
  try {
  const fetchPromise = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(uploadData),
  });

  const res = await Promise.race([(fetchPromise, timeout(TIMEOUT_SEC))]);
  const data = await res.json();

  if(!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
  } catch(err) {
    throw err;
  }          
};
*/
