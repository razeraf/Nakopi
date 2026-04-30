"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function AdminDashboard() {
  const [coffees, setCoffees] = useState<any[]>([]);
  const [ethos, setEthos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<number | string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchData();
      }
    };
    checkUser();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [resCoffees, resEthos] = await Promise.all([
      supabase.from('coffees').select('*').order('id'),
      supabase.from('ethos').select('*').order('id')
    ]);
    if (resCoffees.data) setCoffees(resCoffees.data);
    if (resEthos.data) setEthos(resEthos.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleUpload = async (e: any, id: number, index: number, table: string) => {
    try {
      setUploading(id);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('coffee-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('coffee-images')
        .getPublicUrl(filePath);

      if (table === 'coffees') {
        const next = [...coffees];
        next[index].img = publicUrl;
        setCoffees(next);
      } else {
        const next = [...ethos];
        next[index].img = publicUrl;
        setEthos(next);
      }
    } catch (error: any) {
      alert("Gagal upload: " + error.message);
    } finally {
      setUploading(null);
    }
  };

  const saveChange = async (table: string, id: number, item: any) => {
    const { error } = await supabase.from(table).update(item).eq('id', id);
    if (error) alert("Gagal simpan: " + error.message);
    else { alert("Data diperbarui."); fetchData(); }
  };

  const deleteItem = async (table: string, id: number) => {
    if (window.confirm("Apakah Kakak yakin ingin menghapus data ini?")) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) alert("Gagal hapus: " + error.message);
      else fetchData();
    }
  };

  const addItem = async (table: string) => {
    const newItem = table === 'coffees' 
      ? { name: 'Produk Baru', description: 'Deskripsi...', img: 'https://placehold.co/400x300?text=Pilih+Foto', origin: 'Indonesian Bean', tag: 'New' }
      : { title: 'Layanan Baru', body: 'Deskripsi...', img: 'https://placehold.co/400x300?text=Pilih+Foto', num: '01' };

    const { error } = await supabase.from(table).insert([newItem]);
    if (error) alert("Gagal tambah: " + error.message);
    else fetchData();
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#271310' }}>Memverifikasi Akses...</div>;

  return (
    <div style={{ padding: '40px', background: '#fef9f2', minHeight: '100vh', fontFamily: 'Manrope, sans-serif' }}>
      {/* HEADER DENGAN TOMBOL LOGOUT */}
      <header style={{ marginBottom: '50px', borderBottom: '4px solid #271310', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#271310', fontSize: '2.2rem', fontWeight: 800 }}>NAKOPI MANAGEMENT</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            background: '#ffdad4', color: '#3e2723', border: 'none', padding: '12px 24px', 
            borderRadius: '12px', fontWeight: 800, cursor: 'pointer', transition: '0.2s' 
          }}
        >
          LOGOUT
        </button>
      </header>

      {/* MANAJEMEN PRODUK KOPI */}
      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '30px', color: '#271310', fontSize: '1.5rem', fontWeight: 800 }}>Manajemen Produk Kopi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
          {coffees.map((c, index) => (
            <div key={c.id} style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #f2ede6', position: 'relative' }}>
              <button onClick={() => deleteItem('coffees', c.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ffdad4', color: '#3e2723', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>HAPUS</button>
              <div style={{ position: 'relative', marginBottom: '20px', marginTop: '15px' }}>
                <img src={c.img} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
                <label style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#271310', color: '#fff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '20px' }}>
                  {uploading === c.id ? '...' : '+'}
                  <input type="file" hidden accept="image/*" onChange={(e) => handleUpload(e, c.id, index, 'coffees')} />
                </label>
              </div>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #271310', color: '#000', fontWeight: 700, marginBottom: '10px' }} value={c.name} onChange={(e) => { const n = [...coffees]; n[index].name = e.target.value; setCoffees(n); }} />
              <textarea style={{ width: '100%', padding: '12px', height: '80px', borderRadius: '8px', border: '2px solid #271310', color: '#000', marginBottom: '20px', resize: 'none' }} value={c.description} onChange={(e) => { const n = [...coffees]; n[index].description = e.target.value; setCoffees(n); }} />
              <button onClick={() => saveChange('coffees', c.id, c)} style={{ width: '100%', padding: '16px', background: '#271310', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>SIMPAN PERUBAHAN</button>
            </div>
          ))}
          <div onClick={() => addItem('coffees')} style={{ padding: '30px', borderRadius: '16px', border: '3px dashed #d3c3c0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.5)', minHeight: '450px' }}>
            <span style={{ fontSize: '40px', color: '#75584d' }}>+</span>
            <span style={{ fontWeight: 800, color: '#75584d', marginTop: '10px' }}>TAMBAH PRODUK</span>
          </div>
        </div>
      </section>

      {/* MANAJEMEN LAYANAN */}
      <section>
        <h2 style={{ marginBottom: '30px', color: '#271310', fontSize: '1.5rem', fontWeight: 800 }}>Manajemen Layanan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
          {ethos.map((e, index) => (
            <div key={e.id} style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #f2ede6', position: 'relative' }}>
              <button onClick={() => deleteItem('ethos', e.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ffdad4', color: '#3e2723', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>HAPUS</button>
              <div style={{ position: 'relative', marginBottom: '20px', marginTop: '15px' }}>
                <img src={e.img} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
                <label style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#75584d', color: '#fff', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>
                  {uploading === e.id ? '...' : '+'}
                  <input type="file" hidden accept="image/*" onChange={(event) => handleUpload(event, e.id, index, 'ethos')} />
                </label>
              </div>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #271310', color: '#000', fontWeight: 700, marginBottom: '10px' }} value={e.title} onChange={(ev) => { const n = [...ethos]; n[index].title = ev.target.value; setEthos(n); }} />
              <textarea style={{ width: '100%', padding: '12px', height: '80px', borderRadius: '8px', border: '2px solid #271310', color: '#000', marginBottom: '20px', resize: 'none' }} value={e.body} onChange={(ev) => { const n = [...ethos]; n[index].body = ev.target.value; setEthos(n); }} />
              <button onClick={() => saveChange('ethos', e.id, e)} style={{ width: '100%', padding: '14px', background: '#75584d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>UPDATE LAYANAN</button>
            </div>
          ))}
          <div onClick={() => addItem('ethos')} style={{ padding: '30px', borderRadius: '16px', border: '3px dashed #d3c3c0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.5)', minHeight: '400px' }}>
            <span style={{ fontSize: '40px', color: '#75584d' }}>+</span>
            <span style={{ fontWeight: 800, color: '#75584d', marginTop: '10px' }}>TAMBAH LAYANAN</span>
          </div>
        </div>
      </section>
    </div>
  );
}