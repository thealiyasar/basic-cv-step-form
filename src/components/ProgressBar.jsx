import { useFormStore } from "../store/formStore";
import { useLanguageStore } from "../store/languageStore";

const ProgressBar = () => {
  const { t } = useLanguageStore();
  const steps = [
    t("stepOneTitle"),
    t("stepTwoTitle"),
    t("stepThreeTitle"),
    t("stepFourTitle"),
    t("stepFiveTitle"),
    t("stepSixTitle"),
  ];

  const step = useFormStore(state => state.step);
  const totalSteps = steps.length;

  return (
    <nav className="max-w-3xl mx-auto px-4 py-4">
      <div className="sm:hidden flex justify-center items-center space-x-2">
        <div className="rounded-full bg-blue-600 text-white h-8 w-8 flex items-center justify-center font-semibold">
          {step}
        </div>
        <span className="font-semibold text-blue-600 text-lg dark:text-blue-400">
          {steps[step - 1]}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          ({step} / {totalSteps})
        </span>
      </div>

      <ol className="hidden sm:flex justify-between relative">
        {steps.map((label, index) => {
          const stepIndex = index + 1;
          const isActive = step === stepIndex;
          const isCompleted = step > stepIndex;

          return (
            <li
              key={label}
              className="flex flex-col items-center w-full relative"
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-4 left-full h-1 w-full
                    ${
                      isCompleted
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  style={{ zIndex: -1 }}
                />
              )}

              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center
                ${
                  isCompleted
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "bg-blue-400 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                }`}
              >
                {stepIndex}
              </div>

              <span
                className={`mt-2 text-xs text-center w-24
                ${
                  isActive
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressBar;
