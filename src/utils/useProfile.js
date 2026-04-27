import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to fetch profile");
      
      const result = await response.json();
      // Logic check: Laravel usually returns data inside a 'data' key or directly
      return result.data || result; 
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};