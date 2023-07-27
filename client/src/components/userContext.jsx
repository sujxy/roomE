import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchUser = async () => {
    const { data } = await axios.get("/auth/user");
    setUser(data);
    setReady(true);
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
