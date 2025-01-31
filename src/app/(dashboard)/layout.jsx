import Sidebar from "@/components/sidebar/Sidebar";
import { ModuleProvider } from "@/context/moduleContext";
import { SearchFormProvider } from "@/context/searchFormContext";
import { PaginationProvider } from "@/context/paginationContext";
import { ModalProvider } from "@/context/modalContext";
import Navbar from "@/components/navbar/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <ModuleProvider>
      <PaginationProvider>
        <ModalProvider>
          <SearchFormProvider>
            <div className="flex h-screen overflow-hidden bg-primary">
              <Sidebar />
              <div className="flex-1 flex flex-col h-screen">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-3 transition-all duration-300 bg-secondary mb-4 mr-4 rounded-lg">
                  {children}
                </main>
              </div>
            </div>
          </SearchFormProvider>
        </ModalProvider>
      </PaginationProvider>
    </ModuleProvider>
  );
}