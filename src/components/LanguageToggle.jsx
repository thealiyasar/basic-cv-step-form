import { useLanguageStore } from "../store/languageStore";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    { code: "en", label: "EN" },
    { code: "tr", label: "TR" },
  ];

  return (
    <div className="flex gap-2">
      {languages.map(({ code, label }) => {
        const isActive = language === code;

        const baseClasses = "flex-1 p-2 rounded transition-colors duration-300";

        const activeClasses =
          "bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600";

        const inactiveClasses =
          "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600";

        return (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`${baseClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
