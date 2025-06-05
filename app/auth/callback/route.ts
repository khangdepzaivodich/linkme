import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) next = "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Check if user exists in your user table (by email or uuid)
        const { data: existingUsers, error: selectError } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email);

        if (!existingUsers || existingUsers.length === 0) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              email: user.email,
              username: user.user_metadata.user_name,
              full_name: user.user_metadata.full_name,
              avatar_url: user.user_metadata.avatar_url,
            },
          ]);
          if (insertError) {
            console.error("Error inserting new user:", insertError.message);
          } else {
            console.log("New user inserted successfully");
          }
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
