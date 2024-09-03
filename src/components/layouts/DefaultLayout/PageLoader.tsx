import { Center, CenterProps, ElementProps, Loader } from '@mantine/core';

interface PageLoaderProps extends CenterProps, ElementProps<'div', keyof CenterProps> {
  loading?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ loading = false, children, ...rest }) => {
  if (!loading) {
    return children;
  }

  return (
    <Center h="100%" mt="xl" {...rest}>
      <Loader />
    </Center>
  );
};

export default PageLoader;
