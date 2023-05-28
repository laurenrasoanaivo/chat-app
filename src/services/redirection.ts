
export const redirect = (destination: string) => {
    return {
      redirect: {
        destination: destination,
        permanent: false,
      },
    };
  };  