import Image from "next/image";
import hero from "@public/top/hero.webp";
import heroSP from "@public/top/hero-sp.webp";

export const Hero = () => {
  const siteTitle = "ワーケーションナース";
  return (
    <section>
      <div className="relative h-[136vw] w-full md:h-[31vw]">
        <Image
          className="hidden object-cover md:block"
          src={hero}
          fill
          sizes="100%"
          alt={`${siteTitle}`}
        />
        <Image
          className="block object-cover md:hidden"
          src={heroSP}
          fill
          sizes="100%"
          alt={`${siteTitle}`}
        />
      </div>
    </section>
  );
};
