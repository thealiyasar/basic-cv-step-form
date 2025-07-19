import { useFormStore } from "../store/formStore";
import { useLanguageStore } from "../store/languageStore";

const StepSix = () => {
  const { t } = useLanguageStore();
  const { data, resetForm } = useFormStore();

  const handleRestart = () => {
    resetForm();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6 max-w-xl mx-auto transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {t("weldone")}
      </h2>

      <div className="text-gray-800 dark:text-gray-300 space-y-4">
        <p>
          <strong>
            {t("firstName")} {t("lastName")} :
          </strong>
          {data.firstName} {data.lastName}
        </p>
        <p>
          <strong>{t("email")} :</strong> {data.email}
        </p>
        <p>
          <strong>{t("phone")} :</strong> {data.phone}
        </p>

        <div>
          <strong>{t("stepTwoTitle")} :</strong>
          {data.education && (
            <div className="grid grid-cols-1 gap-4 mt-2">
              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="border rounded p-3 bg-gray-50 dark:bg-gray-700"
                >
                  <p>
                    <strong>{t("schoolName")} :</strong> {edu.school || "-"}
                  </p>
                  <p>
                    <strong>{t("educationDegree")} :</strong>{" "}
                    {edu.degree || "-"}
                  </p>
                  <p>
                    <strong>{t("graduationYear")} :</strong>{" "}
                    {edu.graduationYear || "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <strong>{t("stepThreeTitle")}:</strong>
          {data.experience && (
            <div className="grid grid-cols-1 gap-4 mt-2">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="border rounded p-3 bg-gray-50 dark:bg-gray-700"
                >
                  <p>
                    <strong>{t("companyName")} :</strong> {exp.position || "-"}
                  </p>
                  <p>
                    <strong>{t("position")} :</strong> {exp.company || "-"}
                  </p>
                  <p>
                    <strong>{t("workingTime")} :</strong> {exp.duration || "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p>
          <strong>{t("stepFourTitle")} : </strong>
          <br />
          {data.skills}
        </p>

        {data.cvFile ? (
          <p>
            <strong>{t("uploadedFile")} :</strong> {data.cvFile.name}
          </p>
        ) : (
          <p>{t("noFileUpload")}</p>
        )}
      </div>

      <button
        onClick={handleRestart}
        className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-5 py-2 rounded transition-colors duration-300"
      >
        {t("restart")}
      </button>
    </div>
  );
};

export default StepSix;
