USE [master]
GO

IF db_id('Mooch') IS NULL
  CREATE DATABASE [Mooch]
GO
USE [Mooch]
GO

DROP TABLE IF EXISTS [MoochRequest];
DROP TABLE IF EXISTS [MoochPost];
DROP TABLE IF EXISTS [MembershipMooch];
DROP TABLE IF EXISTS [UserMembership];
DROP TABLE IF EXISTS [Membership];
DROP TABLE IF EXISTS [Location];
DROP TABLE IF EXISTS [Organization];
DROP TABLE IF EXISTS [OrganizationType];
DROP TABLE IF EXISTS [User];

CREATE TABLE [User] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [FirebaseUid] nvarchar(255) NOT NULL,
  [Username] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255),
  [Email] nvarchar(255) NOT NULL,
  [Password] nvarchar(255) NOT NULL,
  [SubscriptionLevelId] int NOT NULL,
  [ImageUrl] nvarchar(255)
)
GO

CREATE TABLE [Organization] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [OrganizationTypeId] int NOT NULL,
  [ImageUrl] nvarchar(255)
)
GO

CREATE TABLE [Location] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [OrganizationId] int NOT NULL,
  [StreetAddress] nvarchar(255) NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [Zipcode] int NOT NULL
)
GO

CREATE TABLE [Membership] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [OrganizationId] int NOT NULL,
  [ImageUrl] nvarchar(255) 
)
GO

CREATE TABLE [UserMembership] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [UserId] int NOT NULL,
  [MembershipId] int NOT NULL,
)
GO

CREATE TABLE [MoochRequest] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [UserId] int NOT NULL,
  [MoochPostId] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [EndDate] datetime NOT NULL,
  [IsApproved] bit,
  [DateCreated] datetime NOT NULL
)
GO

CREATE TABLE [MoochPost] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [UserMembershipId] int NOT NULL,
  [IsMooched] bit NOT NULL,
  [AvailabilityStartDate] datetime,
  [AvailabilityEndDate] datetime
)
GO

CREATE TABLE [OrganizationType] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO


ALTER TABLE [Location] ADD FOREIGN KEY ([OrganizationId]) REFERENCES [Organization] ([Id])
GO

ALTER TABLE [UserMembership] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [UserMembership] ADD FOREIGN KEY ([MembershipId]) REFERENCES [Membership] ([Id])
GO

ALTER TABLE [Membership] ADD FOREIGN KEY ([OrganizationId]) REFERENCES [Organization] ([Id])
GO

ALTER TABLE [MoochRequest] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [MoochRequest] ADD FOREIGN KEY ([MoochPostId]) REFERENCES [MoochPost] ([Id])
GO

ALTER TABLE [MoochPost] ADD FOREIGN KEY ([UserMembershipId]) REFERENCES [UserMembership] ([Id])
GO

ALTER TABLE [Organization] ADD FOREIGN KEY ([OrganizationTypeId]) REFERENCES [OrganizationType] ([Id])
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
([Id],[FirebaseUid],[Username],[FirstName], [LastName], [Email],[Password], [SubscriptionLevelId], [ImageUrl])
VALUES
(1,'FID1','rstroud', 'Robert', 'Stroud', 'rstroud@test.com', '1234',1,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png'),
(2,'FID2','cneames', 'Cristi', 'Neames', 'cneames@test.com', '1234',2,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png'),
(3,'FID3','cburnett', 'Chase', 'Burnett', 'cburnett@test.com', '1234',3,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png'),
(4,'FID4','jwhite', 'Jeremy', 'White', 'jwhite@test.com', '1234',1,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png'),
(5,'FID5','yogi', 'Yogi', '', 'yogi@test.com', '1234',3,'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png')
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [OrganizationType] ON
INSERT INTO [OrganizationType]
([Id],[Description])
VALUES
(1,'Streaming Service'),
(2, 'Fitness')
SET IDENTITY_INSERT [OrganizationType] OFF

SET IDENTITY_INSERT [Organization] ON
INSERT INTO [Organization]
([Id],[Name],[OrganizationTypeId],[ImageUrl])
VALUES
(1,'Netflix',1,'https://img.freepik.com/premium-vector/company-icon-simple-element-illustration-company-concept-symbol-design-can-be-used-web-mobile_159242-7784.jpg'),
(2,'Hulu',1,'https://img.freepik.com/premium-vector/company-icon-simple-element-illustration-company-concept-symbol-design-can-be-used-web-mobile_159242-7784.jpg'),
(3,'YMCA',2,'https://img.freepik.com/premium-vector/company-icon-simple-element-illustration-company-concept-symbol-design-can-be-used-web-mobile_159242-7784.jpg')
SET IDENTITY_INSERT [Organization] OFF

SET IDENTITY_INSERT [Location] ON
INSERT INTO [Location]
([Id],[OrganizationId],[StreetAddress],[City],[Zipcode])
VALUES
(1, 3,'1000 Church St, Nashville', 'TN', 37203)
SET IDENTITY_INSERT [Location] OFF

SET IDENTITY_INSERT [Membership] ON
INSERT INTO [Membership]
([Id],[Description],[OrganizationId],[ImageUrl])
VALUES
(1,'Basic with ads', 1,'https://cdn-icons-png.flaticon.com/512/6701/6701712.png'),
(2,'Premium', 1,'https://cdn-icons-png.flaticon.com/512/6701/6701712.png'),
(3,'Hulu (No Ads)', 2,'https://cdn-icons-png.flaticon.com/512/6701/6701712.png'),
(4,'Hulu (No Ads) + HBO Max', 2,'https://cdn-icons-png.flaticon.com/512/6701/6701712.png'),
(5,'One Adult', 3,'https://cdn-icons-png.flaticon.com/512/6701/6701712.png'),
(6,'Two Adults', 3,'https://cdn-icons-png.flaticon.com/512/6701/6701712.png')
SET IDENTITY_INSERT [Membership] OFF

SET IDENTITY_INSERT [UserMembership] ON
INSERT INTO [UserMembership]
([Id],[UserId],[MembershipId])
VALUES
(1,1,1),
(2,1,4),
(3,2,5),
(4,2,3),
(5,3,6),
(6,4,2),
(7,5,2)
SET IDENTITY_INSERT [UserMembership] OFF

SET IDENTITY_INSERT [MoochPost] ON 
INSERT INTO [MoochPost]
([Id],[UserMembershipId],[IsMooched],[AvailabilityStartDate],[AvailabilityEndDate])
VALUES
(1,1,0,'',''),
(2,4,1,'05-02-2023','05-05-2023'),
(3,5,1,'04-25-2023','04-26-2023'),
(4,3,0,'05-03-2023','05-04-2023'),
(5,6,0,'',''),
(6,2,0,'',''),
(7,2,0,'08-03-2023','08-04-2023')
SET IDENTITY_INSERT [MoochPost] OFF

SET IDENTITY_INSERT [MoochRequest] ON
INSERT INTO [MoochRequest]
([Id],[UserId],[MoochPostId],[StartDate],[EndDate],[IsApproved],[DateCreated])
VALUES
(1, 1,3,'04-25-2023','04-26-2023',1,'04-19-2023 08:51:42'),
(2, 2,2,'05-02-2023','05-05-2023',1,'04-19-2023 12:30:03'),
(3, 2,7,'08-03-2023','08-04-2023',0,'04-19-2023 01:45:22'),
(4, 3,7,'08-03-2023','08-04-2023',0,'04-18-2023 11:28:15'),
(5, 4,7,'08-03-2023','08-04-2023',0,'04-17-2023 07:12:02')
SET IDENTITY_INSERT [MoochRequest] OFF