import { useAbility } from '@casl/react';

import { AbilityContext } from './Can';

export const usePermissions = () => useAbility(AbilityContext);
