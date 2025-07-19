import { useForm, useFieldArray } from "react-hook-form";
import { useFormStore } from "../store/formStore";
import InputField from "../components/InputField";
import { useEffect } from "react";
import { useLanguageStore } from "../store/languageStore";

const StepTwo = () => {
  const { t } = useLanguageStore();
  const {
    data,
    updateNestedArray,
    addNestedItem,
    removeNestedItem,
    nextStep,
    prevStep,
  } = useFormStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: data.education.length
        ? data.education
        : [{ school: "", degree: "", graduationYear: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    if (!data.education || data.education.length === 0) {
      addNestedItem("education", {
        school: "",
        degree: "",
        graduationYear: "",
      });
    }
  }, [data.education, addNestedItem]);

  const onSubmit = formData => {
    updateNestedArray("education", formData.education);
    nextStep();
  };

  const handleAdd = () => {
    append({ school: "", degree: "", graduationYear: "" });
    addNestedItem("education", { school: "", degree: "", graduationYear: "" });
  };

  const handleRemove = index => {
    if (fields.length > 1) {
      remove(index);
      removeNestedItem("education", index);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {t("stepTwoTitle")}
      </h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-300 dark:border-gray-700 p-4 rounded-md relative space-y-4"
        >
          <InputField
            label={t("schoolName")}
            name="school"
            register={register}
            required={true}
            errors={errors}
            parentField="education"
            index={index}
            onChangeCustom={updateNestedArray}
          />

          <InputField
            label={t("educationDegree")}
            name="degree"
            register={register}
            required={true}
            errors={errors}
            parentField="education"
            index={index}
            onChangeCustom={updateNestedArray}
          />

          <InputField
            label={t("graduationYear")}
            name="graduationYear"
            type="number"
            register={register}
            required={true}
            errors={errors}
            parentField="education"
            index={index}
            onChangeCustom={updateNestedArray}
          />

          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
            >
              {t("delete")}
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded transition-colors duration-300"
        >
          {t("back")}
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {t("addNewEdu")}
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            {t("next")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;
