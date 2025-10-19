package com.example.notification_service.fakedata;

import com.example.notification_service.entity.Notification;
import com.example.notification_service.repository.NotificationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final NotificationRepository notificationRepository;

    public DataLoader(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        if (notificationRepository.count() == 0) {
            Notification n1 = new Notification();
            n1.setUserId("73957cfd-02d4-4253-8022-f93ae5bd2d38");
            n1.setMessage("Chào mừng bạn đến với hệ thống!");
            n1.setType("system");
            n1.setLink("/home");

            Notification n2 = new Notification();
            n2.setUserId("73957cfd-02d4-4253-8022-f93ae5bd2d38");
            n2.setMessage("Bạn có thông báo mới từ cộng đồng.");
            n2.setType("community");
            n2.setLink("/community/post/");

            Notification n3 = new Notification();
            n3.setUserId("73957cfd-02d4-4253-8022-f93ae5bd2d38");
            n3.setMessage("Giao dịch thành công: +500.000đ");
            n3.setType("finance");
            n3.setLink("/finance");
//
//            notificationRepository.save(n1);
//            notificationRepository.save(n2);
//            notificationRepository.save(n3);

            System.out.println("✅ Fake data inserted into MongoDB!");
        } else {
            System.out.println("ℹ️ Fake data already exists. Skipping...");
        }
    }
}
