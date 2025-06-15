import Image from "next/image";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <div className="cta-section">
      <div className="cta-badge">Start learning yourself</div>
      <h2 className="text-3xl font-blod">
        Build and Personalize Learning Companion
      </h2>
      <Image src={"/images/cta.svg"} alt="cta" width={362} height={232} />
      <button className="btn-primary">
        <Image src={"/icons/plus.svg"} alt="plus" width={12} height={12} />
        <Link href={"/companions/new"}>Build a New Companion</Link>
      </button>
    </div>
  );
};

export default CTA;
