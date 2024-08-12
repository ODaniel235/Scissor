import React, { useEffect } from "react";
import { useAllUserLinks, useUser } from "./store/UserStore";
import axios from "axios";

const UseSession = ({ children }: { children: React.ReactNode }) => {
  axios.defaults.withCredentials = true;

  const { setUserLoggedIn } = useUser();
  const { setAllMyLinks } = useAllUserLinks();

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        // Assuming you might have a better method to determine if the user is logged in
        const response = await axios.get("http://localhost:8000/all");

        if (response.status === 200) {
          setAllMyLinks(response.data);
          setUserLoggedIn(true); // Set userLoggedIn state to true upon successful fetch
        }

        console.log(response);
      } catch (err) {
        console.log(err);
        setUserLoggedIn(false); // Set userLoggedIn state to false in case of an error
      }
    };

    fetchAllLinks();
  }, [setAllMyLinks, setUserLoggedIn]); // Ensure these dependencies are correct

  return <div className="w-screen h-screen">{children}</div>;
};

export default UseSession;
