-- phpMyAdmin SQL Dump
-- version 4.4.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-05 16:01:29
-- 服务器版本： 10.1.12-MariaDB
-- PHP Version: 5.5.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sport`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL COMMENT 'id',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(40) NOT NULL COMMENT '密码',
  `mobile` varchar(20) NOT NULL COMMENT '手机号',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `gendle` tinyint(4) NOT NULL COMMENT '性别',
  `age` int(11) NOT NULL COMMENT '年龄',
  `height` decimal(6,2) NOT NULL COMMENT '身高',
  `weight` decimal(6,2) NOT NULL COMMENT '体重',
  `shoeSize` int(11) NOT NULL COMMENT '鞋码',
  `pelvisHeight` decimal(6,2) NOT NULL COMMENT '髋高',
  `pelvisWidth` decimal(6,2) NOT NULL COMMENT '髋宽',
  `KneeHeight` decimal(6,2) NOT NULL COMMENT '膝高',
  `KneeWidth` decimal(6,2) NOT NULL COMMENT '膝宽',
  `AnkleHeight` decimal(6,2) NOT NULL COMMENT '踝高',
  `AnkleWidth` decimal(6,2) NOT NULL COMMENT '踝宽',
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `salt` varchar(40) NOT NULL COMMENT '密码盐'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `mobile`, `nickname`, `gendle`, `age`, `height`, `weight`, `shoeSize`, `pelvisHeight`, `pelvisWidth`, `KneeHeight`, `KneeWidth`, `AnkleHeight`, `AnkleWidth`, `createDate`, `salt`) VALUES
(3, 'yedeying', 'dc8fa8acd9b4567bf3d0b50608ce452de2389209', '', '', 0, 0, '0.00', '0.00', 0, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2016-03-05 07:59:02', 'ffbbbb83396f9ad5bd926cbcfb9f83efd6095fbc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
