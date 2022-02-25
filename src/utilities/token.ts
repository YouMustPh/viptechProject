export function getToken() {
  return localStorage.getItem("token");
}

export function putToken(value: string) {
  localStorage.setItem("token", value);
}

export function removeToken() {
  localStorage.removeItem("token");
}
