export const handleValidationErrors = <T>(
  errors: any[],
  setErrorData: React.Dispatch<React.SetStateAction<Record<keyof T, string>>>,
  errorData: Record<keyof T, string>,
) => {
  const updatedErrorData = { ...errorData };

  for (const error of errors) {
    const key = error.instancePath
      ? (error.instancePath.slice(1) as keyof T)
      : ("confirmPassword" as keyof T);
    console.log(key);
    console.log(error);
    if (key in updatedErrorData) {
      updatedErrorData[key] = error.message || `Invalid ${String(key)}`;
    }
  }

  setErrorData(updatedErrorData);
};
