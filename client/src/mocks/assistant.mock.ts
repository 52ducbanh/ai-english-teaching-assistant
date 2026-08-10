import type { AssistantDataResponse } from "../types/assistant";

export const MOCK_DATABASE: Record<number, AssistantDataResponse> = {
  1: {
    lesson: { id: "1", name: "Unit 1: Hello!", grade: 3, subject: "Tiếng Anh" },
    vocabularies: [
      { id: "v1", word: "hello", phonetic: "/həˈləʊ/", meaning: "xin chào" },
      { id: "v2", word: "hi", phonetic: "/haɪ/", meaning: "chào" },
      {
        id: "v3",
        word: "teacher",
        phonetic: "/ˈtiːtʃə(r)/",
        meaning: "giáo viên",
      },
      {
        id: "v4",
        word: "student",
        phonetic: "/ˈstjuːdnt/",
        meaning: "học sinh",
      },
      {
        id: "v5",
        word: "goodbye",
        phonetic: "/ˌɡʊdˈbaɪ/",
        meaning: "tạm biệt",
      },
      {
        id: "v6",
        word: "bye",
        phonetic: "/baɪ/",
        meaning: "tạm biệt (thân mật)",
      },
      { id: "v7", word: "fine", phonetic: "/faɪn/", meaning: "khỏe, tốt" },
      { id: "v8", word: "thanks", phonetic: "/θæŋks/", meaning: "cảm ơn" },
      {
        id: "v9",
        word: "morning",
        phonetic: "/ˈmɔːnɪŋ/",
        meaning: "buổi sáng",
      },
      {
        id: "v10",
        word: "afternoon",
        phonetic: "/ˌɑːftəˈnuːn/",
        meaning: "buổi chiều",
      },
    ],
    sentences: [
      {
        id: "s1",
        english: "Hello, I am Miss Hien.",
        vietnamese: "Xin chào, cô là cô Hiền.",
      },
      { id: "s2", english: "Hi, I am Nam.", vietnamese: "Chào, mình là Nam." },
      {
        id: "s3",
        english: "Nice to meet you.",
        vietnamese: "Rất vui được gặp bạn.",
      },
      { id: "s4", english: "How are you?", vietnamese: "Bạn có khỏe không?" },
      {
        id: "s5",
        english: "I am fine, thank you.",
        vietnamese: "Mình khỏe, cảm ơn bạn.",
      },
      {
        id: "s6",
        english: "Goodbye, Miss Hien.",
        vietnamese: "Tạm biệt cô Hiền.",
      },
      { id: "s7", english: "Bye, Nam.", vietnamese: "Tạm biệt Nam." },
      {
        id: "s8",
        english: "Good morning, teacher.",
        vietnamese: "Chào buổi sáng, thưa cô/thầy.",
      },
      {
        id: "s9",
        english: "Good afternoon, class.",
        vietnamese: "Chào buổi chiều, cả lớp.",
      },
      {
        id: "s10",
        english: "See you later.",
        vietnamese: "Hẹn gặp lại sau nhé.",
      },
    ],
    questions: [
      {
        id: "q1",
        question: 'Khi nào dùng "Hello" và "Hi"?',
        hint: '"Hello" trang trọng hơn, dùng cho người lớn. "Hi" dùng cho bạn bè.',
      },
      {
        id: "q2",
        question: "Cách chào khi mới gặp ai đó?",
        hint: 'Dùng câu "Nice to meet you." (Rất vui được gặp bạn).',
      },
      {
        id: "q3",
        question: '"Goodbye" và "Bye" khác nhau thế nào?',
        hint: '"Goodbye" trang trọng hơn, dùng khi chào người lớn. "Bye" dùng thân mật với bạn bè.',
      },
      {
        id: "q4",
        question: '"How are you?" dùng để làm gì?',
        hint: 'Dùng để hỏi thăm sức khỏe: "Bạn có khỏe không?".',
      },
      {
        id: "q5",
        question: 'Trả lời câu "How are you?" như thế nào?',
        hint: 'Thường trả lời là: "I am fine, thank you." (Mình khỏe, cảm ơn bạn).',
      },
      {
        id: "q6",
        question: 'Khi nào thì nói "Good morning"?',
        hint: "Nói vào buổi sáng (thường từ sáng sớm đến trước 12 giờ trưa).",
      },
      {
        id: "q7",
        question: 'Khi nào thì nói "Good afternoon"?',
        hint: "Nói vào buổi chiều (thường từ sau 12 giờ trưa đến trước 6 giờ tối).",
      },
      {
        id: "q8",
        question: 'Từ "teacher" nghĩa là gì?',
        hint: '"Teacher" nghĩa là giáo viên (thầy giáo hoặc cô giáo).',
      },
      {
        id: "q9",
        question: "Khi tạm biệt và muốn hẹn gặp lại thì nói gì?",
        hint: 'Nói "See you later." (Hẹn gặp lại sau).',
      },
      {
        id: "q10",
        question: 'Tại sao nói "I am" chứ không phải "I is"?',
        hint: 'Trong tiếng Anh, đại từ "I" (tôi) luôn đi với động từ to be "am".',
      },
    ],
  },

  4: {
    lesson: {
      id: "4",
      name: "Unit 1: My New School",
      grade: 6,
      subject: "Tiếng Anh",
    },
    vocabularies: [
      { id: "v1", word: "school", phonetic: "/skuːl/", meaning: "trường học" },
      {
        id: "v2",
        word: "classroom",
        phonetic: "/ˈklɑːsruːm/",
        meaning: "phòng học",
      },
      {
        id: "v3",
        word: "library",
        phonetic: "/ˈlaɪbrəri/",
        meaning: "thư viện",
      },
      { id: "v4", word: "canteen", phonetic: "/kænˈtiːn/", meaning: "căn-tin" },
      {
        id: "v5",
        word: "uniform",
        phonetic: "/ˈjuːnɪfɔːm/",
        meaning: "đồng phục",
      },
      {
        id: "v6",
        word: "compass",
        phonetic: "/ˈkʌmpəs/",
        meaning: "cái com-pa",
      },
      {
        id: "v7",
        word: "calculator",
        phonetic: "/ˈkælkjuleɪtə(r)/",
        meaning: "máy tính cầm tay",
      },
    ],
    sentences: [
      {
        id: "s1",
        english: "This is my new school.",
        vietnamese: "Đây là trường mới của tôi.",
      },
      {
        id: "s2",
        english: "I wear a uniform to school.",
        vietnamese: "Tôi mặc đồng phục đến trường.",
      },
      {
        id: "s3",
        english: "Where is the library?",
        vietnamese: "Thư viện ở đâu?",
      },
      {
        id: "s4",
        english: "It is next to the classroom.",
        vietnamese: "Nó ở cạnh phòng học.",
      },
      {
        id: "s5",
        english: "Do you have a new compass?",
        vietnamese: "Bạn có cái com-pa mới không?",
      },
    ],
    questions: [
      {
        id: "q1",
        question: '"library" nghĩa là gì?',
        hint: "library = thư viện.",
      },
      {
        id: "q2",
        question: "Cách hỏi vị trí bằng tiếng Anh?",
        hint: "Where is + danh từ? (Ví dụ: Where is the canteen?)",
      },
      { id: "q3", question: '"uniform" là gì?', hint: "Đồng phục mặc đi học." },
    ],
  },

  6: {
    lesson: {
      id: "6",
      name: "Unit 3: My Friends",
      grade: 6,
      subject: "Tiếng Anh",
    },
    vocabularies: [
      {
        id: "v1",
        word: "friendly",
        phonetic: "/ˈfrendli/",
        meaning: "thân thiện",
      },
      {
        id: "v2",
        word: "clever",
        phonetic: "/ˈklevə(r)/",
        meaning: "thông minh",
      },
      { id: "v3", word: "kind", phonetic: "/kaɪnd/", meaning: "tốt bụng" },
      { id: "v4", word: "funny", phonetic: "/ˈfʌni/", meaning: "hài hước" },
      {
        id: "v5",
        word: "helpful",
        phonetic: "/ˈhelpfəl/",
        meaning: "hay giúp đỡ",
      },
    ],
    sentences: [
      {
        id: "s1",
        english: "What does your friend look like?",
        vietnamese: "Bạn của bạn trông như thế nào?",
      },
      {
        id: "s2",
        english: "She is very kind and friendly.",
        vietnamese: "Cô ấy rất tốt bụng và thân thiện.",
      },
      {
        id: "s3",
        english: "He is tall and funny.",
        vietnamese: "Cậu ấy cao và hài hước.",
      },
    ],
    questions: [
      {
        id: "q1",
        question: '"friendly" nghĩa là gì?',
        hint: "friendly nghĩa là thân thiện.",
      },
      {
        id: "q2",
        question: 'Khi nào dùng "What does ... look like?"',
        hint: "Dùng khi muốn hỏi về ngoại hình của ai đó.",
      },
    ],
  },

  8: {
    lesson: {
      id: "8",
      name: "Unit 1: My Hobbies",
      grade: 7,
      subject: "Tiếng Anh",
    },
    vocabularies: [
      { id: "v1", word: "hobby", phonetic: "/ˈhɒbi/", meaning: "sở thích" },
      { id: "v2", word: "collect", phonetic: "/kəˈlekt/", meaning: "sưu tầm" },
      { id: "v3", word: "model", phonetic: "/ˈmɒdl/", meaning: "mô hình" },
    ],
    sentences: [
      {
        id: "s1",
        english: "My hobby is collecting stamps.",
        vietnamese: "Sở thích của tôi là sưu tầm tem.",
      },
      {
        id: "s2",
        english: "Do you like making models?",
        vietnamese: "Bạn có thích làm mô hình không?",
      },
    ],
    questions: [
      {
        id: "q1",
        question: 'Sau "like" dùng động từ thêm gì?',
        hint: "Sau like, love, enjoy thì động từ thêm đuôi -ing.",
      },
      {
        id: "q2",
        question: '"hobby" số nhiều viết như thế nào?',
        hint: 'Đổi "y" thành "ies": hobbies.',
      },
    ],
  },
};
