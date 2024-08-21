import { createContext } from 'react';

import { AnyMongoAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';

export const AbilityContext = createContext<AnyMongoAbility>(null as unknown as AnyMongoAbility);

const Can = createContextualCan(AbilityContext.Consumer);

export default Can;
