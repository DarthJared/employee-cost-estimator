export const dollarAmountDisplay = (params) => {
  if (!params.value) {
    return '--';
  }
  return params.value.toFixed(2);
};

export function getDefaultDetails(): any {
  return {
    name: '',
    numDependants: null,
    annualSalary: 52000,
    yearlyEmployeeBenefitsCost: 1000,
    yearlyDependantBenefitsCost: 500,
    percentEmployeeBenefitsPaidByEmployer: 100,
    percentDependantBenefitsPaidByEmployer: 50
  };
}

export function getPlaceholderRenderer(field: string): any {
  return (params) => {
    if (params.value) {
      return params.value;
    }
    return `Enter ${field}...`;
  };
}
