export const inviteCompanyInfoSelector = ({ basicCompanyInfo: { companyId, name, logoUrl, countryAlpha } }: any) => ({
  companyId,
  name,
  logoUrl,
  countryAlpha,
});
export const validatedSelector = ({ signinhow: { validated: value } }: any) => value;
