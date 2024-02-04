"use client";

import FormAccountLink from "@/components/auth/elements/account-link";
import FormInput from "@/components/auth/elements/input";
import FormLabel from "@/components/auth/elements/label";
import FormNavigationButtons from "@/components/auth/elements/navigation";
import { IAuthFormData } from "@/components/auth/form/protocols";
import { IAuthFormDataErrors } from "@/components/auth/form/protocols";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormError from "../elements/error";

const steps: string[][] = [
  ["email"],
  ["name", "lastname"],
  ["password", "confirmPassword"],
];

const initialFormData = steps.reduce(
  (acc, stepFields) =>
    stepFields.reduce((stepAcc, field) => ({ ...stepAcc, [field]: "" }), acc),
  {}
);

export default function SignupForm() {
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

    if (handleForm) {
      if (formData.password !== formData.confirmPassword) {
        setCurrentStep(2);

        ["password", "confirmPassword"].forEach((field) =>
          errorsQueries.push({ field, message: "As senhas não coincidem" })
        );

        responseOk = false;
      } else if (formData.password.length < 8) {
        setCurrentStep(2);

        ["password", "confirmPassword"].forEach((field) =>
          errorsQueries.push({
            field,
            message: "A senha deve ter no mínimo 8 caracteres",
          })
        );

        responseOk = false;
      } else if (formData.password.length > 50) {
        setCurrentStep(2);

        ["password", "confirmPassword"].forEach((field) =>
          errorsQueries.push({
            field,
            message: "A senha deve ter no máximo 50 caracteres",
          })
        );

        responseOk = false;
      } else {
        ["password", "confirmPassword"].forEach((field) =>
          cleanErrorsQueries.push(field)
        );
      }
    } else {
      if (response.error === "email-exists") {
        setCurrentStep(0);

        errorsQueries.push({
          field: "email",
          message: "Esse email já está em uso",
        });

        responseOk = false;
      } else if (formDataErrors["email"]) {
        cleanErrorsQueries.push("email");
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

        if (handleSubmitErrors(true, {}, true)) {
          return setLoading(false);
        }

        const { confirmPassword, ...formDataRest } = formData;
        const response = await fetch("/api/auth/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataRest),
        });
        const responseJson = await response.json();

        if (handleSubmitErrors(response.ok, responseJson)) {
          return setLoading(false);
        }

        router.push("/signin");
        setLoading(false);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <FormInput
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Seu nome"
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div>
            <FormLabel htmlFor="lastname">Sobrenome</FormLabel>
            <FormInput
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              placeholder="Seu sobrenome"
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <>
          {formDataErrors["password"] && (
            <FormError>{formDataErrors["password"]}</FormError>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormInput
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleInputChange}
                error={formDataErrors["password"]?.toString()}
                disabled={loading}
              />
            </div>
            <div>
              <FormLabel htmlFor="confirm-password">Confirmar senha</FormLabel>
              <FormInput
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                placeholder="••••••••"
                onChange={handleInputChange}
                error={formDataErrors["confirmPassword"]?.toString()}
                disabled={loading}
              />
            </div>
          </div>
        </>
      )}

      <FormNavigationButtons
        currentStep={currentStep}
        lastStep={steps.length - 1}
        loading={loading}
        currentFieldsFilled={currentFieldsFilled}
        handleBackStep={handleBackStep}
        holder="Crie uma conta"
        onHolder="Criando conta..."
      />

      <FormAccountLink href="signin" holder="Faça login aqui">
        Já possui uma conta?
      </FormAccountLink>
    </form>
  );
}
