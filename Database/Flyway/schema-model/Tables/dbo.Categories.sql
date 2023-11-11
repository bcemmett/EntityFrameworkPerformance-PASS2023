CREATE TABLE [dbo].[Categories]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) NOT NULL,
[Priority] [int] NOT NULL CONSTRAINT [DF__Categorie__Prior__29221CFB] DEFAULT ((1)),
[Created] [datetime] NOT NULL CONSTRAINT [DF__Categorie__Creat__2A164134] DEFAULT ('2023-11-12'),
[Enabled] [bit] NOT NULL CONSTRAINT [DF__Categorie__Enabl__2B0A656D] DEFAULT ((1))
)
GO
ALTER TABLE [dbo].[Categories] ADD CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id])
GO
