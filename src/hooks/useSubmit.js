import {useState} from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This is a custom hook that can be used to submit a form and simulate an API call
 * It uses Math.random() to simulate a random success or failure, with 50% chance of each
 */
const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await wait(3000);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, submit };
}

export default useSubmit;