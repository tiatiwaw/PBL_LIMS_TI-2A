import ProfileLayout from "@/components/layouts/profile-layout";

export default function ProfilePage() {
  const user = {
    name: "Nardo",
    email: "nardo@example.com",
    role: "Analyst",
    certifications: ["Data Analysis Level 1", "Python for Data Science"],
    trainingHistory: ["Advanced Excel", "SQL Fundamentals"],
  };

  return <ProfileLayout user={user} />;
}
