export const handleSalaryRangeDisplay = ({
  minSalary,
  maxSalary,
}: {
  minSalary: string | null;
  maxSalary: string | null;
}) => {
  if (!minSalary && !maxSalary) return "-";

  if (minSalary && maxSalary) return `${minSalary}円～${maxSalary}円`;

  if (minSalary) return `${minSalary}円`;

  if (maxSalary) return `${maxSalary}円`;
};
