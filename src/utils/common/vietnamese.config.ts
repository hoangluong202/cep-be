function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function convertVietnameseNameToKey(name: string) {
  const nameWithoutAccents = removeAccents(name);
  return nameWithoutAccents
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

export { convertVietnameseNameToKey };
