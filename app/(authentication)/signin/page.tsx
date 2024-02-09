import SigninForm from "@/components/auth/form/signin";

export default function Signin() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen">
        <div className="w-full rounded-lg shadow dark:border max-w-md bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              Entrar na sua conta
            </h1>

            <SigninForm />
          </div>
        </div>
      </div>
    </section>
  );
}
