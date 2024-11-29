"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app } from "../../firebase";
import { CldUploadButton } from "next-cloudinary";

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.svg");
  const [user, setUser] = useState<any>(null);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUsername(currentUser.displayName || "");
        setAvatarUrl(currentUser.photoURL || "/placeholder.svg");
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    try {
      await updateProfile(auth.currentUser!, { displayName: username });
      alert("Username updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Failed to update username.");
    }
  };

  const handleAvatarUpload = async (result: any) => {
    try {
      const { secure_url } = result.info;
      await updateProfile(auth.currentUser!, { photoURL: secure_url });
      setAvatarUrl(secure_url);
      setSuccess("Image Uploaded successfully");
      router.push(`/${user.displayName || "defaultUsername"}`); 
      router.refresh();
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-neutral-200">
            Your Profile
          </CardTitle>
          {success && (
        <p className="text-green-500 text-sm text-center mt-2">{success}</p>
      )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback>{username?.slice(0, 2)?.toUpperCase() || "NA"}</AvatarFallback>
              </Avatar>
              <CldUploadButton
                options={{ multiple: false }}
                uploadPreset={cloudPresetName}
                onUpload={handleAvatarUpload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-camera"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </CldUploadButton>
            </div>
            <form onSubmit={handleUsernameChange} className="w-full space-y-4">
              <div className="space-y-2 text-center">
                <Label htmlFor="username" className="text-neutral-200">
                  <span className="font-bold text-blue-400">Username:</span> {username}
                </Label>
                <Label htmlFor="email" className="text-neutral-200">
                  <span className="font-bold text-blue-400">Email:</span> {user.email}
                </Label>
              </div>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your new username"
              />
              <Button type="submit" className="w-full">
                Update Username
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
