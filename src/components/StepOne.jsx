import { useForm } from "react-hook-form";
import { useFormStore } from "../store/formStore";
import InputField from "../components/InputField";
import { useLanguageStore } from "../store/languageStore";

const StepOne = () => {
  const { data, updateField, nextStep } = useFormStore();
  const { t } = useLanguageStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    },
  });

  const onSubmit = formData => {
    Object.entries(formData).forEach(([key, value]) => updateField(key, value));
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {t("stepOneTitle")}
      </h2>

      <InputField
        label={t("firstName")}
        name="firstName"
        register={register}
        required
        errors={errors}
      />

      <InputField
        label={t("lastName")}
        name="lastName"
        register={register}
        required
        errors={errors}
      />

      <InputField
        label={t("email")}
        type="email"
        name="email"
        register={register}
        required
        errors={errors}
      />

      <InputField
        label={t("phone")}
        type="tel"
        name="phone"
        register={register}
        required
        errors={errors}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
      >
        {t("next")}
      </button>
    </form>
  );
};

export default StepOne;
