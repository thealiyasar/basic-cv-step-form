import { useFormStore } from "../store/formStore";
import { useForm } from "react-hook-form";
import { useLanguageStore } from "../store/languageStore";

const StepFive = () => {
  const { t } = useLanguageStore();
  const { data, updateField, nextStep, prevStep } = useFormStore();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    nextStep();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      updateField("cvFile", file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {t("stepFiveTitle")}
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="w-full text-gray-700 dark:text-gray-300"
      />

      {data.cvFile && (
        <p className="text-sm text-green-600 dark:text-green-400">
          {t("uploadedFile")} {data.cvFile.name}
        </p>
      )}

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
          {t("submit")}
        </button>
      </div>
    </form>
  );
};

export default StepFive;
