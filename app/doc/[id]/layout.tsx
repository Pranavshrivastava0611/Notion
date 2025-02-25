
import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";

async function DocLayout(
  {
    children,
    params: { id },
  }: {
    children: React.ReactNode;
    params: {
      id: string;
    };
  }
) {
  await auth.protect();
return <RoomProvider roomId={id}>{children}</RoomProvider>
}
export default DocLayout;
