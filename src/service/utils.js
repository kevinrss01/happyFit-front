// LocalStorage Utils

export const getItemFromLocalStorage = (itemField) => {
  if (itemField in localStorage) {
    const item = localStorage.getItem(itemField);
    return JSON.parse(item);
  }
  return false;
};

// JWT utils

// 1 hour in milliseconds
const TOKEN_LIFE_DURATION = 3600000;
// 15 days in milliseconds
const REFRESH_TOKEN_LIFE_DURATION = 1296000000;
const TOKEN_ACCESSOR = "userTokens";

export const saveTokensOnLocalStorage = (token, refreshToken) => {
  const tokenDate = Date.now();
  const refreshTokenDate = tokenDate;
  const tokensObject = { token, tokenDate, refreshToken, refreshTokenDate };
  localStorage.setItem(TOKEN_ACCESSOR, JSON.stringify(tokensObject));
};

export const refreshTokenOnLocalStorage = (token) => {
  const tokenDate = Date.now();
  const tokenObject = getItemFromLocalStorage(TOKEN_ACCESSOR);
  tokenObject.tokenDate = tokenDate;
  tokenObject.token = token;
};

export const assessTokenValidity = () => {
  const tokenObject = getItemFromLocalStorage(TOKEN_ACCESSOR);
  if (!tokenObject) return false;

  const status = { refresh: false, token: "" };
  const { token, tokenDate } = tokenObject;
  if (tokenStillAlive(tokenDate, TOKEN_LIFE_DURATION)) {
    return handleTokenValid(status, token);
  } else {
    const { refreshToken, refreshTokenDate } = tokenObject;
    const refreshTokenIsValid = tokenStillAlive(
      refreshTokenDate,
      REFRESH_TOKEN_LIFE_DURATION
    );
    return refreshTokenIsValid
      ? handleRefreshTokenValid(status, refreshToken)
      : false;
  }
};

const tokenStillAlive = (tokenDate, tokenLifeDuration) =>
  Date.now() - tokenDate < tokenLifeDuration;

const handleTokenValid = (status, token) => {
  status.token = token;
  return status;
};

const handleRefreshTokenValid = (status, token) => {
  status.refresh = true;
  return handleTokenValid(status, token);
};

// time computation for rest

export const computeInMinutes = (seconds) => {
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
  dependingNumber,
  relatedString,
  returnFullWord = false
) => {
  const pluralSuffix = dependingNumber > 1 ? "s" : "";
  const stringWithPlural = `${relatedString}${pluralSuffix}`;
  if (returnFullWord) return `${dependingNumber} ${stringWithPlural}`;
  return stringWithPlural;
};
