"use client";

import FormAccountLink from "@/components/auth/elements/account-link";
import FormInput from "@/components/auth/elements/input";
import FormLabel from "@/components/auth/elements/label";
import FormNavigationButtons from "@/components/auth/elements/navigation";
import { IAuthFormData } from "@/components/auth/form/protocols";
import { FormEvent, useEffect, useState } from "react";

const steps: string[][] = [["email"], ["password"]];

const initialFormData = steps.reduce(
  (acc, stepFields) =>
    stepFields.reduce((stepAcc, field) => ({ ...stepAcc, [field]: "" }), acc),
  {}
);

export default function SigninForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAuthFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentFieldsFilled, setCurrentFieldsFilled] =
    useState<boolean>(false);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (currentFieldsFilled) {
      const isLastStep = currentStep === steps.length - 1;

      if (isLastStep) {
        setLoading(true);
        //TODO: call signin service

        //TODO: simulate handling a request
        await new Promise((resolve) => setTimeout(resolve, 3_000));

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
          <FormLabel htmlFor="email">Seu email</FormLabel>
          <FormInput
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="name@company.com"
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
      )}
      {currentStep === 1 && (
        <div>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <FormInput
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="••••••••"
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