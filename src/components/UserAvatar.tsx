import React from 'react';

interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = () => {
  return (
    <div className="flex flex-col justify-center items-center self-center px-6 rounded-full aspect-square bg-zinc-300 w-[294px] max-md:px-5">
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/53a2ff6540f4ef7dba9f0e34ac0079e22029873e60ca3afbae0f28d228b899ca?placeholderIfAbsent=true&apiKey=8a108bf77df445f9a64c217edb4a77e1" 
        alt="User avatar" 
        className="object-contain w-full aspect-[1.06] rounded-[162px]" 
      />
    </div>
  );
};

export default UserAvatar;