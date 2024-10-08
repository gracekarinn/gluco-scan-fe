"use client";
import { useEffect, useState } from "react";
import { getCookies } from "cookies-next";
import { usePathname } from "next/navigation";
import { UserDataInterface } from "./interface";
import { useRouter } from "next/navigation";

const getUserData = async () => {
  const response = await fetch("https://gluco-scan-be-production.up.railway.app/users/data", {
    headers: {
      Authorization: `Bearer ${getCookies().accessToken}`,
    },
  });

  if (response.status === 200) {
    const userData = await response.json();
    return userData;
  }

  return null;
};

const useUserData = () => {
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const protectedPaths = ["/profile", "/monitor", "/konsultasi", "/produk", "/produk/scan", "/main"];
  const protectedPathsLogin = ["/login", "/register", "/welcome"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        setIsLoading(false);
        if (data === null) {
          if (protectedPaths.includes(pathname)) {
            router.replace("/welcome");
          }
        } else {
          if (protectedPathsLogin.includes(pathname)) {
            router.replace("/profile");
          }
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, isLoading };
};

export default useUserData;
