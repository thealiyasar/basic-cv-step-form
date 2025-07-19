import { useLanguageStore } from "../store/languageStore";

const InputField = ({
  label,
  type = "text",
  register,
  required = false,
  errors,
  name,
  placeholder,
  rows,
  parentField, 
  index, 
  onChangeCustom, 
}) => {
  const { t } = useLanguageStore();

  const fieldPath =
    parentField !== undefined ? `${parentField}.${index}.${name}` : name;

  const hasError = parentField
    ? errors?.[parentField]?.[index]?.[name]
    : errors?.[name];

  const inputClass = `w-full rounded-md border p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
    ${
      hasError
        ? "border-red-600 focus:border-red-600 focus:ring-red-600"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    }
    transition-colors duration-300
  `;

  const sharedProps = {
    id: fieldPath,
    ...register(fieldPath, { required }),
    placeholder: placeholder ? t(placeholder) : "",
    className: inputClass,
    onChange: e => { 
      if (onChangeCustom && parentField !== undefined) {
        onChangeCustom(index, name, e.target.value);
      }
    },
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={fieldPath}
        className={`block mb-1 font-medium ${
          hasError
            ? "text-red-600 dark:text-red-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {t(label)} {required && <span className="text-red-600">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea rows={rows || 4} {...sharedProps} />
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {hasError && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {t("required")}
        </p>
      )}
    </div>
  );
};

export default InputField;
