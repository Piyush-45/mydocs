"use client";

import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, SignIn, useAuth, } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <Authenticated>
        {children}
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <SignIn routing="hash"/>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <p>Loading ....</p>
      </AuthLoading>
    </ConvexProviderWithClerk>
  </ClerkProvider>)
}


// ! we could wrap our app in layout file with clerk and convex as suggested in documentation, but here we are taking modern approach and doing similar thing