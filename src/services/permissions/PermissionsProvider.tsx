import { useAuth } from '#/services/auth';

import { AbilityContext } from './Can';
import { defineAbilityFor } from './permissions';

const PermissionsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { authAccount } = useAuth();

  const ability = defineAbilityFor(authAccount);

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

export default PermissionsProvider;
