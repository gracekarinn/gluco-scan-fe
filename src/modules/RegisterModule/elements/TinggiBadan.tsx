"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { tinggiBadanSchema, submitTinggiBadanData } from "../constant";
import Image from "next/image";

export const TinggiBadan = ({
  onSubmit,
}: {
  onSubmit: (data: submitTinggiBadanData) => void;
}) => {
  const form = useForm<submitTinggiBadanData>({
    resolver: zodResolver(tinggiBadanSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-[85vh] my-8"
      >
        <div className="gap-8 flex flex-col items-center">
          <div className="relative w-full h-[12px]">
            <Image
              alt="1"
              src={"/stepper/4.png"}
              fill
              sizes="none"
              className="object-contain"
            />
          </div>
          <div className="mx-9">
            <h1 className="text-center font-bold text-grey-900 text-H3">
              Tulis Tinggi Badan
            </h1>
          </div>
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-row relative">
                      <input
                        className="border-b bg-white-50 w-[150px] text-[60px] font-bold border-[#303030] focus-visible:ring-0 focus-visible:outline-none"
                        {...field}
                      />
                      <span className="absolute right-0 top-0 bottom-2 flex items-end text-P2 font-medium">
                        cm
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};
