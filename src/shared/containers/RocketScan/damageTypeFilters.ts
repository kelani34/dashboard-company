export const getDamageTypeVersion = (materialName: string) => {
  if (newDamageTypes.some((type) => type === materialName)) {
    return 'new';
  }
  if (oldDamageTypes.some((type) => type === materialName)) {
    return 'old';
  }
  return 'common';
};

const newDamageTypes = ['Carpentry', 'Cleaning', 'Miscellaneous', 'Mitigation', 'Protection'];

const oldDamageTypes = ['Exterior', 'Roofing', 'Structural'];
