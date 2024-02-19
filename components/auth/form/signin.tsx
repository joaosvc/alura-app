"use client";

import FormAccountLink from "@/components/auth/elements/account-link";
import FormInput from "@/components/auth/elements/input";
import FormLabel from "@/components/auth/elements/label";
import FormNavigationButtons from "@/components/auth/elements/navigation";
import { IAuthFormData } from "@/components/auth/form/protocols";
import { IAuthFormDataErrors } from "@/components/auth/form/protocols";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormError from "../elements/error";

const steps: string[][] = [["email"], ["password"]];

const initialFormData = steps.reduce(
  (acc, stepFields) =>
    stepFields.reduce((stepAcc, field) => ({ ...stepAcc, [field]: "" }), acc),
  {}
);

export default function SigninForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAuthFormData>(initialFormData);
  const [formDataErrors, setFormDataErrors] = useState<IAuthFormDataErrors>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentFieldsFilled, setCurrentFieldsFilled] =
    useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addFormDataError = (field: string, message: string) => {
    setFormDataErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const removeFormDataError = (field: string) => {
    setFormDataErrors((prevErrors) => {
      const { [field]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  useEffect(() => {
    setCurrentFieldsFilled(
      steps[currentStep].every((field) => formData[field]?.trim())
    );
  }, [formData, currentStep]);

  const handleBackStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleSubmitErrors = (
    responseOk: boolean,
    response: any,
    handleForm: boolean = false
  ): boolean => {
    const errorsQueries = [];
    const cleanErrorsQueries = [];

    if (!handleForm) {
      if (response.error === "user-not-found") {
        setCurrentStep(0);

        errorsQueries.push({
          field: "email",
          message: "Nenhum usuário encontrado com este email",
        });
        responseOk = false;
      } else if (formDataErrors["email"]) {
        cleanErrorsQueries.push("email");
      }

      if (response.error === "invalid-credentials") {
        setCurrentStep(1);

        errorsQueries.push({
          field: "password",
          message: "Senha inválida",
        });
        responseOk = false;
      } else if (formDataErrors["password"]) {
        cleanErrorsQueries.push("password");
      }
    }

    errorsQueries.forEach(({ field, message }) =>
      addFormDataError(field, message)
    );
    cleanErrorsQueries.forEach((field) => removeFormDataError(field));

    return !responseOk;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (currentFieldsFilled) {
      const isLastStep = currentStep === steps.length - 1;

      if (isLastStep) {
        setLoading(true);

        const response = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (handleSubmitErrors(response?.ok ?? false, response)) {
          return setLoading(false);
        }

        router.push("/");
      } else {
        handleNextStep();
      }
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {currentStep === 0 && (
        <div>
          {formDataErrors["email"] && (
            <FormError>{formDataErrors["email"]}</FormError>
          )}
          <FormLabel htmlFor="email">Seu email</FormLabel>
          <FormInput
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="name@company.com"
            error={formDataErrors["email"]?.toString()}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
      )}
      {currentStep === 1 && (
        <div>
          {formDataErrors["password"] && (
            <FormError>{formDataErrors["password"]}</FormError>
          )}
          <FormLabel htmlFor="password">Senha</FormLabel>
          <FormInput
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="••••••••"
            error={formDataErrors["password"]?.toString()}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
      )}

      <FormNavigationButtons
        currentStep={currentStep}
        lastStep={steps.length - 1}
        loading={loading}
        currentFieldsFilled={currentFieldsFilled}
        handleBackStep={handleBackStep}
        holder="Entrar na sua conta"
        onHolder="Entrando na conta..."
      />

      <FormAccountLink href="signup" holder="Crie aqui">
        Não possui uma conta?
      </FormAccountLink>
    </form>
  );
}
