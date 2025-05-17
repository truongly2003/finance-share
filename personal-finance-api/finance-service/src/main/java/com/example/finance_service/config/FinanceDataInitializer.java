package com.example.finance_service.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.yaml.snakeyaml.comments.CommentLine;

@Configuration
public class FinanceDataInitializer {
//    @Bean
//    CommandLineRunner initFinanceData(WalletRepository walletRepository,
//                                      CategoryRepository categoryRepository,
//                                      TransactionRepository transactionRepository) {
//        return args -> {
//            Faker faker = new Faker();
//            Random random = new Random();
//
//            // 1. Tạo danh mục
//            String[] names = {"Ăn uống", "Lương", "Mua sắm"};
//            String[] types = {"EXPENSE", "INCOME"};
//            for (String name : names) {
//                Category category = new Category();
//                category.setName(name);
//                category.setType(types[random.nextInt(2)]);
//                categoryRepository.save(category);
//            }
//
//            // 2. Tạo ví
//            for (long userId = 1; userId <= 5; userId++) {
//                Wallet wallet = new Wallet();
//                wallet.setUserId(userId);
//                wallet.setName("Ví " + userId);
//                wallet.setBalance(BigDecimal.valueOf(random.nextInt(5000000)));
//                walletRepository.save(wallet);
//            }
//
//            // 3. Tạo giao dịch
//            List<Wallet> wallets = walletRepository.findAll();
//            List<Category> categories = categoryRepository.findAll();
//            for (Wallet wallet : wallets) {
//                for (int i = 0; i < 3; i++) {
//                    Transaction transaction = new Transaction();
//                    transaction.setUserId(wallet.getUserId());
//                    transaction.setWallet(wallet);
//                    transaction.setCategory(categories.get(random.nextInt(categories.size())));
//                    transaction.setAmount(BigDecimal.valueOf(random.nextInt(500000)));
//                    transaction.setType(random.nextBoolean() ? "INCOME" : "EXPENSE");
//                    transaction.setDescription(faker.commerce().productName());
//                    transaction.setTransactionDate(faker.date().past(30, java.util.concurrent.TimeUnit.DAYS)
//                            .toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime());
//                    transactionRepository.save(transaction);
//                }
//            }
//
//            System.out.println("Fake finance OK!");
//        };
//    }
}
