import { githubauth, googleOauth } from "@/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false); // 👈 NEW FLAG

  useEffect(() => {
    const code = searchParams.get("code");

    const handleOAuth = async () => {
      if (!code || called) return; // prevent double execution
      setCalled(true); // mark as called once

      try {
        setLoading(true);
        let response;

        if (location.pathname.includes("/callback/google")) {
          response = await googleOauth({ code });
          toast.success("Google login success");
        } else if (location.pathname.includes("/callback/github")) {
          response = await githubauth({ code });
          toast.success("GitHub login success");
        }

        if (response) {
          login(response); // Save to context
          navigate("/dashboard");
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.error || "OAuth failed");
      } finally {
        setLoading(false);
      }
    };

    handleOAuth();
  }, [searchParams, location.pathname, login, navigate, called]);

  return <div>{loading ? "Completing OAuth login..." : "Redirecting..."}</div>;
};

export default OAuthCallback;
