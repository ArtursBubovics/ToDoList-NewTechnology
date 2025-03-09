import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileImageContextType {
    imagePath: string | null;
    setImagePath: (path: string) => void;
  }

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

interface ProfileImageProviderProps {
    children: ReactNode;
  }
  
export const ProfileImageProvider = ({ children }: ProfileImageProviderProps) => {
    const [imagePath, setImagePath] = useState<string | null>(null);
  
    return (
      <ProfileImageContext.Provider value={{ imagePath, setImagePath }}>
        {children}
      </ProfileImageContext.Provider>
    );
  };
  

  export const useProfileImage = () => {
    const context = useContext(ProfileImageContext);
    if (!context) {
      throw new Error("useProfileImage must be used within a ProfileImageProvider");
    }
    return context;
  };