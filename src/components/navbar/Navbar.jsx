"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TbUserCircle, TbLogout2 } from "react-icons/tb";

const links = [
  { href: "/mi-perfil", label: "Mi Perfil", icon: TbUserCircle },
];

// Mapeo de rutas a títulos
const routeTitles = {
  "/inicio": "Inicio",
  "/direccionamientos": "Direccionamientos - Programación",
  "/entrega": "Entrega - Facturación - Reporte Entrega",
  "/novedades": "Novedades",
  "/mi-perfil": "Mi Perfil",
};

const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Obtener el título basado en la ruta actual
  const currentTitle = routeTitles[pathname] || "App Mipres";

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Navegación de los items
  const handleNavigation = (href) => {  router.push(href) };

  return (
    <nav className="h-[45px] min-h-[45px] bg-primary text-white w-full grid grid-cols-3 items-center">
      <div className="flex justify-start">
        <h2 className="text-xl font-semibold">MENNAR SAS</h2>
      </div>

      <div className="flex justify-center">
        <h1 className="text-xl font-semibold">{currentTitle}</h1>
      </div>

      <div className="flex justify-end pr-4">
        <Menu as="div" className="relative">
          <MenuButton className="data-[active]:bg-sky-default inline-flex items-center gap-2 rounded-full p-1 text-sm font-medium hover:bg-secondary transition-colors duration-200">
            <TbUserCircle className="h-7 w-7" />
          </MenuButton>

          {/* Menú dropdown */}
          <MenuItems className="absolute right-0 w-48 origin-top-right rounded-lg bg-gray-200 p-2 shadow-lg transition-transform duration-300 transform">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <MenuItem key={link.href}>
                  {({ focus }) => (
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-base text-primary rounded-md ${
                        focus ? "bg-sky-default text-white" : ""
                      } transition-colors duration-200`}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </button>
                  )}
                </MenuItem>
              );
            })}
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-2 px-3 py-2 mt-2 text-base text-danger-600 rounded-md ${
                    focus ? "bg-danger-600 text-white" : ""
                  } transition-colors duration-200`}
                >
                  <TbLogout2 className="h-5 w-5" />
                  Cerrar sesión
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;