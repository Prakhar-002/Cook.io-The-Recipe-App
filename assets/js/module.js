/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";


export const getTime = (minutes) => {
      const /* {Number} */ hour = Math.floor(minutes / 60);
      const /* {Number} */ day = Math.floor(hour / 24);

      const /* {Number} */ time = day || hour || minutes ;
      const /* {Number} */ unitIndex = [day, hour, minutes].lastIndexOf(time)
      const /* {String} */ timeUnit = ["days", "hours", "minutes"][unitIndex];

      return { time, timeUnit };
}