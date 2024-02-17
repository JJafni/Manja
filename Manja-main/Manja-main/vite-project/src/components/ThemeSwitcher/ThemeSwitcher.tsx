// app/components/ThemeSwitcher.tsx
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme(); // Destructure 'theme' from useTheme

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const setYellowTheme = () => {
    setTheme("yellow-theme");
  };

  return (
    <>
      <Switch
        defaultSelected={theme === "dark"} // Set defaultSelected based on the current theme
        size="lg"
        color="warning"
        onChange={() => setTheme(theme === "light" ? "dark" : "light")} // Toggle theme on change
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      ></Switch>
    </>
  );
};

export { ThemeSwitcher };
