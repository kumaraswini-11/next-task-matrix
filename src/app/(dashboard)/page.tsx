import { CreateWorkspaceForm } from "@/features/workspaces/create-workspace-form";

export default async function Home() {
  // TODO: get the current user seeion if not redirect to ?sign-in

  return (
    <div>
      <CreateWorkspaceForm onCancel={() => {}} />
    </div>
  );
}
