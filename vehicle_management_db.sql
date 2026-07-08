-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: vehicle_management_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requisition_id` int DEFAULT NULL,
  `vehicle_id` int DEFAULT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `remarks` text,
  `assigned_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `driver_phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `requisition_id` (`requisition_id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`requisition_id`) REFERENCES `requisitions` (`id`),
  CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (6,1,1,'Karim','Ready car','2026-06-25 17:18:32',NULL),(7,1,1,'Abul Kashem','Vehicle is ready for travel','2026-06-27 08:55:24',NULL),(8,2,1,NULL,NULL,'2026-06-29 09:16:45',NULL),(9,7,1,'','','2026-06-30 18:16:52',NULL),(10,9,7,'sakib','34','2026-06-30 21:28:32',NULL),(11,10,7,'Some one','Vehicle assigned successfully','2026-07-01 05:46:23',NULL),(12,13,8,'sakib','something','2026-07-01 13:44:52',NULL),(13,20,7,'karim','any comment add here','2026-07-03 19:31:12',NULL),(14,20,3,'sakib','something','2026-07-03 19:49:15',NULL),(15,21,4,'karim','something','2026-07-03 20:19:16',NULL),(16,21,3,'fghj','fghjk','2026-07-03 20:25:54',NULL),(17,22,3,'sakib','something','2026-07-03 20:35:20',NULL),(18,22,4,'sakib','something','2026-07-03 20:44:51',NULL),(19,23,2,'karim','something','2026-07-03 20:51:40',NULL),(20,24,4,'karim','something','2026-07-03 21:08:23',NULL),(21,25,2,'sakib ','something','2026-07-03 21:29:27','01723456907'),(22,26,7,'sakib','something','2026-07-03 21:31:43','01789634562'),(23,26,3,'sakib ','something','2026-07-03 21:35:50','01734567923'),(24,27,3,'Rakib','any comment here','2026-07-03 21:41:49','01723458945'),(25,28,4,'imran','anything','2026-07-03 21:55:02','01723456895'),(26,29,7,'Rahim','something','2026-07-03 22:24:43','01747823951'),(27,30,3,'Rahim','say something','2026-07-05 13:56:50','01707823951'),(28,31,4,'Karim','something','2026-07-05 14:53:31','01773181212'),(29,32,4,'Rahim','something','2026-07-05 14:57:08','01773141818'),(30,33,4,'Someone','Something','2026-07-06 16:34:11','01734567892'),(31,34,1,NULL,NULL,'2026-07-07 15:35:35',NULL),(32,34,1,NULL,NULL,'2026-07-07 15:37:26',NULL),(33,36,2,'Karim','Something','2026-07-07 16:48:41','01747825643'),(34,36,4,NULL,NULL,'2026-07-07 16:55:44',NULL),(35,36,4,NULL,NULL,'2026-07-07 16:55:49',NULL),(36,37,8,'Sakib','something','2026-07-07 20:46:22','01747823965'),(37,38,2,'Karim','Something','2026-07-08 09:20:05','01747823456');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `requisition_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,'Vehicle Assigned',13,'2026-07-01 13:44:53'),(2,'Requisition Created',19,'2026-07-01 14:25:25'),(3,'Request Cancelled',19,'2026-07-01 14:41:42'),(4,'Request Rejected',19,'2026-07-03 14:15:46'),(5,'Request Approved',19,'2026-07-03 14:15:53'),(6,'Requisition Created',20,'2026-07-03 15:05:47'),(7,'Request Approved',20,'2026-07-03 19:30:45'),(8,'Vehicle Assigned',20,'2026-07-03 19:31:12'),(9,'Vehicle Assigned',20,'2026-07-03 19:49:16'),(10,'Request Completed',20,'2026-07-03 19:49:28'),(11,'Requisition Created',21,'2026-07-03 20:18:25'),(12,'Request Completed',21,'2026-07-03 20:18:42'),(13,'Vehicle Assigned',21,'2026-07-03 20:19:18'),(14,'Vehicle Assigned',21,'2026-07-03 20:25:54'),(15,'Request Completed',21,'2026-07-03 20:25:59'),(16,'Requisition Created',22,'2026-07-03 20:34:39'),(17,'Request Completed',22,'2026-07-03 20:34:53'),(18,'Vehicle Assigned',22,'2026-07-03 20:35:21'),(19,'Vehicle Assigned',22,'2026-07-03 20:44:51'),(20,'Requisition Created',23,'2026-07-03 20:50:36'),(21,'Vehicle Assigned',23,'2026-07-03 20:51:42'),(22,'Requisition Created',24,'2026-07-03 21:07:35'),(23,'Vehicle Assigned',24,'2026-07-03 21:08:24'),(24,'Requisition Created',25,'2026-07-03 21:28:38'),(25,'Vehicle Assigned',25,'2026-07-03 21:29:28'),(26,'Requisition Created',26,'2026-07-03 21:31:04'),(27,'Vehicle Assigned',26,'2026-07-03 21:31:44'),(28,'Vehicle Assigned',26,'2026-07-03 21:35:51'),(29,'Requisition Created',27,'2026-07-03 21:40:59'),(30,'Vehicle Assigned',27,'2026-07-03 21:41:50'),(31,'Requisition Created',28,'2026-07-03 21:44:20'),(32,'Vehicle Assigned',28,'2026-07-03 21:55:03'),(33,'Requisition Created',29,'2026-07-03 22:23:52'),(34,'Vehicle Assigned',29,'2026-07-03 22:24:44'),(35,'Request Cancelled',11,'2026-07-04 12:19:58'),(36,'Requisition Created',30,'2026-07-05 13:55:03'),(37,'Vehicle Assigned',30,'2026-07-05 13:56:51'),(38,'Requisition Created',31,'2026-07-05 14:51:58'),(39,'Vehicle Assigned',31,'2026-07-05 14:53:31'),(40,'Requisition Created',32,'2026-07-05 14:56:18'),(41,'Vehicle Assigned',32,'2026-07-05 14:57:08'),(42,'Request Approved',32,'2026-07-06 13:08:21'),(43,'Requisition Created',33,'2026-07-06 16:33:28'),(44,'Vehicle Assigned',33,'2026-07-06 16:34:11'),(45,'Requisition Created',34,'2026-07-07 14:50:57'),(46,'Request Approved',34,'2026-07-07 15:00:27'),(47,'Vehicle Assigned',34,'2026-07-07 15:35:36'),(48,'Vehicle Assigned',34,'2026-07-07 15:37:26'),(49,'Requisition Created',35,'2026-07-07 16:33:11'),(50,'Requisition Created',36,'2026-07-07 16:47:56'),(51,'Vehicle Assigned',36,'2026-07-07 16:48:41'),(52,'Request Approved',34,'2026-07-07 16:54:00'),(53,'Vehicle Assigned',36,'2026-07-07 16:55:44'),(54,'Vehicle Assigned',36,'2026-07-07 16:55:49'),(55,'Request Rejected',35,'2026-07-07 17:19:40'),(56,'Request Cancelled',36,'2026-07-07 19:27:42'),(57,'Requisition Created',37,'2026-07-07 20:45:35'),(58,'Vehicle Assigned',37,'2026-07-07 20:46:22'),(59,'Requisition Created',38,'2026-07-08 09:18:47'),(60,'Vehicle Assigned',38,'2026-07-08 09:20:05');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requisitions`
--

DROP TABLE IF EXISTS `requisitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requisitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requisition_number` varchar(50) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `travel_date` date DEFAULT NULL,
  `pickup_location` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `purpose` text,
  `passenger_count` int DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `priority` enum('Normal','Urgent') DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected','Cancelled','Completed') DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `requisition_number` (`requisition_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `requisitions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requisitions`
--

LOCK TABLES `requisitions` WRITE;
/*!40000 ALTER TABLE `requisitions` DISABLE KEYS */;
INSERT INTO `requisitions` VALUES (1,'REQ-1782403959046',1,'2026-07-01','Dhaka Office','Chittagong','Meeting',3,'2 days','Normal','Rejected','2026-06-25 16:12:39'),(2,'REQ-1782406196802',1,'2026-07-01','Dhaka Office','Chittagong','Meeting',3,'2 days','Normal','Rejected','2026-06-25 16:49:56'),(3,'REQ-1782566684572',10,'2026-06-28','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','Official meeting with the development team and client presentation.',4,'2 hours','Urgent','Approved','2026-06-27 13:24:44'),(4,'REQ-1782567875083',10,'2026-06-28','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','fghjmksdfghjkrtyhj',2,'3 hours','Urgent','Approved','2026-06-27 13:44:35'),(5,'REQ-1782703989057',10,'2026-06-30','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','fghjdcfvbnm,',2,'1 hour','Urgent','Approved','2026-06-29 03:33:09'),(6,'REQ-1782726795266',10,'2026-06-30','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','office meeting',2,'1 hour','Normal','Rejected','2026-06-29 09:53:15'),(7,'REQ-1782729234773',10,'2026-06-30','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','office presentation ',2,'1:30 hour','Normal','Approved','2026-06-29 10:33:54'),(8,'REQ-1782846253296',10,'2026-08-01','kazipara','Bijoy Sarani','Office meeting',1,'1 hour','Normal','Rejected','2026-06-30 19:04:13'),(9,'REQ-1782854889270',10,'2026-08-02','kazipara','Bijoy Sarani','Office meeting',3,'2 hours','Normal','Completed','2026-06-30 21:28:09'),(10,'REQ-1782884566626',10,'2026-08-07','Shawrapara','Mirpur-10','Office Presentation',1,'20 minute','Normal','Completed','2026-07-01 05:42:46'),(11,'REQ-1782886010485',10,'2026-08-08','kazipara','Bijoy Sarani','Office Presentation',1,'20 minute','Normal','Cancelled','2026-07-01 06:06:50'),(12,'REQ-1782908864411',10,'2026-08-06','kazipara','Level-7, Monem Business District, Eastern Tower','for office',1,'1 hour','Normal','Approved','2026-07-01 12:27:44'),(13,'REQ-1782913397454',11,'2026-07-22','kazipara','Level-7, Monem Business District, Eastern Tower','for office',1,'1 hour','Normal','Approved','2026-07-01 13:43:17'),(14,'REQ-1782914562138',11,'2026-07-24','Shawrapara','Level-7, Monem Business District, Eastern Tower','for office',1,'20 minute','Normal','Rejected','2026-07-01 14:02:42'),(15,'REQ-1782914587081',11,'2026-07-31','kazipara','Level-7, Monem Business District, Eastern Tower','Office Presentation',1,'1 hour','Normal','Rejected','2026-07-01 14:03:07'),(16,'REQ-1782914614437',11,'2026-07-23','Shawrapara','Level-7, Monem Business District, Eastern Tower','Office Presentation',1,'1 hour','Normal','Rejected','2026-07-01 14:03:34'),(17,'REQ-1782914636708',11,'2026-08-02','kazipara','Level-7, Monem Business District, Eastern Tower','Office meeting',1,'1:30 hour','Normal','Approved','2026-07-01 14:03:56'),(18,'REQ-1782915775927',11,'2026-07-23','Shawrapara','Level-7, Monem Business District, Eastern Tower','for office',1,'1 hour','Normal','Rejected','2026-07-01 14:22:55'),(19,'REQ-1782915924780',11,'2026-07-15','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','Office meeting',1,'20 minute','Normal','Approved','2026-07-01 14:25:24'),(20,'REQ-1783091147451',10,'2026-08-05','Kazipara, matro station','Confidence cement dhaka limited factory, Danga,polas','VRM machine audit ',2,'8','Normal','Completed','2026-07-03 15:05:47'),(21,'REQ-1783109905038',10,'2026-07-31','Shawrapara','Level-7, Monem Business District, Eastern Tower','for office',1,'3 hours','Normal','Completed','2026-07-03 20:18:25'),(22,'REQ-1783110879525',10,'2026-07-30','Kazipara, matro station','Mirpur-10','Office meeting',1,'20 minute','Normal','Approved','2026-07-03 20:34:39'),(23,'REQ-1783111836422',10,'2026-07-24','kazipara','Level-7, Monem Business District, Eastern Tower','Office Presentation',1,'8','Normal','Approved','2026-07-03 20:50:36'),(24,'REQ-1783112854768',10,'2026-07-23','Shawrapara','Bijoy Sarani','Office Presentation',2,'1:30 hour','Normal','Approved','2026-07-03 21:07:34'),(25,'REQ-1783114118423',10,'2026-07-15','Kazipara, matro station','Level-7, Monem Business District, Eastern Tower','Office Presentation',1,'1:30 hour','Normal','Approved','2026-07-03 21:28:38'),(26,'REQ-1783114263817',10,'2026-07-14','kazipara','Mirpur-10','Office Presentation',1,'1:30 hour','Normal','Approved','2026-07-03 21:31:03'),(27,'REQ-1783114859139',10,'2026-07-17','Shawrapara','Mirpur-10','Office Presentation',1,'3 hours','Normal','Approved','2026-07-03 21:40:59'),(28,'REQ-1783115060578',10,'2026-07-23','kazipara','Confidence cement dhaka limited factory, Danga,polas','Office meeting',1,'3 hours','Normal','Approved','2026-07-03 21:44:20'),(29,'REQ-1783117431762',10,'2026-07-21','Kazipara, matro station','Mirpur-10','Office Presentation',1,'3 hours','Normal','Approved','2026-07-03 22:23:51'),(30,'REQ-1783259703620',10,'2026-07-14','kazipara','Level-7, Monem Business District, Eastern Tower','Office meeting',1,'1:30 hour','Normal','Approved','2026-07-05 13:55:03'),(31,'REQ-1783263118088',10,'2026-07-24','Kazipara, matro station','Level-7, Monem Business District, Eastern Tower','Office Presentation',1,'1 hour','Normal','Approved','2026-07-05 14:51:58'),(32,'REQ-1783263378151',10,'2026-07-31','Kazipara, matro station','Bijoy Sarani','Office meeting',1,'1 hour','Normal','Approved','2026-07-05 14:56:18'),(33,'REQ-1783355608613',10,'2026-07-16','kazipara','Level-7, Monem Business District, Eastern Tower','Office meeting',1,'1 hour','Normal','Approved','2026-07-06 16:33:28'),(34,'REQ-1783435857152',18,'2026-07-10','Dhaka Office','Chittagong','Official Meeting',3,'2 Days','Normal','Approved','2026-07-07 14:50:57'),(35,'REQ-1783441990959',18,'2026-07-11','Kazipara','Confidence group plc','Official Meeting',2,'1 Days','Normal','Rejected','2026-07-07 16:33:10'),(36,'REQ-1783442876100',22,'2026-07-15','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','Office Presentation',2,'1 hour','Normal','Approved','2026-07-07 16:47:56'),(37,'REQ-1783457135194',10,'2026-07-09','Kazipara, Mirpur, Dhaka','Level-7, Monem Business District, Eastern Tower','Office Presentation',1,'2 hours','Normal','Approved','2026-07-07 20:45:35'),(38,'REQ-1783502327237',10,'2026-07-21','kazipara','Level-7, Monem Business District, Eastern Tower','For office',1,'1 hour','Normal','Approved','2026-07-08 09:18:47');
/*!40000 ALTER TABLE `requisitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('employee','admin') DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','sumaya@gmail.com','998877','admin',NULL,NULL),(6,'Admin User','umaya@gmail.com','98877','admin',NULL,NULL),(7,'Admin User','imra@gmail.com','334455','admin',NULL,NULL),(8,'Admin User','ema@gmail.com','11111','admin',NULL,NULL),(9,'Admin User','testuser@gmail.com','11122','admin',NULL,NULL),(10,'Test Employee','employee@gmail.com','123456','employee','EMP-002','CSE'),(11,'Test Admin','admin@gmail.com','123456','admin',NULL,NULL),(18,'Admin User','admin2@gmail.com','998877','admin',NULL,NULL),(19,'Admin User','karim@gmail.com','993377','admin',NULL,NULL),(20,'Test Employee','imran@gmail.com','112233','employee',NULL,NULL),(22,'Test Employee','Nayeem@gmail.com','332211','employee','EMP-003','EEE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicle_number` varchar(50) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'DHAKA-202','Toyota Hiace Deluxe',14,'Available'),(2,'DHAKA-5678','Toyota Noah',8,'Assigned'),(3,'DHAKA-5678','Toyota Noah',8,'Assigned'),(4,'DHAKA-5678','Toyota Noah',8,'Assigned'),(7,'DHAKA-101','Toyota Hiace',12,'Assigned'),(8,'DHAKA-101','Toyota Hiace',12,'Assigned'),(9,'DHAKA-101','Toyota Hiace',12,'Available'),(10,'DHAKA-101','Toyota Hiace',12,'Available');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-08 15:44:59
