import { FunctionComponent } from "react";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import RoleGuard from "./RoleGuard";

interface AdminGuardProps {
  children: React.ReactElement | React.ReactElement[];
}

const AdminGuard: FunctionComponent<AdminGuardProps> = ({ children }) => {
  const { user } = useUser();
  const canAccess = () => user?.roles?.some((x) => x === ADMIN_ROLE) ?? false;
  return <RoleGuard canAccess={canAccess}>{children}</RoleGuard>;
};

export default AdminGuard;
