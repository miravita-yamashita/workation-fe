import { FieldErrors, FieldValues, Path } from "react-hook-form";

type FormMessageGeneratorProps<T extends FieldValues> = {
  formStateField: FieldErrors<T>[Path<T>];
};

const getAllErrors = <T extends FieldValues>(
  formStateField: FieldErrors<T>[Path<T>],
) => {
  const types = formStateField?.types as { [key: string]: string } | undefined;

  if (types) {
    return Object.keys(types)?.map((type) => types[type] as string);
  }

  return [];
};

export const MultipleErrorMessage = <T extends FieldValues>({
  formStateField,
}: FormMessageGeneratorProps<T>) => {
  const errorMessage = getAllErrors(formStateField);
  return (
    <div className="mt-2 flex flex-col gap-2">
      {errorMessage?.map((message, index) => {
        return (
          <p
            key={`${index}_${Math.random()}`}
            className="font-open text-red text-sm"
          >
            {message}
          </p>
        );
      })}
    </div>
  );
};
