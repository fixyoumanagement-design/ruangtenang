import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CommentItem {
  id: string;
  author: string;
  isVerified?: boolean;
  isAnonymous?: boolean;
  authorToken?: string;
  text: string;
  time: string;
  createdAt: number;
}

interface ForumPost {
  id: string;
  alias: string;
  authorToken: string;
  isVerified?: boolean;
  isAnonymous?: boolean;
  time: string;
  createdAt: number;
  tag?: string;
  content: string;
  likes: number;
  commentsCount: number;
  likedByTokens: string[];
  replies: CommentItem[];
}

const FORUM_DB_PATH = path.resolve(__dirname, 'forum_data.json');

const INITIAL_POSTS: ForumPost[] = [
  {
    id: 'post-seed-1',
    alias: "Anonim Pejuang Bab 4 (#Mhs-44)",
    authorToken: 'seed-author-1',
    isAnonymous: true,
    isVerified: false,
    time: "15 menit lalu",
    createdAt: Date.now() - 15 * 60 * 1000,
    tag: "#PejuangSkripsi",
    content: "Sudah seminggu revisian gak dibalas dosen pembimbing, tidur jam 3 pagi karena kepikiran terus. Ada yang ngerasain hal yang sama? Rasanya stuck tapi masih pengen berjuang buat ortu di kampung :)",
    likes: 34,
    commentsCount: 2,
    likedByTokens: [],
    replies: [
      {
        id: 'reply-seed-1',
        author: 'Mahasiswa Angkatan 2021',
        isVerified: true,
        isAnonymous: false,
        authorToken: 'seed-reply-1',
        text: 'Semangat kawan! Dospem aku juga pernah 2 minggu gak balas. Coba follow up dengan sopan di jam kerja ya, biasanya mereka banyak rapat.',
        time: '10 menit lalu',
        createdAt: Date.now() - 10 * 60 * 1000
      },
      {
        id: 'reply-seed-2',
        author: 'Anonim Penunggu Perpus',
        isVerified: false,
        isAnonymous: true,
        authorToken: 'seed-reply-2',
        text: 'Sama banget! Jangan lupa istirahat kawan, jangan begadang tiap hari. Naskah penting, tapi kesehatanmu nomor satu.',
        time: '5 menit lalu',
        createdAt: Date.now() - 5 * 60 * 1000
      }
    ]
  },
  {
    id: 'post-seed-2',
    alias: "Anak Rantau Kosan (#Mhs-89)",
    authorToken: 'seed-author-2',
    isAnonymous: true,
    isVerified: false,
    time: "1 jam lalu",
    createdAt: Date.now() - 60 * 60 * 1000,
    tag: "#AnakRantau",
    content: "Pertama kali sakit tipes sendirian di kosan. Kangen masakan ibu & gak berani cerita ke rumah takut ortu cemas. Makasih banyak buat teman-teman di sini yang sudah saling menguatkan.",
    likes: 82,
    commentsCount: 1,
    likedByTokens: [],
    replies: [
      {
        id: 'reply-seed-3',
        author: 'Kak Jeff (Konselor Sebaya)',
        isVerified: true,
        isAnonymous: false,
        authorToken: 'seed-reply-3',
        text: 'Cepat pulih kawan. Jangan sungkan kontak tim medis kampus atau minta tolong tetangga kosan buat beli obat ya.',
        time: '45 menit lalu',
        createdAt: Date.now() - 45 * 60 * 1000
      }
    ]
  },
  {
    id: 'post-seed-3',
    alias: "Pejuang Semhas (#Mhs-12)",
    authorToken: 'seed-author-3',
    isAnonymous: true,
    isVerified: false,
    time: "3 jam lalu",
    createdAt: Date.now() - 3 * 3600 * 1000,
    tag: "#MentalHealthKampus",
    content: "Kalian kalau lagi overthinking masa depan habis lulus biasanya ngapain? Rasanya teman-teman seangkatan udah pada magang keren, sedangkan aku masih bingung nentuin judul.",
    likes: 56,
    commentsCount: 0,
    likedByTokens: [],
    replies: []
  }
];

function loadForumPosts(): ForumPost[] {
  try {
    if (fs.existsSync(FORUM_DB_PATH)) {
      const data = fs.readFileSync(FORUM_DB_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed reading forum db, using initial seed:', err);
  }
  return [...INITIAL_POSTS];
}

let forumPosts: ForumPost[] = loadForumPosts();

function saveForumPosts() {
  try {
    fs.writeFileSync(FORUM_DB_PATH, JSON.stringify(forumPosts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed saving forum db:', err);
  }
}

// Safety & Moderation Helpers
const CRISIS_PATTERNS = [
  /bunuh\s*diri/i,
  /akhiri\s*hidup/i,
  /pengen\s*mati/i,
  /ingin\s*mati/i,
  /gak\s*mau\s*hidup/i,
  /sayat\s*tangan/i,
  /lompat\s*dari/i,
  /mengakhiri\s*semuanya/i,
  /hilang\s*selamanya/i
];

const SPAM_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /slot\s*gacor/i,
  /judol/i,
  /deposit\s*pulsa/i,
  /\.xyz/i,
  /\.link/i
];

const PHONE_REGEX = /\b(08[0-9]{8,11}|\+62[0-9]{8,12})\b/g;

const CAMPUS_ALIASES = [
  "Anonim Pejuang Bab 4",
  "Anak Rantau Kosan",
  "Pejuang Semhas",
  "Penunggu Perpus",
  "Kolektor Revisian",
  "Pejuang Skripsi",
  "Teman Satu Frekuensi",
  "Anak Teknik Lembur",
  "Pejuang Matkul Sulit",
  "Pendengar Setia",
  "Pejuang Deadline Pagi"
];

function generateCampusAlias(): string {
  const base = CAMPUS_ALIASES[Math.floor(Math.random() * CAMPUS_ALIASES.length)];
  const num = Math.floor(10 + Math.random() * 89);
  return `${base} (#Mhs-${num})`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === FORUM PUBLIC API ROUTES (CROSS-USER SYNC + SAFETY GUARDRAILS) ===

  // 1. GET all posts
  app.get('/api/forum/posts', (req, res) => {
    return res.json({ success: true, posts: forumPosts });
  });

  // 2. CREATE a new post
  app.post('/api/forum/posts', (req, res) => {
    try {
      const { content, tag, isAnonymous, userName, deviceToken } = req.body;
      const trimmed = (content || '').trim();

      if (!trimmed) {
        return res.status(400).json({ success: false, error: 'Konten tidak boleh kosong' });
      }

      // Safety Guardrail 1: Crisis Detection
      const isCrisis = CRISIS_PATTERNS.some(p => p.test(trimmed));
      if (isCrisis) {
        return res.json({
          success: false,
          isCrisis: true,
          crisisMessage: 'Kami sangat peduli dengan keselamatanmu. Kamu berharga dan tidak sendirian. Silakan hubungi Hotline Bantuan Darurat Kampus 24/7 di 0800-1100-222 atau klik tombol Bantuan Darurat untuk bicara langsung dengan konselor siaga.'
        });
      }

      // Safety Guardrail 2: Anti-Spam / Links
      if (SPAM_PATTERNS.some(p => p.test(trimmed))) {
        return res.status(400).json({
          success: false,
          error: 'Demi keamanan safe space, tautan luar (link) atau promosi tidak diperbolehkan.'
        });
      }

      // Safety Guardrail 3: Anti-Doxxing (Mask Phone Numbers)
      const sanitizedContent = trimmed.replace(PHONE_REGEX, '[Nomor Disensor Demi Privasi]');

      // Alias determination
      let alias: string;
      const anon = isAnonymous !== false;
      if (anon || !userName) {
        alias = generateCampusAlias();
      } else {
        alias = userName;
      }

      const newPost: ForumPost = {
        id: `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        alias,
        authorToken: deviceToken || `guest-${Date.now()}`,
        isAnonymous: anon,
        isVerified: !anon && Boolean(userName),
        time: 'Baru saja',
        createdAt: Date.now(),
        tag: tag || '#CurhatKampus',
        content: sanitizedContent,
        likes: 0,
        commentsCount: 0,
        likedByTokens: [],
        replies: []
      };

      forumPosts = [newPost, ...forumPosts];
      saveForumPosts();

      return res.json({ success: true, post: newPost });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. TOGGLE LIKE on a post
  app.post('/api/forum/posts/:id/like', (req, res) => {
    const { id } = req.params;
    const { deviceToken } = req.body;
    const token = deviceToken || 'anonymous-token';

    const post = forumPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Postingan tidak ditemukan' });
    }

    if (!Array.isArray(post.likedByTokens)) {
      post.likedByTokens = [];
    }

    const index = post.likedByTokens.indexOf(token);
    let isLiked = false;

    if (index >= 0) {
      post.likedByTokens.splice(index, 1);
      post.likes = Math.max(0, post.likes - 1);
      isLiked = false;
    } else {
      post.likedByTokens.push(token);
      post.likes += 1;
      isLiked = true;
    }

    saveForumPosts();
    return res.json({ success: true, likes: post.likes, isLiked });
  });

  // 4. ADD REPLY to a post
  app.post('/api/forum/posts/:id/reply', (req, res) => {
    const { id } = req.params;
    const { text, author, isAnonymous, deviceToken } = req.body;
    const trimmed = (text || '').trim();

    if (!trimmed) {
      return res.status(400).json({ success: false, error: 'Balasan tidak boleh kosong' });
    }

    // Safety checks
    if (CRISIS_PATTERNS.some(p => p.test(trimmed))) {
      return res.json({
        success: false,
        isCrisis: true,
        crisisMessage: 'Kami mendeteksi sinyal krisis. Harap hubungi Hotline Kampus 24/7 di 0800-1100-222.'
      });
    }

    if (SPAM_PATTERNS.some(p => p.test(trimmed))) {
      return res.status(400).json({ success: false, error: 'Tautan luar tidak diperbolehkan.' });
    }

    const post = forumPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Postingan tidak ditemukan' });
    }

    const sanitizedText = trimmed.replace(PHONE_REGEX, '[Nomor Disensor Demi Privasi]');
    const anon = isAnonymous !== false;
    const replyAuthor = anon || !author ? generateCampusAlias() : author;

    const newReply: CommentItem = {
      id: `reply-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      author: replyAuthor,
      isAnonymous: anon,
      isVerified: !anon && Boolean(author),
      authorToken: deviceToken || `reply-guest-${Date.now()}`,
      text: sanitizedText,
      time: 'Baru saja',
      createdAt: Date.now()
    };

    if (!Array.isArray(post.replies)) {
      post.replies = [];
    }

    post.replies.push(newReply);
    post.commentsCount = post.replies.length;
    saveForumPosts();

    return res.json({ success: true, reply: newReply, replies: post.replies, commentsCount: post.commentsCount });
  });

  // 5. DELETE own post (author verification)
  app.delete('/api/forum/posts/:id', (req, res) => {
    const { id } = req.params;
    const { deviceToken } = req.body;

    const index = forumPosts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Post tidak ditemukan' });
    }

    if (deviceToken && forumPosts[index].authorToken !== deviceToken) {
      return res.status(403).json({ success: false, error: 'Hanya pembuat postingan yang dapat menghapus ini' });
    }

    forumPosts.splice(index, 1);
    saveForumPosts();
    return res.json({ success: true });
  });

  // 6. UPLOAD / SET COUNSELOR PHOTO PERMANENTLY
  app.post('/api/counselor/photo', (req, res) => {
    try {
      const { photoData, counselorId } = req.body;
      if (!photoData || typeof photoData !== 'string') {
        return res.status(400).json({ success: false, error: 'Data foto tidak valid' });
      }

      const matches = photoData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = counselorId === '2' ? 'counselor_jeffian_exact.jpg' : `counselor_${counselorId}.jpg`;
        const savePath = path.resolve(__dirname, 'public', filename);
        fs.writeFileSync(savePath, buffer);
        return res.json({ success: true, url: `/${filename}` });
      }

      return res.status(400).json({ success: false, error: 'Format base64 salah' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route for counselor with Gemini AI
  app.post('/api/counselor', async (req, res) => {
    try {
      const { agent, userMessage, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.json({ success: false, reason: 'no_api_key' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const conversationContext = (history || [])
        .map((h: any) => `${h.sender === 'user' ? 'Mahasiswa' : agent.name}: ${h.text}`)
        .join('\n');

      const prompt = `${agent.systemPrompt}

# ATURAN GAYA BICARA ADAPTIF & ANTI-HIPERBOLA (BIKIN MAHASISWA BETAH & STAY):
1. HINDARI BAHASA HIPERBOLA / MELODRAMATIS:
   - JANGAN gunakan kata-kata mendayu-dayu atau lebay seperti "puk-puk", "virtual hug", "aduh parah banget nyesek", atau rasa kasihan yang berlebihan.
   - Bersikaplah seperti kakak tingkat (kating) yang santai, berkepala dingin, punya humor wajar, dan enak diajak ngobrol di warkop kampus.
2. ADAPTIF DENGAN PERSONALITY PENGGUNA (MIRRORING):
   - Jika pengguna santai / pakai humor / sedikit sarkas: tanggapi dengan asik, nyambung, dan jangan kaku.
   - Jika pengguna to the point / lelah: tanggapi ringkas, adem, dan beri ruang bernapas tanpa menggurui.
   - Jika pengguna curhat serius: dengarkan dengan tenang, jangan membesar-besarkan masalah, dan bantu urai dengan kepala dingin.
3. RETENTION & ENGAGEMENT:
   - Maksimal 2 sampai 3 kalimat pendek dan natural.
   - Akhiri dengan pertanyaan atau respon santai yang bikin seru buat dilanjutin ceritanya.

Riwayat obrolan:
${conversationContext}
Mahasiswa: ${userMessage}
${agent.name}:`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: prompt
        });
      } catch (e1) {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt
        });
      }

      const reply = response.text?.trim() || '';
      return res.json({ success: true, reply });
    } catch (err: any) {
      console.warn('Gemini proxy error:', err?.message || err);
      return res.json({ success: false, error: err?.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RuangTenang Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
