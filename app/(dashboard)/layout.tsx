import { authOptions } from "@/client/next-auth";
import { getServerSession } from "next-auth";
import Header from "@/components/header/header";
import AuthProvider from "@/components/auth/provider/provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions))!;

  return (
    <AuthProvider session={session}>
      <div className="min-h-screen text-gray-70 dark:text-white bg-white dark:bg-gray-900">
        <Header user={session.user} />

        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
