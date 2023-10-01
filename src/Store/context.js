import React, { useEffect, useState } from "react";
const userContext = React.createContext({
  uid: "",
  setUId: () => {},
  login: false,
  setLogin: () => {},
});
export default userContext;
export const UserContextProvider = (props) => {
  const [uId, setUId] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      setLogin(true);
      setUId(userID);
    }
  }, []);

  return (
    <userContext.Provider value={{ uid: uId, login: login, setUId, setLogin }}>
      {props.children}
    </userContext.Provider>
  );
};
