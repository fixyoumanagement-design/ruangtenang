import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  Send
} from 'lucide-react';
import { UserProfile } from './LoginModal';

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
  tag?: string;
  content: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  replies?: CommentItem[];
}

interface ForumViewProps {
  currentUser?: UserProfile | null;
  onOpenCrisisModal?: () => void;
  onOpenLoginModal?: () => void;
  onNavigate?: (page: any) => void;
}

const HIGH_FI_POSTS: ForumPost[] = [
  {
    id: '1',
    alias: "Anonim Pejuang Bab 4",
    time: "15 menit lalu",
    tag: "#PejuangSkripsi",
    content: "Sudah seminggu revisian gak dibalas dosen pembimbing, tidur jam 3 pagi karena kepikiran terus. Ada yang ngerasain hal yang sama? Rasanya mau nyerah tapi sayang ortu di kampung:)",
    likes: 32,
    commentsCount: 2,
    isLiked: false,
    replies: [
      { 
        id: 'r1', 
        author: 'Mahasiswa Angkatan 2021', 
        text: 'Semangat ya kak! Dospem aku juga pernah 2minggu gak balas. Coba follow up dengan sopan di jam kerja yaa.', 
        time: '10 menit lalu' 
      }
    ]
  },
  {
    id: '2',
    alias: "Anak Rantau Sulawesi",
    time: "1 jam lalu",
    tag: "#AnakRantau",
    content: "Pertama kali sakit tipes sendirian di kosan. Kangen masakan ibu & gak berani cerita ke rumah takut ortu cemas. Makasih buat teman-teman disini yang sudah support.",
    likes: 78,
    commentsCount: 12,
    isLiked: false,
    replies: []
  }
];

export const ForumView: React.FC<ForumViewProps> = ({ currentUser, onOpenCrisisModal }) => {
  const [isAnonymousPost, setIsAnonymousPost] = useState<boolean>(true);
  const [postContent, setPostContent] = useState<string>('');
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: string }>({});

  // Device token for persistent system sync
  const [deviceToken] = useState<string>(() => {
    try {
      let token = localStorage.getItem('ruangtenang_forum_device_token');
      if (!token) {
        token = `user-dt-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        localStorage.setItem('ruangtenang_forum_device_token', token);
      }
      return token;
    } catch {
      return `temp-token-${Date.now()}`;
    }
  });

  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const stored = localStorage.getItem('ruangtenang_forum_posts_hifi');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Storage fallback
    }
    return HIGH_FI_POSTS;
  });

  // Sistem background sync dengan server pusat
  const syncWithServer = async () => {
    try {
      const res = await fetch('/api/forum/posts');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
          const mapped: ForumPost[] = data.posts.map((p: any) => ({
            id: p.id,
            alias: p.alias,
            time: p.time,
            tag: p.tag,
            content: p.content,
            likes: p.likes || 0,
            commentsCount: p.commentsCount || (p.replies ? p.replies.length : 0),
            isLiked: Array.isArray(p.likedByTokens) ? p.likedByTokens.includes(deviceToken) : false,
            replies: (p.replies || []).map((r: any) => ({
              id: r.id,
              author: r.author,
              text: r.text,
              time: r.time
            }))
          }));
          setPosts(mapped);
          localStorage.setItem('ruangtenang_forum_posts_hifi', JSON.stringify(mapped));
        }
      }
    } catch {
      // Gunakan local state jika server offline
    }
  };

  useEffect(() => {
    syncWithServer();
    const interval = setInterval(syncWithServer, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = async (postId: string) => {
    // Update tampilan langsung
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      }
      return p;
    }));

    // Sinkronkan ke server sistem di background
    try {
      const res = await fetch(`/api/forum/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceToken })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: data.likes, isLiked: data.isLiked } : p));
        }
      }
    } catch {
      // Revert fallback
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = postContent.trim();
    if (!trimmed) return;

    // Tentukan alias sesuai sistem: login atau anonim
    let authorAlias = 'Anonim (#PejuangSkripsi44)';
    if (!isAnonymousPost && currentUser?.name) {
      authorAlias = currentUser.name;
    } else {
      authorAlias = `Anonim (#PejuangSkripsi${Math.floor(10 + Math.random() * 89)})`;
    }

    const newPost: ForumPost = {
      id: Date.now().toString(),
      alias: authorAlias,
      time: 'Baru saja',
      content: trimmed,
      likes: 0,
      commentsCount: 0,
      isLiked: false,
      replies: []
    };

    // Optimistic UI persis high-fi
    setPosts(prev => [newPost, ...prev]);
    setPostContent('');

    // Kirim ke server sistem di background
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: trimmed,
          isAnonymous: isAnonymousPost,
          userName: currentUser ? currentUser.name : null,
          deviceToken
        })
      });
      const data = await res.json();
      if (data.isCrisis && onOpenCrisisModal) {
        onOpenCrisisModal();
      }
      syncWithServer();
    } catch {
      // Tetap tersimpan di local
    }
  };

  const handleSendReply = async (postId: string) => {
    const text = (replyInputs[postId] || '').trim();
    if (!text) return;

    let replyAuthor = 'Mahasiswa Kampus';
    if (!isAnonymousPost && currentUser?.name) {
      replyAuthor = currentUser.name;
    }

    const newReply: CommentItem = {
      id: Date.now().toString(),
      author: replyAuthor,
      text,
      time: 'Baru saja'
    };

    // Update UI langsung
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const updatedReplies = [...(p.replies || []), newReply];
        return {
          ...p,
          replies: updatedReplies,
          commentsCount: updatedReplies.length
        };
      }
      return p;
    }));

    setReplyInputs(prev => ({ ...prev, [postId]: '' }));

    // Kirim ke server sistem
    try {
      await fetch(`/api/forum/posts/${postId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          author: currentUser ? currentUser.name : null,
          isAnonymous: isAnonymousPost,
          deviceToken
        })
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-16">
      
      {/* 
        HEADER PERSIS HIGH-FI:
        Judul: "Forum Mahasiswa"
        Subtitle: "Berbagi cerita dan keluh kesah seputar dunia kuliah secara anonim."
      */}
      <div className="space-y-1 pb-1">
        <h1 className="text-xl sm:text-2xl font-bold text-[#162A1D] font-heading">
          Forum Mahasiswa
        </h1>
        <p className="text-xs sm:text-sm text-[#526F5A]">
          Berbagi cerita dan keluh kesah seputar dunia kuliah secara anonim.
        </p>
      </div>

      {/* 
        BANNER PRIVASI PERSIS HIGH-FI:
        Shield icon + "Privasi Terlindungi" + "Jaga privasi sesama, saling menguatkan, dan hindari menyebarkan data pribadi."
      */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#DCE7DD] shadow-xs flex items-center space-x-3.5">
        <div className="w-9 h-9 rounded-full bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#2E4F36]" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-[#182C1F]">
            Privasi Terlindungi
          </h3>
          <p className="text-[11px] sm:text-xs text-[#526F5A] mt-0.5">
            Jaga privasi sesama, saling menguatkan, dan hindari menyebarkan data pribadi.
          </p>
        </div>
      </div>

      {/* 
        INPUT FORM PERSIS HIGH-FI:
        Textarea: "Ceritakan keresahanmu....."
        Bottom row: [✓] Posting sebagai Anonim (#PejuangSkripsi44)  |  [Send icon] Posting
      */}
      <form onSubmit={handleCreatePost} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE7DD] shadow-xs space-y-3">
        <textarea
          rows={3}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Ceritakan keresahanmu....."
          className="w-full p-3 rounded-xl bg-[#FAFBF9] border border-[#CCDCCD] text-xs text-[#1A2E20] placeholder-[#76937E] focus:outline-none focus:ring-1 focus:ring-[#2C5237] resize-none"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#EDF3ED]">
          <label className="flex items-center space-x-2 cursor-pointer select-none text-xs text-[#38533F]">
            <input
              type="checkbox"
              checked={isAnonymousPost}
              onChange={(e) => setIsAnonymousPost(e.target.checked)}
              className="accent-[#284332] w-4 h-4 rounded cursor-pointer"
            />
            <span className="font-medium">
              Posting sebagai Anonim (#PejuangSkripsi44)
            </span>
          </label>

          <button
            type="submit"
            disabled={!postContent.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 sm:py-2 rounded-xl text-xs font-bold bg-[#284332] text-white hover:bg-[#1E3426] disabled:opacity-40 transition-all cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Posting</span>
          </button>
        </div>
      </form>

      {/* 
        FEED POSTS PERSIS HIGH-FI
      */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE7DD] shadow-xs space-y-3 transition-all"
          >
            {/* Header Post */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF3EC] text-[#294B32] flex items-center justify-center font-bold text-xs border border-[#CCDCCD]">
                  {post.alias.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#182C1F]">
                    {post.alias}
                  </h3>
                  <span className="text-[10px] text-[#718D7A]">
                    {post.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Isi Cerita */}
            <p className="text-xs sm:text-sm text-[#27402F] leading-relaxed">
              {post.content}
            </p>

            {/* Tombol Interaksi: Like (32)   Komentar (2) */}
            <div className="flex items-center space-x-4 pt-1 text-xs text-[#5C7965] border-t border-[#EDF3ED]">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-[#182C1F]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>Like ({post.likes})</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Komentar ({post.commentsCount || (post.replies ? post.replies.length : 0)})</span>
              </div>
            </div>

            {/* 
              Threaded Comment Sesuai High-Fi:
              Tampak langsung di bawah postingan pertama
            */}
            {post.replies && post.replies.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#F0F4F0]">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="p-3 rounded-xl bg-[#F6FAF7] border border-[#E0ECE0] flex items-start space-x-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#E2EDE2] text-[#274730] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {reply.author.charAt(0)}
                    </div>
                    <div className="space-y-0.5 text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#182C1F]">{reply.author}</span>
                        <span className="text-[10px] text-[#718D7A]">{reply.time}</span>
                      </div>
                      <p className="text-[#3A5642] leading-relaxed">{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Balasan Sesuai High-Fi: "Tulis balasan...." with send icon */}
            <div className="pt-1 flex items-center space-x-2">
              <input
                type="text"
                value={replyInputs[post.id] || ''}
                onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendReply(post.id);
                  }
                }}
                placeholder="Tulis balasan...."
                className="flex-1 px-3 py-1.5 rounded-xl bg-[#FAFBF9] border border-[#CCDCCD] text-xs text-[#1A2E20] placeholder-[#76937E] focus:outline-none focus:ring-1 focus:ring-[#2C5237]"
              />
              <button
                type="button"
                onClick={() => handleSendReply(post.id)}
                disabled={!(replyInputs[post.id] || '').trim()}
                className="p-2 rounded-xl bg-[#284332] text-white disabled:opacity-40 hover:bg-[#1E3426] transition-all cursor-pointer shadow-2xs"
                title="Kirim balasan"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
