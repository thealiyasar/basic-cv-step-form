import { useForm } from "react-hook-form";
import { useFormStore } from "../store/formStore";
import InputField from "../components/InputField";
import { useLanguageStore } from "../store/languageStore";

const StepFour = () => {
  const { t } = useLanguageStore();
  const { data, updateField, nextStep, prevStep } = useFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: data.skills,
    },
  });

  const onSubmit = formData => {
    updateField("skills", formData.skills);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {t("stepFourTitle")}
      </h2>

      <InputField
        label={t("description")}
        name="skills"
        type="textarea"
        register={register}
        required
        errors={errors}
        placeholder={t("expCertPL")}
        rows={5}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded transition-colors duration-300"
        >
          {t("back")}
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          {t("next")}
        </button>
      </div>
    </form>
  );
};

export default StepFour;
