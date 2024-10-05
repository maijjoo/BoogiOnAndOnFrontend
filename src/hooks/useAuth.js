import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";

export const useAuth = () => {
  const memberInfo = useSelector((state) => state.login);
  const dispatch = useDispatch();

  console.log(memberInfo);

  const isLoggedIn = !!memberInfo?.username;

  const role = memberInfo?.roleNames?.[0] || "Guest";

  const isDriver = !!memberInfo?.vehicleCapacity;

  const username = memberInfo?.username || "";

  const workPlace = memberInfo?.workPlace || "";

  const department = memberInfo?.department || "";

  const name = memberInfo?.name || "";

  const managerId = memberInfo?.managerId || null;

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    memberInfo,
    role,
    username,
    isDriver,
    logout: handleLogout,
    workPlace,
    department,
    name,
    managerId,
  };
};
