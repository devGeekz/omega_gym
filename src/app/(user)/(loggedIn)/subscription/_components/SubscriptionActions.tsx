"use client";

import { Button } from "@/components/ui/button";

export function SubscriptionActions() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Button className="bg-blue-600 hover:bg-blue-700">Upgrade Plan</Button>
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
        Renew
      </Button>
      <Button className="bg-red-600 hover:bg-red-700">Cancel Plan</Button>
    </div>
  );
}
