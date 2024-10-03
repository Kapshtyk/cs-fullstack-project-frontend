import Image from "next/image";

import { GetFrontpageDto } from "@/entities/frontpage";

import { getAbsoluteUrl } from "@/shared/lib";

import "./HeroBanner.scss";

interface HeroBannerProps {
  frontpage: GetFrontpageDto;
  callToAction: React.ReactNode;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  frontpage,
  callToAction,
}) => {
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-overlay" />
      <Image
        src={getAbsoluteUrl(frontpage.heroBanner)}
        alt=""
        fill={true}
        sizes="(max-width: 768px) 30vw, 50vw"
        className="hero-image"
      />
      <div data-testid="hero-banner-text" className="hero-text">
        <p>{frontpage.heroBannerText}</p>
      </div>
      <div className="hero-cta">{callToAction}</div>
    </div>
  );
};
