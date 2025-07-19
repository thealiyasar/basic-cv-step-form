import { useFormStore } from "./store/formStore";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import ProgressBar from "./components/ProgressBar";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import StepSix from "./components/StepSix";
import ThemeToggle from "./components/ThemeToggle";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";
import LanguageToggle from "./components/LanguageToggle";

const App = () => {
  const { darkMode } = useThemeStore();
  const { step } = useFormStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 overflow-auto transition-colors duration-300">
        <div className="absolute w-fit top-4 right-4">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4">
          <ProgressBar />
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
          {step === 4 && <StepFour />}
          {step === 5 && <StepFive />}
          {step === 6 && <StepSix />}
        </div>
      </div>
    </>
  );
};

export default App;
