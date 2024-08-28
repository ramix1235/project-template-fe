import { Anchor, Button, Group, Stack, Text } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { Trans, useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE, MIN_TABLE_HEIGHT } from '#/components';
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

const defaultPets: Pet[] = [];
const defaultTag = 'itc';

const HomeTable = () => {
  const { t } = useTranslation();

  const [addPet, { isLoading: isAddPetLoading }] = useAddPetMutation();
  const {
    data: pets = defaultPets,
    isLoading: isPetsLoading,
    isFetching: isPetFetching,
  } = useFindPetsByTagsQuery({
    tags: [defaultTag],
  });

  const pagination = usePagination({ total: getPageTotal(pets.length, DEFAULT_PAGE_SIZE) });

  const columns: DataTableColumn<Pet>[] = [
    { accessor: 'id', title: t('home.table.column.id') },
    { accessor: 'name', title: t('home.table.column.name') },
    { accessor: 'status', title: t('home.table.column.status') },
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
    <Stack>
      <Text ta="center" size="xl">
        <Trans
          t={t}
          i18nKey="home.table.title"
          components={{
            Anchor: <Anchor target="_blank" />,
          }}
        />
      </Text>

      <Group>
        <Button loading={isAddPetLoading} onClick={handleAddPetClick}>
          {t('home.table.actions.add')}
        </Button>
      </Group>

      <DataTable
        fetching={isPetsLoading || isPetFetching}
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
  );
};

export default HomeTable;
