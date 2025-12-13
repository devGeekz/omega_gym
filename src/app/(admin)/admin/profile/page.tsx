import { auth } from "auth";

export default async function page() {
  const session = await auth();

  return (
    <div>
      Admin Profile Page
      {JSON.stringify(session)}
    </div>
  );
}
