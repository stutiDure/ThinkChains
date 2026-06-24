import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../config/site";

type LogoVariant = "light" | "dark" | "auto";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  href?: string;
};

function getLogoSrc(variant: LogoVariant): string {
  if (variant === "light") return siteConfig.logos.light;
  if (variant === "dark") return siteConfig.logos.dark;
  return siteConfig.logos.dark;
}

export default function Logo({
  variant = "auto",
  className = "",
  imageClassName = "h-8 w-auto sm:h-9 md:h-10",
  width = 160,
  height = 40,
  priority = false,
  href = "/",
}: LogoProps) {
  const lightSrc = siteConfig.logos.light;
  const darkSrc = siteConfig.logos.dark;

  const image =
    variant === "auto" ? (
      <>
        <Image
          src={lightSrc}
          alt={siteConfig.name}
          width={width}
          height={height}
          priority={priority}
          className={`${imageClassName} hidden dark:block`}
        />
        <Image
          src={darkSrc}
          alt={siteConfig.name}
          width={width}
          height={height}
          priority={priority}
          className={`${imageClassName} block dark:hidden`}
        />
      </>
    ) : (
      <Image
        src={getLogoSrc(variant)}
        alt={siteConfig.name}
        width={width}
        height={height}
        priority={priority}
        className={imageClassName}
      />
    );

  if (!href) {
    return <span className={`inline-flex items-center ${className}`}>{image}</span>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center opacity-90 hover:opacity-100 transition-opacity duration-300 ${className}`}
      aria-label={`${siteConfig.name} — Home`}
    >
      {image}
    </Link>
  );
}
