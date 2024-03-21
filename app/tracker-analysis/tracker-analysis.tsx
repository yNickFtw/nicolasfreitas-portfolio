"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import VisitorService from "../services/visitor";
import VisitService from "../services/visit";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

interface IProps {
  session: boolean;
}

export default function TrackerAnalysis({ session }: IProps) {
  const searchParams = useSearchParams();

  const visitorService = new VisitorService();
  const visitService = new VisitService();

  useEffect(() => {
    async function execute() {
      const userAgent = navigator.userAgent;

      if (session) {
        return;
      } else {

        let special_code: string | null;

        if (searchParams.has("code")) special_code = searchParams.get("code");

        let visitorId = localStorage.getItem("visitorId");

        if (!visitorId) {
          const response = await visitorService.create();

          if (response.statusCode === 201) {
            toast({
              title: response.data.message,
            });

            visitorId = response.data.visitor.id;

            localStorage.setItem("visitorId", response.data.visitor.id);
          }

          if (response.statusCode !== 201) {
            return;
          }
        }

        await visitService.create(visitorId!, userAgent, special_code!);
      }
    }

    execute();
  }, []);

  return <></>;
}
