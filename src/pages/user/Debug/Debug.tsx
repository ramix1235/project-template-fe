import { Anchor, Button, Group, Stack, Text, Title } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { Trans, useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE, MIN_TABLE_HEIGHT } from '#/components';
import { LocaleSelect, ThemeSelect } from '#/components/base';
import { PageLoader } from '#/components/layouts';
import { EmptyPaginationText } from '#/components/tables';
import {
  AddPetApiArg,
  Pet,
  Status,
  useAddPetMutation,
  useFindPetsByTagsQuery,
} from '#/services/api/pet';
import { showErrorNotification } from '#/services/notifications';
import { getPageTotal, paginate } from '#/services/pagination';

import PermissionsMultiSelect from './PermissionsMultiSelect';

// TODO: It was created to debug components, API, permissions, etc.

const defaultPets: Pet[] = [];
const defaultTag = 'itc';

const Debug: React.FC = () => {
  const { t } = useTranslation();

  const [addPet, { isLoading: isAddPetLoading }] = useAddPetMutation();
  const { data: pets = defaultPets, isLoading: isPetsLoading } = useFindPetsByTagsQuery({
    tags: [defaultTag],
  });

  const pagination = usePagination({ total: getPageTotal(pets.length, DEFAULT_PAGE_SIZE) });

  const columns: DataTableColumn<Pet>[] = [
    { accessor: 'id', title: t('debug.table.column.id') },
    { accessor: 'name', title: t('debug.table.column.name') },
    { accessor: 'status', title: t('debug.table.column.status') },
  ];

  const records = paginate(pets, DEFAULT_PAGE_SIZE, pagination.active);

  const handleAddPetClick = async () => {
    const lastPetId = pets[0]?.id ?? 0;
    const newPetId = lastPetId + 1;

    const addPetPayload: AddPetApiArg = {
      pet: {
        id: newPetId, // Comment it to get 500 error
        name: `Pet-${newPetId}`,
        category: {
          id: 1,
          name: 'Cats',
        },
        photoUrls: ['string'],
        tags: [
          {
            id: 0,
            name: defaultTag,
          },
        ],
        status: Status.Available,
      },
    };

    try {
      await addPet(addPetPayload).unwrap();
    } catch (error) {
      showErrorNotification(error);
    }
  };

  return (
    <PageLoader loading={isPetsLoading}>
      <Stack gap="xl">
        <Group justify="center">
          <Stack maw={360}>
            <Title order={6} c="dimmed">
              {t('debug.theming')}
            </Title>
            <ThemeSelect />

            <Title order={6} c="dimmed">
              {t('debug.localization')}
            </Title>
            <LocaleSelect />

            <Title order={6} c="dimmed">
              {t('debug.permissions')}
            </Title>
            <PermissionsMultiSelect />
          </Stack>
        </Group>

        <Stack mt="xl">
          <Text ta="center" size="xl">
            <Trans
              t={t}
              i18nKey="debug.table.title"
              components={{
                Anchor: <Anchor target="_blank" />,
              }}
            />
          </Text>

          <Group>
            <Button loading={isAddPetLoading} onClick={handleAddPetClick}>
              {t('debug.table.actions.add')}
            </Button>
          </Group>

          <DataTable
            minHeight={MIN_TABLE_HEIGHT}
            columns={columns}
            records={records}
            noRecordsText=""
            paginationText={EmptyPaginationText}
            totalRecords={pets.length}
            recordsPerPage={DEFAULT_PAGE_SIZE}
            page={pagination.active}
            onPageChange={pagination.setPage}
          />
        </Stack>
      </Stack>
    </PageLoader>
  );
};

export default Debug;
