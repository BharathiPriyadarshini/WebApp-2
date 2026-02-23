"use client";

export default function EditProfileForm() {
  return (
    <div className="bg-neutral-900 border border-white/10 p-10 rounded-2xl w-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Edit Profile
      </h2>

      <input
        placeholder="Name"
        className="w-full mb-4 p-3 rounded bg-black border border-white/10"
      />
      <input
        placeholder="Email"
        className="w-full mb-6 p-3 rounded bg-black border border-white/10"
      />

      <button className="w-full py-3 rounded-lg bg-white text-black font-semibold">
        Save Changes
      </button>
    </div>
  );
}