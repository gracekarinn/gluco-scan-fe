"use client";
import React, { useState } from "react";
import MulaiSekarang from "./sections/MulaiSekarang";
import CheckThisOut from "./sections/CheckThisOut";
import FiturKami from "./sections/FiturKami";
import { PaketLangganan } from "./sections/PaketLangganan";
import { Scanner as ScannerComp } from "@yudiel/react-qr-scanner";

const MainNotLoginModule = () => {
  const [data, setData] = useState<string>("Not Found");
  const [tracker, setTracker] = useState<string | undefined>("centerText");

  return (
    <div className="flex flex-col gap-y-20">
      <MulaiSekarang />
      <ScannerComp
        formats={[
          "qr_code",
          "micro_qr_code",
          "rm_qr_code",
          "maxi_code",
          "pdf417",
          "aztec",
          "data_matrix",
          "matrix_codes",
          "dx_film_edge",
          "databar",
          "databar_expanded",
          "codabar",
          "code_39",
          "code_93",
          "code_128",
          "ean_8",
          "ean_13",
          "itf",
          "linear_codes",
          "upc_a",
          "upc_e",
        ]}
        onScan={(detectedCodes) => {
          console.log("onScan:", JSON.stringify(detectedCodes, null, 2));
          if (detectedCodes && detectedCodes.length > 0) {
            setData(detectedCodes[0].rawValue);
          }
        }}
        onError={(error) => {
          console.log(`onError: ${error}'`);
        }}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
        }}
        allowMultiple={true}
        scanDelay={2000}
      />
      <p>Raw Code: {data}</p>
      <CheckThisOut />
      <FiturKami />
      <PaketLangganan />
    </div>
  );
};

export default MainNotLoginModule;
