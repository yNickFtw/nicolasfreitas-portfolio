import DropdownUser from "@/app/components/dropdown-user";
import { MainNav } from "@/app/components/main-nav";
import MobileMenuDashboard from "../mobile-menu";

export default async function HeaderDashboard() {
  return (
    <>
      <header
        className="w-full sticky top-0 m-auto p-2 border-b  dark:border-b-zinc-800"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-7xl m-auto flex justify-between items-center">
          <div className="flex flex-row items-center gap-4 p-2">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Dashboard
            </h3>

            <div className="hidden md:block">
              <MainNav />
            </div>
          </div>

          <div className="md:hidden">
            <MobileMenuDashboard />
          </div>

          <section className="hidden md:block">
            <DropdownUser />
          </section>
        </div>
      </header>
    </>
  );
}
