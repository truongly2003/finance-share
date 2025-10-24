"# finance-share" 
Hệ thống **Quản lý tài chính cá nhân & Cộng đồng chia sẻ bài viết về tài chính** được phát triển theo **kiến trúc Microservice**, giúp người dùng quản lý ví, chi tiêu, ngân sách và mục tiêu tài chính cá nhân, đồng thời tham gia chia sẻ kiến thức, bài viết trong cộng đồng tài chính.

## Kiến trúc tổng quan

### 🔹 Frontend

* **ReactJS** kết hợp **TailwindCSS** → giao diện hiện đại, tối ưu trải nghiệm người dùng.

### 🔹 Backend

* **Microservice Architecture** với các công nghệ:

  * **Spring Boot** — phát triển dịch vụ nhanh chóng, dễ mở rộng.
  * **Spring Security** — bảo mật và xác thực người dùng.
  * **Spring Kafka** — xử lý thông báo real-time.
  * **Spring Data JPA** — tương tác cơ sở dữ liệu hiệu quả.

### 🔹 Database

| Service              | Database | Mô tả                                     |
| -------------------- | -------- | ----------------------------------------- |
| user-service         | MySQL    | Quản lý thông tin người dùng, xác thực    |
| notification-service | MongoDB  | Lưu trữ thông báo real-time               |
| finance-service      | MySQL    | Quản lý ví, chi tiêu, ngân sách, mục tiêu |
| community-service    | MongoDB  | Lưu trữ bài viết, bình luận, tương tác    |
| api-gateway          | -        | Cổng giao tiếp giữa các dịch vụ           |

---

## Tính năng 

### 🔸 Đăng nhập & Xác thực

* Đăng nhập bằng **Facebook**, **Google**, hoặc **Email**.
* Xác thực tài khoản qua **email** để bảo mật tối đa.

🖼️ *Ảnh minh họa phần đăng nhập — Ảnh 1*

---

### 🔸 Cộng đồng tài chính

* **Đăng bài viết**, **bình luận**, **thả tym**, và **quản lý bài viết cá nhân**.
* Không gian chia sẻ kiến thức và kinh nghiệm tài chính.

🖼️ *Ảnh minh họa phần cộng đồng — Ảnh 2*

---

### 🔸 Quản lý tài chính cá nhân

* **Quản lý ví**, **chi tiêu**, **ngân sách**, **mục tiêu**.
* **Thống kê chi tiêu** trực quan giúp theo dõi dòng tiền hiệu quả.

🖼️ *Ảnh minh họa phần quản lý tài chính — Ảnh 3*

---

### 🔸 Thông báo real-time

* Cập nhật ngay lập tức các sự kiện: bình luận, tương tác, hoặc cập nhật ngân sách.
* Triển khai qua **Spring Kafka** + **WebSocket**.

🖼️ *Ảnh minh họa phần thông báo — Ảnh 4*

---

## ⚙️ Công nghệ sử dụng

| Thành phần     | Công nghệ                                                   |
| -------------- | ----------------------------------------------------------- |
| Frontend       | ReactJS, TailwindCSS                                        |
| Backend        | Spring Boot, Spring Security, Spring Kafka, Spring Data JPA |
| Database       | MySQL, MongoDB                                              |
| Authentication | Google, Facebook, Email verification                        |
| Communication  | REST API, Kafka                            |
| Deployment     | Docker, Microservice Architecture                           |

