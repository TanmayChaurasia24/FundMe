"use client";

// import React, { useEffect, useState } from "react";
// import { SignupFormDemo } from "../../components/Signup";

// const Signup = () => {
//     const [loading, setLoading] = useState(false);
  
//   return (
//     <div className="flex justify-center items-center overflow-y-hidden h-[100vh] scroll-hide">
//       {loading ? (
//         <h1>Loading...</h1>
//       ) : (
//         <div className="h-full w-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
//           <div className="relative z-20">
//             <SignupFormDemo/>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <>
      <div className="text-white">
      Signed in as {session?.user?.email}</div> <br/>
      <button onClick={() => signOut()} className="text-white">Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn("github")} className="text-white">Sign in</button>
  </>
}
