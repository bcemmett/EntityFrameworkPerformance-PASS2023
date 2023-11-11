CREATE TABLE [dbo].[Products]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) NOT NULL,
[Description] [nvarchar] (300) NULL,
[Available] [bit] NOT NULL,
[CategoryId] [int] NOT NULL,
[Photo] [varbinary] (max) NULL,
[CurrentPrice] [money] NULL
)
GO
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([Id])
GO
CREATE NONCLUSTERED INDEX [IX_Products_CategoryId] ON [dbo].[Products] ([CategoryId]) INCLUDE ([Id], [Name], [Description], [CurrentPrice], [Available])
GO
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id])
GO
