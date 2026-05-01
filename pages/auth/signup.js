import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signup } from "../../redux/actions/authActions";
import AuthLoader from "../../components/AuthLoader";
import SuccessModal from "../../components/SuccessModal";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await dispatch(signup(formData));
    if (result.success) {
      setShowSuccess(true);
    } else {
      setError(result.message);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push("/auth/login");
  };

  return (
    <>
      {loading && <AuthLoader />}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Registration Successful!"
        message="Your account has been created successfully. Please login to continue."
      />
      <Head>
        <title>Get Started | Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ── Full‑page gradient background with padding ── */}
      <div
        style={{ 
          background: "linear-gradient(135deg, #031E3A 0%, #0A4D91 100%)",
          minHeight: "100vh",
          padding: "15vh 5vw 8vh 5vw",
          overflow: "auto"
        }}
      >
        {/* ── Outer card with 10% gap on all sides ── */}
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
          {/* Girl image — covers the entire card */}
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

          {/*
            ── Frosted‑glass form ──
            • positioned absolute right side, vertically centred
            • width ~38% of card (mirrors reference screenshot)
            • backdrop-blur + semi‑transparent light bg
            • corner-radius 44px (Figma value)
            • white stroke 2.68px
          */}
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
            {/* Heading */}
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
              Get Started
            </h1>

            {/* Sub line */}
            <p
              style={{
                textAlign: "center",
                fontSize: "clamp(0.65rem, 1.05vw, 0.8rem)",
                color: "black",
                marginBottom: "clamp(18px, 3vh, 30px)",
              }}
            >
              Already have an Account?{" "}
              <Link href="/auth/login" style={{ color: "#0A4D91", fontWeight: 700 }}>
                Log in
              </Link>
            </p>

            {/* ── Fields ── */}
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

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  style={{ display: "block", fontWeight: 700, color: "#031E3A", fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)", marginBottom: "4px" }}
                >
                  Name
                </label>
                <div style={{ display: "flex", alignItems: "center", borderBottom: "1.8px solid #1565C0", paddingBottom: "5px" }}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#1a1a1a", fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)" }}
                  />
                 
                </div>
              </div>

             
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

              {/* Password */}
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

              {/* Terms */}
              <p style={{ fontSize: "clamp(0.55rem, 0.85vw, 0.78rem)", color: "black", lineHeight: 1.5 }}>
                By signing up I agree to the{" "}
                <Link href="/terms" style={{ color: "#0A4D91", fontWeight: 600, textDecoration: "underline" }}>
                  terms &amp; conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" style={{ color: "#0A4D91", fontWeight: 600, textDecoration: "underline" }}>
                  privacy policy
                </Link>
              </p>

              {/* Button */}
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
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}