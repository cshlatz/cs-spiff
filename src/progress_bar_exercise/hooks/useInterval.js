/**
  * Credit for the idea behind this code isn't mine, it's Dan Abramov's
  * see: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  * I will say however, that I love using custom hooks in my code.
  * My favorite hook that I've written has been one that tracks impressions.
**/

import React, { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const refCallback = useRef();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      refCallback.current();
    }

    if (delay !== null) {
      let interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};

export default useInterval;
