const legacyFlooringWhitelist = ['Carpet', 'Laminate', 'Engineered', 'Hardwood', 'Concrete'];

const legacyWallsWhitelist = ['Interior Wall', 'Fire Wall', 'Exterior Wall'];

const legacyCeilingWhitelist = [
  'Flat Drywall Ceiling',
  'Textured Drywall',
  'Ceiling Tile',
  'Concrete',
  'Concrete Textured',
];

const legacyPlumbingWhitelist = ['Countertop', 'Vanity Unit'];

const legacyStructuralWhitelist = [
  'Baseboard',
  'Countertop',
  'Door Trim',
  'Drywall',
  'Full Height Cabinetry',
  'Insulation',
  'Lower Cabinetry',
  'Shelving',
  'Upper Cabinetry',
  'Vanity Unit',
  'Window Board',
];

export const legacyWhitelists = {
  flooring: legacyFlooringWhitelist,
  walls: legacyWallsWhitelist,
  ceiling: legacyCeilingWhitelist,
  plumbing: legacyPlumbingWhitelist,
  structural: legacyStructuralWhitelist,
};

const carpentryWhitelist = [
  'Door',
  'Door - Double',
  'Crown Molding',
  'Window board',
  'Door trim',
  'Baseboard',
  'Cabinetry - lower',
  'Cabinetry - upper',
  'Cabinetry - full height',
  'Toe kick',
  'Door - Bifold',
  'Countertop - Laminate',
  'Vanity unit',
  'Furring strip',
];

const ceilingWhitelist = [
  'Ceiling tile',
  'Concrete',
  'Concrete Textured',
  'Flat Drywall',
  'Popcorn ceiling',
  'Textured ceiling',
  'Textured drywall',
];

const flooringWhitelist = [
  'Carpet',
  'Carpet pad',
  'Lift carpet for drying',
  'Underlay',
  'Hardwood',
  'Tackless strip',
  'Engineered wood flooring',
  'Floating floor',
  'Concrete',
];

const plumbingWhitelist = ['Countertop', 'Vanity Unit'];

const wallsWhitelist = [
  '5/8" drywall',
  '5/8" drywall - 4"',
  '5/8" drywall - 2\'',
  '1/2" - drywall - 4"',
  'Insulation - Batt',
  '1/2" drywall',
  '1/2" - drywall - 2\'',
  'Tape joint for new to existing drywall',
  'Texture drywall - smooth / skim coat',
  'Drywall Installer / Finisher - per hour',
  'Tile',
  'Wainscoting',
  'Dado rail',
  'Insulation - Loose-fill',
  'Insulation - Rigid foams',
  'Insulation - Spray foam',
];

export const dryingWhitelists = {
  carpentry: carpentryWhitelist,
  ceiling: ceilingWhitelist,
  flooring: flooringWhitelist,
  plumbing: plumbingWhitelist,
  walls: wallsWhitelist,
};
// Appliances, Cleaning, Electrical, Misc, Mitigation, Protection don't have dryable materials
