import { AuthProvider } from "@/context/AuthContext";
import { FormWizardProvider } from "@/context/FormWizardContext";
import QueryProvider from "@/lib/provider/queryProvider.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
   return (
      <QueryProvider>
         <AuthProvider>
            <FormWizardProvider>{children}</FormWizardProvider>
         </AuthProvider>
      </QueryProvider>
   );
}
