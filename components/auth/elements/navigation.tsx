import ReactLoading from "react-loading";
import FormButton from "./button";

interface IFormNavigationButtonsProps {
  currentStep: number;
  lastStep: number;
  loading: boolean;
  holder: string;
  onHolder: string;
  currentFieldsFilled: boolean;
  handleBackStep: () => void;
}

export default function FormNavigationButtons({
  currentStep,
  lastStep,
  loading,
  currentFieldsFilled,
  holder,
  onHolder,
  handleBackStep,
}: IFormNavigationButtonsProps) {
  return (
    <div className="items-center justify-between flex space-x-4">
      {currentStep > 0 && (
        <FormButton
          type="button"
          className={`w-20 bg-transparent dark:bg-transparent ${
            loading && "cursor-not-allowed"
          }`}
          onClick={handleBackStep}
          disabled={loading}
        >
          Voltar
        </FormButton>
      )}

      {currentStep < lastStep ? (
        <FormButton
          type="submit"
          className={`${
            !currentFieldsFilled && "bg-transparent dark:bg-transparent"
          }`}
          disabled={loading}
        >
          Próximo
        </FormButton>
      ) : (
        <FormButton
          type="submit"
          className={`${loading && "cursor-not-allowed"} ${
            currentFieldsFilled && !loading
              ? "bg-gray-100 dark:bg-gray-700"
              : "bg-transparent dark:bg-transparent"
          }`}
          disabled={loading || !currentFieldsFilled}
        >
          {loading ? (
            <span className="flex items-center justify-center text-gray-700 dark:text-white">
              <ReactLoading type="spin" height={17} width={17} />
              <span className="ml-2">{onHolder}</span>
            </span>
          ) : (
            holder
          )}
        </FormButton>
      )}
    </div>
  );
}
