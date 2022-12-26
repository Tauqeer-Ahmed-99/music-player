import React, { useState, useCallback, useEffect } from "react";

export type FieldValue = string | FileList | boolean;
type ObjectOfFormValuesWhereKeyNamesMatchedWithInputFieldNames = {
  [key: string]: {
    value: string | boolean | null | FileList;
    validate: (fieldValue: FieldValue) => boolean;
  };
};
type FormValues = { [key: string]: string | boolean | FileList };
type FormErrors = { [key: string]: boolean };
type InputOnChangeFunction = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;
type InputOnBlurFunction = (event: React.FocusEvent<HTMLInputElement>) => void;
type ResetFormFunction = () => void;
type ResetFormValuesFunction = () => void;
type ResetFormErrorsFunction = () => void;
type ValidateFormFunction = () => boolean;

const useForm = (
  initialValues: ObjectOfFormValuesWhereKeyNamesMatchedWithInputFieldNames
) => {
  const initialErrors: any = { ...initialValues };

  for (const fieldError in initialErrors) {
    initialErrors[fieldError] = false;
  }

  const [values, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState(initialErrors as FormErrors);
  const [event, setEvent] =
    useState<React.ChangeEvent<HTMLInputElement> | null>();

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const validateForm = useCallback(
    (
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLInputElement>,
      checkForMatch = false
    ) => {
      if (checkForMatch) {
        const confirmFieldName =
          event.target.name.charAt(0).toUpperCase() +
          event.target.name.slice(1);
        setFieldErrors((prevState) => ({
          ...prevState,
          [event.target.name]: values[event.target.name].validate(
            event.target.value
          ),
          [`confirm${confirmFieldName}`]:
            values[`confirm${confirmFieldName}`]?.validate(
              event.target.value
            ) ||
            event.target.value !== values[`confirm${confirmFieldName}`]?.value,
        }));
      } else {
        setFieldErrors((prevState) => ({
          ...prevState,
          [event.target.name]: values[event.target.name].validate(
            event.target.value
          ),
        }));
      }
    },
    [values]
  );

  useEffect(() => {
    if (event) {
      validateForm(event, true);
    }
  }, [values, event, validateForm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "radio" || event.target.type === "checkbox") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.checked,
          validate: prevValues[event.target.name].validate,
        },
      }));
    } else if (event.target.type === "file") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.files as FileList,
          validate: prevValues[event.target.name].validate,
        },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.value,
          validate: prevValues[event.target.name].validate,
        },
      }));
    }
    setEvent(event);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    validateForm(event);
  };

  const resetForm = () => {
    setEvent(null);
    setFormValues(initialValues);
    setFieldErrors(initialErrors as FormErrors);
  };

  const validateFormFunction = () => {
    const errors: boolean[] = [];
    for (const fieldName in values) {
      const fieldError = values[fieldName].validate(
        values[fieldName].value as FieldValue
      );
      setFieldErrors((prevValues) => ({
        ...prevValues,
        [fieldName]: fieldError,
      }));
      errors.push(fieldError);
    }
    return !errors.some((error) => error);
  };

  const resetValues = () => {
    setEvent(null);
    setFormValues(initialValues);
  };

  const resetErrors = () => {
    setEvent(null);
    setFieldErrors(initialErrors as FormErrors);
  };

  const formValues: FormValues = {};

  for (const field in values) {
    formValues[field] = values[field].value as FieldValue;
  }

  return [
    formValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateFormFunction,
    resetForm,
    resetValues,
    resetErrors,
  ] as [
    FormValues,
    FormErrors,
    InputOnChangeFunction,
    InputOnBlurFunction,
    ValidateFormFunction,
    ResetFormFunction,
    ResetFormValuesFunction,
    ResetFormErrorsFunction
  ];
};

export default useForm;
