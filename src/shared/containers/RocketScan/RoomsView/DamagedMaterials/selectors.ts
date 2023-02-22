export const customDamagedMaterialCreatedSelector = ({
  damagedMaterials: { customDamagedMaterialCreated: value = false },
}: any) => value;
export const creatingCustomDamagedMaterialSelector = ({
  damagedMaterials: { creatingCustomDamagedMaterial: value = false },
}: any) => value;

export const customDamagedMaterialUpdatedSelector = ({
  damagedMaterials: { customDamagedMaterialUpdated: value = false },
}: any) => value;
export const editingCustomDamagedMaterialsSelector = ({
  damagedMaterials: { editingCustomDamagedMaterial: value = false },
}: any) => value;

export const customDamagedMaterialDeletedSelector = ({
  damagedMaterials: { customDamagedMaterialDeleted: value = false },
}: any) => value;

// errors
export const nameErrorSelector = ({ damagedMaterials: { createCustomDamagedMaterialErrors } }: any) =>
  createCustomDamagedMaterialErrors?.name || [];
