import { useEffect, useState } from "react";

function useUser() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "xtra-user"
  );

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, []);

  return { userRole, setUserRole, userName, setUserName };
}
export default useUser;
