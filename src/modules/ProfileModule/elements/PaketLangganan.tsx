import React from "react";
import { SubsCard } from "./SubsCard";

export const PaketLangganan = ({ onNext }: { onNext: () => void }) => {
  return (
    <section className="mb-11">
      <div className="flex flex-col gap-3 text-center my-5">
        <h1 className="text-M2 font-medium">Pilih Paket Langganan Anda</h1>
        <p className="text-P4 italic">
          GlucoScan Pro, bantu Anda menjaga kesehatan dengan lebih optimal.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <SubsCard onNext={onNext} />
        <SubsCard onNext={onNext} />
      </div>
    </section>
  );
};
