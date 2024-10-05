import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useEffect } from "react";

const AdminMainPage = () => {
  const { logout, isLoggedIn, memberInfo, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  useEffect(() => {
    console.log("Current member info: ", memberInfo);
  }, [memberInfo]);
  return <SidebarLayout />;
};

export default AdminMainPage;
