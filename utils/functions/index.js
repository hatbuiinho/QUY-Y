const printByPattern = (pattern) => (format, data) =>
  format.replace(pattern, (match) => data[match.replace(/\W/g, '')]);

export const mapReceiverCardAddressDetail = (receiverCardAddress) => {
  if (!receiverCardAddress) {
    return '';
  }
  const { ward, district, province, name } = receiverCardAddress;
  const address = [
    [ward?.pre, ward?.name],
    [district?.pre, district?.name],
    [province?.pre, province?.name],
  ]
    .map((addr) => addr.join(' '))
    .join(', ');
  return { ...receiverCardAddress, name: `${name}, ${address}`, address };
};

export const formatUrl = printByPattern(/:(\w+)/g);
