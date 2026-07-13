import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile.service";

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export default useProfile;