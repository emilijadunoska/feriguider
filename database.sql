-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2022 at 01:40 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feri`
--

-- --------------------------------------------------------

--
-- Table structure for table `nivo`
--

CREATE TABLE `nivo` (
  `idnivo` int(11) NOT NULL,
  `naziv` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `objekt`
--

CREATE TABLE `objekt` (
  `idobjekt` int(11) NOT NULL,
  `naziv` varchar(40) NOT NULL,
  `sodedSever` varchar(40) NOT NULL,
  `sosedJug` varchar(40) NOT NULL,
  `sosedZahod` varchar(40) NOT NULL,
  `sosedVzhod` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prostor`
--

CREATE TABLE `prostor` (
  `idprostor` int(11) NOT NULL,
  `objekt` int(40) NOT NULL,
  `nivo` int(40) NOT NULL,
  `stevilkaNaziv` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `zaposlen`
--

CREATE TABLE `zaposlen` (
  `idzaposlen` int(11) NOT NULL,
  `ime` varchar(40) NOT NULL,
  `priimek` varchar(40) NOT NULL,
  `prostor` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nivo`
--
ALTER TABLE `nivo`
  ADD PRIMARY KEY (`idnivo`);

--
-- Indexes for table `objekt`
--
ALTER TABLE `objekt`
  ADD PRIMARY KEY (`idobjekt`);

--
-- Indexes for table `prostor`
--
ALTER TABLE `prostor`
  ADD PRIMARY KEY (`idprostor`),
  ADD KEY `nivo` (`nivo`),
  ADD KEY `objekt` (`objekt`);

--
-- Indexes for table `zaposlen`
--
ALTER TABLE `zaposlen`
  ADD PRIMARY KEY (`idzaposlen`),
  ADD KEY `prostor` (`prostor`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `prostor`
--
ALTER TABLE `prostor`
  ADD CONSTRAINT `nivo` FOREIGN KEY (`nivo`) REFERENCES `nivo` (`idnivo`),
  ADD CONSTRAINT `objekt` FOREIGN KEY (`objekt`) REFERENCES `objekt` (`idobjekt`);

--
-- Constraints for table `zaposlen`
--
ALTER TABLE `zaposlen`
  ADD CONSTRAINT `prostor` FOREIGN KEY (`prostor`) REFERENCES `prostor` (`idprostor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
