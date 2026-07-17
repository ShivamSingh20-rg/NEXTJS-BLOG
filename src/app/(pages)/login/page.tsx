// src/app/login/page.tsx
import React from "react";
import SocialLoginButtons from "@/components/main compo/header/LoginButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-purple-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-sm text-slate-500">Sign in to access your engineer dashboard</p>
        </div>
        <SocialLoginButtons />
      </div>
    </div>
  );
}