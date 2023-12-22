export const computeInMinutes = (seconds: number) => {
  if (seconds < 60) return handlePlural(seconds, "seconde", true);
  const pureMinutes = seconds / 60;
  const integerPartOfMinutes = Math.floor(pureMinutes);
  const remainingFloatPart = pureMinutes - integerPartOfMinutes;
  const strMinutes = handlePlural(integerPartOfMinutes, "minute", true);
  if (remainingFloatPart == 0) return strMinutes;

  const remainingSeconds = remainingFloatPart * 60;
  const strSeconds = handlePlural(remainingSeconds, "seconde", true);
  return `${strMinutes} et ${strSeconds}`;
};

// string formating

export const handlePlural = (
  dependingNumber: number,
  relatedString: string,
  returnFullWord = false
) => {
  if (!dependingNumber) return "";
  const pluralSuffix = dependingNumber > 1 ? "s" : "";
  const stringWithPlural = `${relatedString}${pluralSuffix}`;
  if (returnFullWord) return `${dependingNumber} ${stringWithPlural}`;
  return stringWithPlural;
};

export const convertToFrenchDateFormat = (inputDate: string): string => {
  const dateObj = new Date(inputDate);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Janvier = 0
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};
