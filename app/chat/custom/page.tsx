import { Suspense } from "react";
import { CustomChatClient } from "@/src/components/CustomChatClient";

export default function CustomChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomChatClient />
    </Suspense>
  );
}
