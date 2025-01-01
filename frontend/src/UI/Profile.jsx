// ProfileCard.jsx
import { cn } from "../../lib/utils";
import React from "react";

// export function ProfileCard({
//   name,
//   title,
//   company,
//   profileImage,
//   backgroundImage,
//   className,
// }) {
//   return (
//     <div className={cn("w-[100vw]", className)}>
//       <div className="relative">
//         {/* Background Image */}
//         <div className="w-[100vw] h-[200px] overflow-hidden bg-cover rounded-lg">
//           <img
//             src={backgroundImage}
//             alt="Background"
//             className="w-full h-full object-cover bg-gradient-to-b from-gray-900 to-black"
//           />
//         </div>
//         {/* Profile Image */}
//         <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
//           <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
//             <img
//               src={profileImage}
//               alt={name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Profile Info */}
//       <div className="mt-16 text-center">
//         <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
//         <p className="mt-1 text-sm text-gray-500">
//           {title} @{company}
//         </p>
//       </div>
//     </div>
//   );
// }

export function ProfileCard({
  name,
  title,
  company,
  profileImage,
  backgroundImage,
  className,
}) {
  return (
    <div className={cn("w-full relative", className)}>
      <div className="relative w-full">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-[200px] overflow-hidden bg-cover rounded-lg ">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
            // style={{ objectPosition: "center" }}
          />
        </div>

        {/* This div maintains aspect ratio */}
        <div className="relative w-full h-[200px]" />

        {/* Profile Image */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ bottom: "-3rem" }}>
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-2xl mx-auto">
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {title} @{company}
          </p>
        </div>
      </div>
    </div>
  );
}
