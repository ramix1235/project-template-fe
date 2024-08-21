import { AbilityBuilder, AnyMongoAbility, createMongoAbility } from '@casl/ability';

import { AuthAccount } from '#/services/auth';

export function defineAbilityFor(authAccount: AuthAccount) {
  const { can, build } = new AbilityBuilder<AnyMongoAbility>(createMongoAbility);

  authAccount.permissions.forEach((permission) => {
    const [subject, action] = permission.split(':');

    can(action, subject);
  });

  return build();
}
