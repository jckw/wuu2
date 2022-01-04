export const usernameRegEx =
  /^([A-Za-z0-9](?:(?:[A-Za-z0-9]|(?:\.(?!\.))){0,50}(?:[A-Za-z0-9]))?)$/

export const validate = (username: string) => usernameRegEx.test(username)
