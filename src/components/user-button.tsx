import { Loader, LogOut } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
// import { useSession } from "next-auth/react";

// import { auth, signOut } from "@/auth";
import { Avatar } from "./ui/avatar";
import { DottedSeparator } from "./dotted-separator";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export const UserButton = async () => {
  // const session = await auth();
  // console.log("session:", session);
  // if (!session?.user) return null;

  // Use user image if available, otherwise fallback to initials or 'U'
  const avatarImage = "";
  // session.user.image ??
  // (session.user.name?.[0] ?? session.user.email?.[0] ?? "U").toUpperCase();

  // if (isLoading) {
  //   return (
  //     <div className="size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
  //       <Loader className="text-muted-foreground size-4 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
          <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
            {avatarImage}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">
              {avatarImage}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {/* {session.user?.name ?? "User"} */}
            </p>
            <p className="text-xs text-neutral-500">
              {/* {session.user?.email} */}
            </p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          // onClick={async () => {
          //   "use server";

          //   await signOut();
          // }}
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700"
        >
          <LogOut className="mr-2 size-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
