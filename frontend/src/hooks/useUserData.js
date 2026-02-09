import { useState, useEffect } from 'react';

export function useUserData() {
  const [userData, setUserData] = useState({
    name: "Estudiante",
    xp: 340,
    level: 5,
    cognitiveProfile: {
      logic: 75,
      comprehension: 80,
      abstraction: 60
    }
  });

  return { userData, loading: false };
}