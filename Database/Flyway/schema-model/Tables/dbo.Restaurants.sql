CREATE TABLE [dbo].[Restaurants]
(
[Id] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) NOT NULL,
[Address] [nvarchar] (200) NOT NULL,
[PhoneNumber] [nvarchar] (20) NOT NULL,
[PostalCode] [nvarchar] (10) NULL
)
GO
ALTER TABLE [dbo].[Restaurants] ADD CONSTRAINT [PK_Restaurants] PRIMARY KEY CLUSTERED ([Id])
GO
