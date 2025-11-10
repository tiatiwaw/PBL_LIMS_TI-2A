import ProfileLayout from "@/components/layouts/profile-layout";
import { usePage } from "@inertiajs/react";

export default function ProfilePage() {
  const { auth } = usePage().props;
  const user = auth.user;

  return <ProfileLayout user={user} />;
}
