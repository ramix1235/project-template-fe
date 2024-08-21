import { MultiSelectProps, MultiSelect } from '@mantine/core';

import { temporaryChangePermissions, useAuth } from '#/services/auth';
import { mockedAllPermissions } from '#/services/mock';
import { useAppDispatch } from '#/services/store';

// TODO: It was created to debug permissions

const PermissionsMultiSelect: React.FC<MultiSelectProps> = (props) => {
  const dispatch = useAppDispatch();

  const { authAccount } = useAuth();

  const allPermissions = mockedAllPermissions.map((permission) => ({
    label: permission,
    value: permission,
  }));

  const handlePermissionsSelect = (values: string[]) => {
    dispatch(temporaryChangePermissions(values));
  };

  return (
    <MultiSelect
      value={authAccount.permissions}
      data={allPermissions}
      onChange={handlePermissionsSelect}
      {...props}
    />
  );
};

export default PermissionsMultiSelect;
