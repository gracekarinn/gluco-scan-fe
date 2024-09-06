"use client";
import React from "react";
import { ProductDetailProps } from "../interface";
import Image from "next/image";
import { Zap, EggFried } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUserData from "@/components/hooks/userData";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalPro } from "@/components/ui/ModalPro";
import { Takaran } from "../elements/Takaran";
import { Rekomendasi } from "../elements/Rekomendasi";
import { getCookies } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DetailProduct: React.FC<ProductDetailProps> = ({
  productId,
  namaProduk,
  kadarGula,
  image,
  takaran,
  energyKcal,
  proteins,
  fats,
  carbohydrates,
}) => {
  const { userData, isLoading } = useUserData();
  const router = useRouter();

  if (isLoading) {
    return <Skeleton className="min-h-screen w-[300px] lg:w-[700px] " />;
  }

  const onSubmit = async () => {
    await fetch("http://localhost:3001/product/submit", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookies().accessToken}`,
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        productId,
        namaProduct: namaProduk,
        kadarGula,
        image,
        takaran,
        userId: userData?.id,
      }),
    })
      .then(() => {
        router.push("/monitor");
        toast.success("Berhasil menambahkan asupan");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="flex flex-col">
      <div className="relative max-[340px]:w-[158px] w-[188px] mx-auto max-[340px]:h-[150px] h-[188px] mb-3">
        <Image
          alt={namaProduk}
          src={image}
          fill
          sizes="none"
          className="object-contain"
        />
      </div>
      <h1 className="font-medium text-[#101623] text-M3 text-center">{`${namaProduk} (${takaran})`}</h1>
      <div className="my-5 flex justify-between">
        <p className="text-M3 text-[#101623] font-medium">Kandungan Gula</p>
        <p className="text-M3 text-[#101623] font-bold">{kadarGula}g</p>
      </div>
      <h2 className="text-M3 text-[#101623] font-medium mb-2">
        Ringkasan Gizi
      </h2>
      <div className="grid-cols-4 grid gap-2 lg:mx-24 mb-5">
        <div className="border border-neutral-200 rounded-[4px]">
          <div className="py-1 rounded-t-[4px] bg-[#E3FBEC] flex flex-col justify-center items-center">
            <Zap size={28} className="text-neutral-950" />
            <p className="text-P4 text-[#101623] font-medium text-center">
              Energi <br />
              <span className="text-P6 font-normal text-neutral-300 text-center">
                {"(kkal)"}
              </span>
            </p>
          </div>
          <hr className="border-neutral-200" />
          <p className="text-M2 text-[#101623] font-medium text-center p-2">
            {energyKcal}
          </p>
        </div>
        <div className="border border-neutral-200 rounded-[4px]">
          <div className="py-1 rounded-t-[4px] bg-[#FEFDE6] flex flex-col justify-center items-center">
            <EggFried size={28} className="text-neutral-950" />
            <p className="text-P4 text-[#101623] font-medium text-center">
              Protein <br />
              <span className="text-P6 font-normal text-neutral-300 text-center">
                {"(g)"}
              </span>
            </p>
          </div>
          <hr className="border-neutral-200" />
          <p className="text-M2 text-[#101623] font-medium text-center p-2">
            {proteins}
          </p>
        </div>
        <div className="border border-neutral-200 rounded-[4px]">
          <div className="py-1 rounded-t-[4px] bg-[#FFF2E6] flex flex-col justify-center items-center">
            <Image width={28} height={28} src={"/cheese.svg"} alt="cheese" />
            <p className="text-P4 text-[#101623] font-medium text-center">
              Lemak <br />
              <span className="text-P6 font-normal text-neutral-300 text-center">
                {"(g)"}
              </span>
            </p>
          </div>
          <hr className="border-neutral-200" />
          <p className="text-M2 text-[#101623] font-medium text-center p-2">
            {fats}
          </p>
        </div>
        <div className="border border-neutral-200 rounded-[4px]">
          <div className="py-1 rounded-t-[4px] bg-[#FEE6E6] flex flex-col justify-center items-center">
            <Image width={28} height={28} src={"/loaf.svg"} alt="loaf" />
            <p className="text-P4 text-[#101623] font-medium text-center">
              Karbo <br />
              <span className="text-P6 font-normal text-neutral-300 text-center">
                {"(g)"}
              </span>
            </p>
          </div>
          <hr className="border-neutral-200" />
          <p className="text-M2 text-[#101623] font-medium text-center p-2">
            {carbohydrates}
          </p>
        </div>
      </div>
      <h3 className="text-M3 text-neutral-900 font-medium mb-3">
        Berdasarkan riwayat Anda,
      </h3>
      <h4 className="text-M3 text-[#101623] font-medium mb-2">
        Batasan Takaran Konsumsi
      </h4>
      {userData?.isPro && <Takaran isPro={userData?.isPro} />}
      {!userData?.isPro && (
        <ModalPro>
          <div>
            <Takaran isPro={userData?.isPro} />
          </div>
        </ModalPro>
      )}
      <h5 className="text-M3 text-[#101623] font-medium mb-2">
        Rekomendasi Makanan yang Lebih Sehat
      </h5>
      {userData?.isPro && <Rekomendasi isPro={userData?.isPro} />}
      {!userData?.isPro && (
        <ModalPro>
          <div>
            <Rekomendasi isPro={userData?.isPro} />
          </div>
        </ModalPro>
      )}
      <div className="bg-white shadow-md lg:translate-y-[105%] max-lg:translate-y-[60%] -translate-x-4 py-4 px-[10px] min-[320px]:w-[300px] min-[390px]:w-[375px] lg:w-[750px]">
        <Button onClick={() => onSubmit()} className="w-full mt-[10px]">
          Tambah Asupan
        </Button>
      </div>
    </section>
  );
};
