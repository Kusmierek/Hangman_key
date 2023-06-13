import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ children }: { children: any }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;
  const isAdmin = keycloak.hasRealmRole('admin');

  return isLoggedIn && isAdmin ? children : null;
};

export default PrivateRoute;
