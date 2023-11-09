CREATE TABLE [dbo].[Products]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) NOT NULL,
[Description] [nvarchar] (1000) NULL,
[CurrentPrice] [nchar] (10) NOT NULL,
[Available] [bit] NOT NULL,
[CategoryId] [int] NOT NULL
)
GO
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([Id])
GO
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id])
GO
