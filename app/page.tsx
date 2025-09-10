import { redirect } from "next/navigation"

export default function HomePage() {
  // For now, redirect to login page
  // Later this will check authentication status
  redirect("/login")
}
