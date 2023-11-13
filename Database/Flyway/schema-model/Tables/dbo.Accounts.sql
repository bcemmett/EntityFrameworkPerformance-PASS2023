CREATE TABLE [dbo].[Accounts]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (200) NOT NULL,
[Email] [varchar] (200) NOT NULL,
[PasswordHash] [nvarchar] (32) NOT NULL,
[Address1] [nvarchar] (100) NULL,
[Address2] [nvarchar] (100) NULL,
[PostalCode] [nvarchar] (10) NULL,
[City] [nvarchar] (30) NULL,
[Phone] [nvarchar] (20) NULL,
[MostRecentActivity] [datetime] NOT NULL CONSTRAINT [DF__Accounts__MostRe__31B762FC] DEFAULT ('2000-01-01')
)
GO
ALTER TABLE [dbo].[Accounts] ADD CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_Accounts_City] ON [dbo].[Accounts] ([City]) INCLUDE ([Id], [Name], [Email], [PasswordHash], [Address1], [Address2], [PostalCode], [Phone])
GO
CREATE NONCLUSTERED INDEX [IX_Accounts_EmailId] ON [dbo].[Accounts] ([Email]) INCLUDE ([Id], [PasswordHash])
GO
CREATE NONCLUSTERED INDEX [NonClusteredIndex-20231113-224204] ON [dbo].[Accounts] ([MostRecentActivity]) INCLUDE ([Id], [Name], [Email], [PasswordHash], [Address1], [Address2], [PostalCode], [City], [Phone])
GO
