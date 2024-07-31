import { FunctionComponent } from "react";

interface RoleGuardProps {
  children: React.ReactElement | React.ReactElement[];
  canAccess: () => boolean;
}

const RoleGuard: FunctionComponent<RoleGuardProps> = ({
  children,
  canAccess,
}) => {
  return <>{canAccess() && children}</>;
};

export default RoleGuard;
