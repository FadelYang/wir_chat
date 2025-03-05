import { useAuth } from "../../../context/AuthContext";
import HeaderMenu from "../../organism/cms/HeaderMenu";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";

const UserProfile = () => {
  const { user } = useAuth();
  const breadcrumbPath = [
    { name: "Dashboard", path: "/dashboard" },
    { name: user.email, path: `/dashboard/users/${user.uid}` },
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={`User Profile`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">{user.email}</div>
    </DashboardTemplate>
  );
};

export default UserProfile;
