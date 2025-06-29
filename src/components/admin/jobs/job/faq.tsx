"use client";

import { FieldGenericInput, FieldLabelGroup } from "@/components/feature/form";
import { FieldGenericSelect } from "@/components/feature/form/field-generic-select";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { JobSelectOptionsType } from "./lib";

// Define the types for the component props
interface FAQProps {
  // eslint-disable-next-line
  formHook: UseFormReturn<any>;
  isCustom: string;
  formInputNameQuestion: string;
  formInputNameAnswer: string;
  questionLabel: string;
  answerLabel: string;
  faqOptions: JobSelectOptionsType[];
}

const FAQ = ({
  formHook,
  isCustom,
  formInputNameQuestion,
  formInputNameAnswer,
  questionLabel,
  answerLabel,
  faqOptions,
}: FAQProps) => {
  // Local state to control the input value for the question field
  const [inputVal, setInputVal] = useState("");
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [isSelectFilled, setIsSelectFilled] = useState(true);
  // Register the question field (if not already registered)

  // Register the form fields once on mount
  useEffect(() => {
    formHook.register(formInputNameQuestion);
    formHook.register(isCustom);
  }, [formHook, formInputNameQuestion, isCustom]);

  useEffect(() => {
    const currentIsCustomValue = formHook.getValues(isCustom);
    if (currentIsCustomValue === undefined) {
      formHook.setValue(
        isCustom,
        formHook.getValues(formInputNameQuestion) ? "0" : "3",
      );
    }
  }, [formHook, formInputNameQuestion, isCustom]); // Only depend on these values, no dynamic arrays

  // Update the isInputFilled flag whenever the input value changes
  useEffect(() => {
    setIsInputFilled(inputVal.trim() !== "");
    if (inputVal.trim() !== "") {
      // Set the form value for the question input if filled
      formHook.setValue(formInputNameQuestion, inputVal);
    }
  }, [inputVal, formHook, formInputNameQuestion]); // Dependency on `inputVal`

  // Handle the select change
  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue) {
      setIsSelectFilled(true);

      formHook.setValue(formInputNameQuestion, inputVal);
      formHook.setValue(isCustom, "0");
    } else {
      setIsSelectFilled(false);
      formHook.setValue(isCustom, "1");
    }
    if (!inputVal.trim()) {
      // If the input is empty, update the form with the selected value
      formHook.setValue(formInputNameQuestion, selectedValue);
    }
  };

  // Handle input field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputVal(newValue);
    // If the input is filled, update the form value regardless of the select input
    if (newValue.trim() !== "") {
      formHook.setValue(formInputNameQuestion, newValue);
      formHook.setValue(isCustom, "1");
    } else if (!isInputFilled && newValue.trim() === "") {
      // If input is cleared, reset the form value to an empty string
      formHook.setValue(formInputNameQuestion, "");
      formHook.setValue(isCustom, "0");
    }
  };

  return (
    <div className="space-y-5">
      <FieldLabelGroup className="relative">
        <FieldGenericSelect
          formHook={formHook}
          formInputName={formInputNameQuestion}
          labelText={questionLabel}
          selectPlaceholder="選択してください"
          variant="secondary"
          isAdmin={true}
          dropdownValues={faqOptions}
          formLabelClassName="font-bold text-base"
          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
          isDisabled={isInputFilled} // Disable the select when input is filled
          onChange={handleSelectChange} // Handle select change
        />
        {isInputFilled && (
          <p className="absolute left-[1rem] top-[2.8125rem] text-sm text-[#c6b2b2]">
            選択してください
          </p>
        )}
        {!isInputFilled && !isSelectFilled && (
          <p className="absolute left-[1rem] top-[2.8125rem] text-sm text-[#737373]">
            選択してください
          </p>
        )}
      </FieldLabelGroup>

      {/* Plain HTML input for the question */}
      <input
        type="text"
        value={inputVal}
        onChange={handleInputChange}
        placeholder="質問1の入力"
        className="w-full rounded border px-3 py-2"
      />

      {/* For the answer, using your FieldGenericInput directly */}
      <FieldGenericInput
        disabled={isSelectFilled || !isInputFilled}
        formHook={formHook}
        formInputName={formInputNameAnswer}
        labelText={answerLabel}
        variant="secondary"
        formInputClassName="w-full"
        isAdmin={true}
        placeholder=""
        formLabelClassName="font-bold text-base"
      />
    </div>
  );
};

export default FAQ;
