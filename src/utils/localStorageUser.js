function getStorageKey(uid) {
  return `userData_${uid}`;
}

export function saveUserData(uid, data) {
  localStorage.setItem(getStorageKey(uid), JSON.stringify(data));
}

export function getUserData(uid) {
  try {
    const data = JSON.parse(localStorage.getItem(getStorageKey(uid)));
    return data || {};
  } catch (error) {
    console.warn("Error leyendo localStorage:", error);
    return {};
  }
}

export function updateUserData(uid, updatedFields) {
  const current = getUserData(uid);
  const newData = { ...current, ...updatedFields };
  localStorage.setItem(getStorageKey(uid), JSON.stringify(newData));
}

export function clearUserData(uid) {
  localStorage.removeItem(getStorageKey(uid));
}
