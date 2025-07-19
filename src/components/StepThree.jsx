import { useForm, useFieldArray } from "react-hook-form";
import { useFormStore } from "../store/formStore";
import InputField from "../components/InputField";
import { useEffect } from "react";
import { useLanguageStore } from "../store/languageStore";

const StepThree = () => {
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
      experience: data.experience.length
        ? data.experience
        : [{ company: "", position: "", duration: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    if (!data.experience || data.experience.length === 0) {
      addNestedItem("experience", { company: "", position: "", duration: "" });
    }
  }, [data.experience, addNestedItem]);

  const onSubmit = formData => {
    updateNestedArray("experience", formData.experience);
    nextStep();
  };

  const handleAdd = () => {
    append({ company: "", position: "", duration: "" });
    addNestedItem("experience", { company: "", position: "", duration: "" });
  };

  const handleRemove = index => {
    if (fields.length > 1) {
      remove(index);
      removeNestedItem("experience", index);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {t("stepThreeTitle")}
      </h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-300 dark:border-gray-700 p-4 rounded-md relative space-y-4"
        >
          <InputField
            label={t("companyName")}
            name="company"
            register={register}
            required={true}
            errors={errors}
            parentField="experience"
            index={index}
            onChangeCustom={updateNestedArray}
          />

          <InputField
            label={t("position")}
            name="position"
            register={register}
            required={true}
            errors={errors}
            parentField="experience"
            index={index}
            onChangeCustom={updateNestedArray}
          />

          <InputField
            label={t("workingTime")}
            name="duration"
            register={register}
            required={true}
            errors={errors}
            parentField="experience"
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
            {t("addNewWork")}
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

export default StepThree;
