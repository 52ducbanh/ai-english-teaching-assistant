export const ERROR_MESSAGES = {
  NETWORK: "Lỗi kết nối server",
  UNKNOWN: "Đã xảy ra lỗi không xác định",
  LOAD_SUBJECTS: "Không thể tải danh sách môn học",
  LOAD_GRADES: "Không thể tải danh sách khối lớp",
  LOAD_LESSONS: "Không thể tải danh sách bài học",
  ASSISTANT_NOT_FOUND: (lessonId: number) => `Không tìm thấy dữ liệu trợ giảng cho bài học id: ${lessonId}`,
} as const;

export const PLACEHOLDER_MESSAGES = {
  SELECT_SUBJECT: "Chọn môn học",
  SELECT_GRADE: "Chọn khối lớp",
  SELECT_LESSON: "Chọn bài học",
  LOADING_SUBJECTS: "Đang tải môn học...",
  LOADING_GRADES: "Đang tải khối lớp...",
  LOADING_LESSONS: "Đang tải bài học...",
  NO_GRADES: "Chưa có khối lớp cho môn học này",
  NO_LESSONS: "Chưa có bài học cho môn và khối này",
} as const;
