CREATE TABLE [dbo].[Addresses]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[AccountId] [int] NOT NULL,
[NickName] [nvarchar] (100) NULL,
[Address1] [nvarchar] (200) NOT NULL,
[Address2] [nvarchar] (200) NOT NULL,
[PostalCode] [nvarchar] (10) NOT NULL,
[City] [nvarchar] (30) NOT NULL
)
GO
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_Addresses_AccountId] ON [dbo].[Addresses] ([AccountId]) INCLUDE ([Id], [NickName], [Address1], [Address2], [PostalCode], [City])
GO
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [FK_Addresses_Accounts] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id])
GO
