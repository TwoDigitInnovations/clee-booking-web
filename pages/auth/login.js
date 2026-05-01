import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { login } from "../../redux/actions/authActions";
import AuthLoader from "../../components/AuthLoader";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await dispatch(login(formData));
    if (result.success) {
      const redirect = router.query.redirect;
      router.push(redirect && redirect.startsWith("/") ? redirect : "/");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      {loading && <AuthLoader />}
      <Head>
        <title>Welcome Back | Log In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        style={{ 
          background: "linear-gradient(135deg, #031E3A 0%, #0A4D91 100%)",
          minHeight: "100vh",
          padding: "15vh 5vw 8vh 5vw",
          overflow: "auto"
        }}
      >
        <div
          className="relative"
          style={{
            width: "100%",
            minHeight: "90vh",
            borderRadius: "24px",
            boxShadow: "0 16px 64px rgba(3,30,58,0.65)",
            border: "2px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <img
            src="/images/girl.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              minHeight: "90vh",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block"
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "3.5%",
              transform: "translateY(-50%)",
              width: "clamp(360px, 50%, 580px)",
              minHeight: "78vh",
              borderRadius: "44px",
              background: "rgba(255, 255, 255, 0.50)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              border: "2.68px solid rgba(255,255,255,0.82)",
              boxShadow: "0 8px 48px rgba(3,30,58,0.22)",
              padding: "clamp(28px, 5vh, 52px) clamp(24px, 3.5vw, 44px)",
              boxSizing: "border-box",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontWeight: 800,
                color: "#0A4D91",
                fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                marginBottom: "6px",
                lineHeight: 1.2,
              }}
            >
              Welcome Back
            </h1>

            <p
              style={{
                textAlign: "center",
                fontSize: "clamp(0.65rem, 1.05vw, 0.8rem)",
                color: "black",
                marginBottom: "clamp(40px, 6vh, 60px)",
              }}
            >
              Don't have an Account?{" "}
              <Link href="/auth/signup" style={{ color: "#0A4D91", fontWeight: 700 }}>
                Sign up
              </Link>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.2vh, 22px)" }}>

              {error && (
                <div style={{ 
                  padding: "10px", 
                  background: "rgba(239, 68, 68, 0.1)", 
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  color: "#dc2626",
                  fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
                  textAlign: "center"
                }}>
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontWeight: 700, color: "#031E3A", fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)", marginBottom: "4px" }}
                >
                  Email
                </label>
                <div style={{ borderBottom: "1.8px solid #1565C0", paddingBottom: "5px" }}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#1a1a1a", fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{ display: "block", fontWeight: 700, color: "#031E3A", fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)", marginBottom: "4px" }}
                >
                  Password
                </label>
                <div style={{ borderBottom: "1.8px solid #1565C0", paddingBottom: "5px" }}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#1a1a1a", fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)" }}
                  />
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <Link href="/auth/forgot-password" style={{ color: "#0A4D91", fontWeight: 600, fontSize: "clamp(0.55rem, 0.85vw, 0.68rem)", textDecoration: "underline" }}>
                  Forgot Password?
                </Link>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  width: "50%",
                  margin: "0 auto",
                  background: "linear-gradient(90deg, #031E3A 0%, #0A4D91 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)",
                  padding: "clamp(9px, 1.4vh, 14px) 16px",
                  boxShadow: "0 3px 16px rgba(3,30,58,0.32)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
