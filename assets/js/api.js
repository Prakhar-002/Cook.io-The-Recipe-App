/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

import { apiId, appKey } from "./apiKey.js";

//! To use this code in your project... Make apiId and apiKey from ('https://developer.edamam.com/edamam-recipe-api')
//? paste it in place of (const /* {String} */ APP_ID = "here";) ...
//? (const /* {String} */ APP_KEY = "here";) ...

const /* {String} */ APP_ID = apiId;
const /* {String} */ APP_KEY = appKey;
const /* {String} */ TYPE = "public";
window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";


export const fetchData = async function (queries, successCallback) {

      const /* {String} */ query = queries?.join("&")
            .replace(/,/g, "=")
            .replace(/ /g, "%20")
            .replace(/\+/g, "%2B");

            const /* {String} */ url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${APP_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

            const /* {Object} */ response = await fetch(url);

            if (response.ok) {
                  const data = await response.json();
                  successCallback(data);
            }
}



