type ErrorTagprops = {
   errorMessage: string | null;
};

export const ErrorTag = ({ errorMessage }: ErrorTagprops) => {
   return <p className="tex">{errorMessage}</p>;
};
