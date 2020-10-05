export const dollarAmountDisplay = (params) => {
  if (!params.value) {
    return '--';
  }
  return params.value.toFixed(2);
};

export const defaultDetails = {
  name: '',
  numDependants: null,
  annualSalary: 52000,
  yearlyEmployeeBenefitsCost: 1000,
  yearlyDependantBenefitsCost: 500,
  percentEmployeeBenefitsPaidByEmployer: 100,
  percentDependantBenefitsPaidByEmployer: 50
};

export const namePlaceholderRenderer = (params) => {
  if (params.value) {
    return params.value;
  }
  return `Enter name...`;
};
