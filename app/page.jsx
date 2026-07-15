import { redirect } from "next/navigation";

export default function Home() {
  // Make the monitoring/dashboard the app home page
  redirect("/dashboard");
}
