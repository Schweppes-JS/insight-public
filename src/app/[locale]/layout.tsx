import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import cn from "classnames";

import { GenerateMetadataType, LayoutPropsType } from "@/types/appTypes";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { locales } from "@/constants/appConfig";

const inter = Inter({ subsets: ["latin"] });

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata: GenerateMetadataType = async ({ params: { locale } }) => {
  const t = await getTranslations({ locale, namespace: "HOME.META" });
  return { title: t("TITLE"), description: t("DESCRIPTION"), keywords: t("DESCRIPTION") };
};

const RootLayout = async ({ children, params }: LayoutPropsType) => {
  unstable_setRequestLocale(params.locale);

  return (
    <html className="min-h-screen flex" lang={params.locale}>
      <body className={cn(inter.className, "flex flex-col bg-orange-50 flex-auto text-indigo-950")}>
        <Header params={params} />
        <main className="w-full mx-auto flex flex-col max-w-screen-2xl px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6 pt-32">{children}</main>
        <Footer params={params} />
      </body>
    </html>
  );
};

export default RootLayout;