export const dollarAmountDisplay = (params) => {
  if (!params.value) {
    return '--';
  }
  return params.value.toFixed(2);
};

export function getAnnualAmountPaidByCompany(
  annualSalary: number,
  yearlyEmployeeBenefitsCost: number,
  yearlyDependantBenefitsCost: number,
  percentEmployeeBenefitsPaidByEmployer: number,
  percentDependantBenefitsPaidByEmployer: number,
  numDependants: number
): number {
  if (!annualSalary
    || !yearlyEmployeeBenefitsCost
    || !yearlyDependantBenefitsCost
    || !percentEmployeeBenefitsPaidByEmployer
    || !percentDependantBenefitsPaidByEmployer
    || !numDependants) {
    return null;
  }
  return (annualSalary + (yearlyEmployeeBenefitsCost * percentEmployeeBenefitsPaidByEmployer / 100)
    + (numDependants * yearlyDependantBenefitsCost * percentDependantBenefitsPaidByEmployer / 100));
}

export function getAnnualEmployeeSalaryAfterDeductions(
  annualSalary: number,
  yearlyEmployeeBenefitsCost: number,
  yearlyDependantBenefitsCost: number,
  percentEmployeeBenefitsPaidByEmployer: number,
  percentDependantBenefitsPaidByEmployer: number,
  numDependants: number
): number {
  if (!annualSalary
    || !yearlyEmployeeBenefitsCost
    || !yearlyDependantBenefitsCost
    || !percentEmployeeBenefitsPaidByEmployer
    || !percentDependantBenefitsPaidByEmployer
    || !numDependants) {
    return null;
  }
  return (annualSalary - (yearlyEmployeeBenefitsCost * (100 - percentEmployeeBenefitsPaidByEmployer) / 100)
    - (numDependants * (yearlyDependantBenefitsCost * (100 - percentDependantBenefitsPaidByEmployer) / 100)));
}
