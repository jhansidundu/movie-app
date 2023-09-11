import { createContext, useState } from "react";
import React from "react";
const userContext = React.createContext({
  uid: "",
  setUId: () => {},
});
export default userContext;
export const UserContextProvider = (props) => {
  const [uId, setUId] = useState(null);

  return (
    <userContext.Provider value={{ uid: uId, setUId }}>
      {props.children}
    </userContext.Provider>
  );
};
