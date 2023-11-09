CREATE TABLE [dbo].[Accounts]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (200) NOT NULL,
[Email] [varchar] (200) NOT NULL,
[PasswordHash] [nvarchar] (32) NOT NULL
)
GO
ALTER TABLE [dbo].[Accounts] ADD CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_Accounts_EmailId] ON [dbo].[Accounts] ([Email]) INCLUDE ([Id], [PasswordHash])
GO
