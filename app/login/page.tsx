"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Gagal: " + error.message);
    } else {
      router.push("/admin"); // Redirect ke dashboard jika sukses
    }
    setLoading(false);
  };

  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

// Pasang tombol ini di header Dashboard Admin kamu
<button onClick={handleLogout} style={{ background: '#ffdad4', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
  LOGOUT
</button>

  return (
    <div style={{ 
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: '#fef9f2', fontFamily: 'Manrope, sans-serif' 
    }}>
      <form onSubmit={handleLogin} style={{ 
        background: '#fff', padding: '40px', borderRadius: '24px', 
        boxShadow: '0 20px 40px rgba(39,19,16,0.1)', width: '100%', maxWidth: '400px' 
      }}>
        <h2 style={{ color: '#271310', marginBottom: '10px', textAlign: 'center' }}>Admin Login</h2>
        <p style={{ color: '#75584d', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
          Silakan masuk untuk mengelola Nakopi
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', fontWeight: '800', color: '#ae8d87' }}>EMAIL ADMIN</label>
          <input 
            type="email" 
            required 
            style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '2px solid #271310', color: '#000' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ fontSize: '12px', fontWeight: '800', color: '#ae8d87' }}>PASSWORD</label>
          <input 
            type="password" 
            required 
            style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '2px solid #271310', color: '#000' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          disabled={loading}
          style={{ 
            width: '100%', padding: '16px', background: '#271310', color: '#fff', 
            border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' 
          }}
        >
          {loading ? "Mengecek..." : "MASUK KE DASHBOARD"}
        </button>
      </form>
    </div>
  );
}