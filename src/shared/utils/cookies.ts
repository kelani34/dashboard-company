export const cookieExists = (name: string) =>
  // Use find to get the first instance of the named cookie
  document.cookie.split(';').find((item) => item.trim().startsWith(`${name}=`)) !== undefined;
