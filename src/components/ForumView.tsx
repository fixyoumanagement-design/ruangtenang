import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  Send,
  Flag,
  Lock,
  Smile
} from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface ForumPost {
  id: string;
  alias: string;
  time: string;
  tag: string;
  content: string;
  hugs: number;
  comments: number;
  isHugged?: boolean;
  replies?: CommentItem[];
}

const DEFAULT_POSTS: ForumPost[] = [
  {
    id: '1',
    alias: "Anonim Pejuang Bab 4",
    time: "15 menit lalu",
    tag: "#CurhatSkripsi",
    content: "Sudah seminggu revisian gak dibalas dosen pembimbing, tidur tiap malam jam 3 pagi karena kepikiran terus. Ada yang ngerasain hal sama? Rasanya mau nyerah tapi sayang orang tua di kampung.",
    hugs: 28,
    comments: 2,
    replies: [
      { id: 'r1', author: 'Mahasiswa Angkatan 2021', text: 'Semangat ya kak! Dospem aku juga pernah 2 minggu gak balas, coba follow up dengan sopan di jam kerja.', time: '10 mnt lalu' },
      { id: 'r2', author: 'Anonim Psikologi', text: 'Jangan lupa rehat malam ini ya, jangan dipaksain begadang terus kalau lagi buntu.', time: '5 mnt lalu' }
    ]
  },
  {
    id: '2',
    alias: "Anak Rantau Sumatera",
    time: "1 jam lalu",
    tag: "#HomesickRantau",
    content: "Pertama kali sakit tipes sendirian di kosan. Kangen masakan ibu dan gak berani cerita ke rumah biar orang tua gak cemas. Makasih buat teman-teman di sini yang selalu saling semangatin.",
    hugs: 45,
    comments: 1,
    replies: [
      { id: 'r3', author: 'Teman Satu Kampus', text: 'Cepat pulih kak! Kalau butuh bantuan beli obat atau makanan di sekitar kampus kabarin ya.', time: '40 mnt lalu' }
    ]
  }
];

export const ForumView: React.FC = () => {
  const [isAnonymousPost, setIsAnonymousPost] = useState<boolean>(true);
  const [postContent, setPostContent] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('#CurhatSkripsi');
  const [hasSentPost, setHasSentPost] = useState<boolean>(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<string>('');

  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const stored = localStorage.getItem('ruangtenang_forum_posts');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Storage fallback
    }
    return DEFAULT_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ruangtenang_forum_posts', JSON.stringify(posts));
    } catch {
      // Storage fallback
    }
  }, [posts]);

  const handleHug = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isHugged = !p.isHugged;
        return {
          ...p,
          isHugged,
          hugs: isHugged ? p.hugs + 1 : p.hugs - 1
        };
      }
      return p;
    }));
  };

  const handleAddReply = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;

    const newReply: CommentItem = {
      id: Date.now().toString(),
      author: 'Teman Mahasiswa · Anonim',
      text: replyInput,
      time: 'Baru saja'
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const currentReplies = p.replies || [];
        return {
          ...p,
          comments: p.comments + 1,
          replies: [...currentReplies, newReply]
        };
      }
      return p;
    }));
    setReplyInput('');
  };

  const handleSendPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      alias: isAnonymousPost ? `Anonim Mahasiswa #${Math.floor(100 + Math.random() * 900)}` : 'Mahasiswa Terbuka',
      time: 'Baru saja',
      tag: selectedTag,
      content: postContent,
      hugs: 1,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setHasSentPost(true);
    setTimeout(() => setHasSentPost(false), 3500);
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12">
      
      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 3: HEADER FORUM DISKUSI
        Warna Solma + Wording Empati
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E3ECE3]">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[#213728] font-heading">
            Forum Mahasiswa
          </h2>
          <p className="text-xs text-[#526D5A] mt-0.5">
            Berbagi cerita dan keluh kesah seputar dunia kuliah secara anonim.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E2EFE3] text-[#2D4B36] text-xs font-semibold border border-[#CFDFD0]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3C5E45]" />
          <span>Moderasi Aktif</span>
        </div>
      </div>

      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 3: SAFETY GUIDELINE ALERT BANNER
      */}
      <div className="p-3.5 rounded-2xl border border-[#DCE7DC] bg-[#F6FAF6] text-xs text-[#2D4734] flex items-start space-x-3 shadow-2xs">
        <ShieldCheck className="w-4 h-4 text-[#3C5E45] shrink-0 mt-0.5" />
        <div>
          <strong className="block text-[#1C2D22]">Ruang Aman Bersama:</strong>
          <span className="text-[#516E59] leading-relaxed">
            Jaga privasi sesama, saling menguatkan, dan hindari menyebarkan data pribadi.
          </span>
        </div>
      </div>

      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 3: POST INPUT BOX COMPONENT
        Textarea -> Checkbox Anonimitas -> Dropdown Tag -> Tombol Kirim Aman
      */}
      <form onSubmit={handleSendPost} className="p-5 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_8px_30px_rgba(45,75,54,0.04)] space-y-3">
        <textarea
          rows={3}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Ceritakan keresahanmu... (misal: kebuntuan revisi skripsi bab 4, rasa sepi di kosan)"
          className="w-full text-xs md:text-sm p-3.5 rounded-2xl border border-[#DDE7DD] bg-[#FAFBF9] text-[#1C2D22] placeholder-[#809B87] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30 resize-none"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <label className="flex items-center space-x-2 cursor-pointer text-xs text-[#314E3A]">
            <input 
              type="checkbox" 
              checked={isAnonymousPost} 
              onChange={(e) => setIsAnonymousPost(e.target.checked)}
              className="rounded accent-[#2D4B36] w-4 h-4" 
            />
            <span className="font-semibold">Posting sebagai Anonim (#PejuangSkripsi44)</span>
          </label>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <select 
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#2D4534] font-semibold focus:outline-none"
            >
              <option value="#CurhatSkripsi">#CurhatSkripsi</option>
              <option value="#HomesickRantau">#HomesickRantau</option>
              <option value="#TipsInsomnia">#TipsInsomnia</option>
              <option value="#KesehatanMental">#KesehatanMental</option>
            </select>

            <button 
              type="submit"
              disabled={!postContent.trim()}
              className="px-5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-1.5 bg-[#2D4B36] text-white hover:bg-[#1E3626] transition-all shadow-2xs disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Aman</span>
            </button>
          </div>
        </div>

        {hasSentPost && (
          <p className="text-xs text-emerald-800 font-bold pt-1 animate-in fade-in">
            ✓ Ceritamu berhasil dikirimkan secara anonim dan langsung tampil di feed.
          </p>
        )}
      </form>

      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 3: FORUM FEED LIST
        Header post -> Tag pill -> Teks isi curhat -> Tombol Kirim Peluk & Komentar
      */}
      <div className="space-y-3.5">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="p-5 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_8px_30px_rgba(45,75,54,0.04)] space-y-3"
          >
            {/* Header Post */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E2EFE3] text-[#2D4B36] flex items-center justify-center text-xs font-bold">
                  ?
                </div>
                <span className="text-xs font-bold text-[#1E2E23]">{post.alias}</span>
                <span className="text-[11px] text-[#789682]">• {post.time}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#A64F2C] border border-[#F5DACB]">
                  {post.tag}
                </span>
                <button title="Laporkan Pelanggaran" className="text-[#89A492] hover:text-rose-600 transition-colors">
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Isi Curhat */}
            <p className="text-xs md:text-sm text-[#273B2E] leading-relaxed">
              "{post.content}"
            </p>

            {/* Footer Aksi */}
            <div className="flex items-center space-x-4 pt-2.5 border-t border-[#EDF3ED] text-xs text-[#4F6856]">
              <button 
                onClick={() => handleHug(post.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl transition-all ${
                  post.isHugged 
                    ? 'bg-[#FBE8E6] text-[#B83E38] font-bold' 
                    : 'hover:text-[#B83E38]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.isHugged ? 'fill-[#B83E38] text-[#B83E38]' : 'text-rose-500'}`} />
                <span>Kirim Peluk ({post.hugs})</span>
              </button>

              <button 
                onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl transition-colors ${
                  openCommentsPostId === post.id ? 'bg-[#EDF4ED] text-[#243D2B] font-bold' : 'hover:text-[#2D4B36]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#4D7356]" />
                <span>Komentar ({post.comments})</span>
              </button>
            </div>

            {/* Expandable Comment Section */}
            {openCommentsPostId === post.id && (
              <div className="pt-3 border-t border-[#EDF3ED] space-y-3 animate-in fade-in">
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {post.replies && post.replies.length > 0 ? (
                    post.replies.map((rep) => (
                      <div key={rep.id} className="p-3 rounded-2xl bg-[#F7FAF7] border border-[#E4ECE4] text-xs">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-[#203627]">{rep.author}</span>
                          <span className="text-[#7A9382] font-mono text-[10px]">{rep.time}</span>
                        </div>
                        <p className="text-[#3E5645] leading-relaxed">{rep.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#7A9382] italic py-1">Belum ada komentar. Jadilah orang pertama yang memberi semangat!</p>
                  )}
                </div>

                <form onSubmit={(e) => handleAddReply(post.id, e)} className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Tulis balasan yang menenangkan..."
                    className="flex-1 p-2 rounded-xl border border-[#D5E2D5] bg-[#FAFBF9] text-xs text-[#203627] focus:outline-none focus:ring-2 focus:ring-[#37523E]/20"
                  />
                  <button
                    type="submit"
                    disabled={!replyInput.trim()}
                    className="px-3.5 py-2 rounded-xl bg-[#2D4B36] hover:bg-[#1E3626] text-white text-xs font-bold transition-all disabled:opacity-40"
                  >
                    Kirim
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
