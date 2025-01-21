import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { Camera, Mail, User } from "lucide-react";
import { parseDate } from "../lib/utils";

const ProfilePage: React.FC = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      const file = files[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result as string;
        setSelectedImg(base64Image);
        updateProfile({ profilePic: base64Image });
      };
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <div>
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>
            <div></div>
            <div>
              <div></div>
            </div>
          </div>

          {/* avatar upload section  */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImg || authUser?.profilePic || "./images/avatar.png"
                }
                alt=""
                className="rounded-full size-32 object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : null
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  title="avatar-upload"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p>
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex gap-2 items-center text-zinc-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 border rounded-lg bg-base-200">
                {authUser?.fullName}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex gap-2 items-center text-zinc-400">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-4 py-2.5 border rounded-lg bg-base-200">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-200 rounded-xl p-6">
            <h2 className="text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser?.createdAt && parseDate(authUser.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Accont Status</span>
                <span className="text-success font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
