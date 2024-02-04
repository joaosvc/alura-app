import ReactLoading from "react-loading";

interface IFormNavigationButtonsProps {
  currentStep: number;
  lastStep: number;
  loading: boolean;
  currentFieldsFilled: boolean;
  handleBackStep: () => void;
}

export default function FormNavigationButtons({
  currentStep,
  lastStep,
  loading,
  currentFieldsFilled,
  handleBackStep,
}: IFormNavigationButtonsProps) {
  return (
    <div className="items-center justify-between flex space-x-4">
      {currentStep > 0 && (
        <button
          type="button"
          className="w-20 border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onClick={handleBackStep}
        >
          Voltar
        </button>
      )}

      {currentStep < lastStep ? (
        <button
          type="submit"
          className="flex-grow border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-700"
        >
          Próximo
        </button>
      ) : (
        <button
          type="submit"
          className={`flex-grow border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative ${
            loading
              ? "cursor-not-allowed"
              : currentFieldsFilled && "bg-gray-700"
          }`}
          disabled={loading || !currentFieldsFilled}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <ReactLoading
                type="spin"
                color="#ffffff"
                height={18}
                width={18}
              />
              <span className="ml-2">Criando conta...</span>
            </span>
          ) : (
            "Crie uma conta"
          )}
        </button>
      )}
    </div>
  );
}
