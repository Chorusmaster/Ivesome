import { Link, Outlet } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";

function FormLayout() {
  return (
    <main className="flex-1 grid grid-cols-1 lg:grid-cols-5">
      <div className="relative overflow-hidden bg-primary lg:col-span-2 flex flex-col justify-center px-8 py-10 lg:px-12 xl:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.3)_20%,transparent_70%)] flex justify-center items-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-64 -left-64 size-128 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.2)_20%,transparent_70%)] flex justify-center items-center"
        />

        <div className="mb-24">
          <Link
            to="/"
            className="relative z-10 mb-8 flex w-fit items-center gap-3 text-white transition-opacity hover:opacity-90"
          >
            <Logo className="size-10" />
            <span className="text-2xl font-bold">Ivesome</span>
          </Link>

          <div className="relative z-10 max-w-md">
            <h1 className="text-title font-heading leading-tight text-white">
              Where ideas find their people
            </h1>
            <p className="mt-4 text-body leading-relaxed text-primary-light/90">
              Share concepts, gather feedback, and connect with collaborators who
              want to build something meaningful.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-background lg:col-span-3 flex items-center justify-center px-6 py-10 lg:py-16">
        <Outlet />
      </div>
    </main>
  );
}

export default FormLayout;
