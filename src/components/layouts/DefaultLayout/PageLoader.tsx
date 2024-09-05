import { Center, CenterProps, ElementProps, Loader } from '@mantine/core';

interface PageLoaderProps extends CenterProps, ElementProps<'div', keyof CenterProps> {
  loading?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ loading = false, children, ...props }) => {
  if (!loading) {
    return children;
  }

  return (
    <Center mt="xl" {...props}>
      <Loader size="lg" />
    </Center>
  );
};

export default PageLoader;
