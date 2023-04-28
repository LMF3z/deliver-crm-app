export const getItemStorage = (name: string = 'user_deliver_v1'): unknown =>
  JSON.parse(window.localStorage.getItem(name)!);

export const setItemStorage = (name = 'user_deliver_v1', data: unknown) =>
  window.localStorage.setItem(name, JSON.stringify(data));

export const removeItemStorage = (name = 'user_deliver_v1') =>
  window.localStorage.removeItem(name);
