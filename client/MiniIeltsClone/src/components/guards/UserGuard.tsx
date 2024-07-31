import { FunctionComponent } from "react";
import useUser from "../../hooks/useUser";
import { USER_ROLE } from "../../contants/roles";
import RoleGuard from "./RoleGuard";

interface UserGuardProps {
  children: React.ReactElement | React.ReactElement[];
}

const UserGuard: FunctionComponent<UserGuardProps> = ({ children }) => {
  const { user } = useUser();
  const canAccess = () => user?.roles?.some((x) => x === USER_ROLE) ?? false;
  return <RoleGuard canAccess={canAccess}>{children}</RoleGuard>;
};

export default UserGuard;
