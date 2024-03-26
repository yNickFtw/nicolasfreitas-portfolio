"use client";

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

  async function handleCreateNewVisitor(): Promise<string> {
    const response = await visitorService.create();

    if (response.statusCode === 201) {
      localStorage.setItem("visitorId", response.data.visitor.id!);
    }

    return response.data.visitor.id!;
  }

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
          visitorId = await handleCreateNewVisitor();
        } else {
          // check if user exists
          const response = await visitorService.findByVisitorId(visitorId);

          if (response.statusCode === 404) {
            await handleCreateNewVisitor()
          }
        }

        await visitService.create(visitorId!, userAgent, special_code!);
      }
    }

    execute();
  }, []);

  return <></>;
}
