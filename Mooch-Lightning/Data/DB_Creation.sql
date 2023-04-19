USE [master]
GO

IF db_id('Mooch') IS NULL
  CREATE DATABASE [Mooch]
GO
USE [Mooch]
GO

DROP TABLE IF EXISTS [UserMembership];
DROP TABLE IF EXISTS [Membership];
DROP TABLE IF EXISTS [Location];
DROP TABLE IF EXISTS [Organization];
DROP TABLE IF EXISTS [OrganizationType];
DROP TABLE IF EXISTS [MembershipMooch];
DROP TABLE IF EXISTS [User];


CREATE TABLE [User] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [FirebaseUid] nvarchar(255) NOT NULL,
  [Username] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
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
  [IsMooched] bit NOT NULL,
  [AvailabiltyStartDate] datetime NOT NULL,
  [AvailabiltyEndDate] datetime NOT NULL
)
GO

CREATE TABLE [MembershipMooch] (
  [id] int PRIMARY KEY identity NOT NULL,
  [UserId] int NOT NULL,
  [userMembershipId] int NOT NULL,
  [StartDate] datetime NOT NULL,
  [EndDate] datetime NOT NULL,
  [IsApproved] bit 
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

ALTER TABLE [MembershipMooch] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Organization] ADD FOREIGN KEY ([OrganizationTypeId]) REFERENCES [OrganizationType] ([Id])
GO

