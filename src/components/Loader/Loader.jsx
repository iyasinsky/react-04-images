import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="100"
    width="100"
    radius="10"
    color="#3f51b5"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ justifyContent: 'center' }}
    visible={true}
  />
);
